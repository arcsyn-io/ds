import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  Modal,
  Pressable,
  Text,
  View,
  useWindowDimensions,
  type LayoutChangeEvent,
  type PressableProps,
  type StyleProp,
  type TextStyle,
  type ViewProps,
  type ViewStyle,
} from "react-native";
import { tokens, useArcSynTheme } from "../theme.js";

export type TooltipSide = "top" | "right" | "bottom" | "left";
export type TooltipAlign = "start" | "center" | "end";

interface AnchorRect {
  height: number;
  width: number;
  x: number;
  y: number;
}

interface TooltipContextValue {
  anchor: AnchorRect | null;
  open: boolean;
  setOpen: (open: boolean) => void;
  show: (anchor: AnchorRect) => void;
}

const TooltipContext = createContext<TooltipContextValue | null>(null);
const TooltipDelayContext = createContext(500);

function useTooltip() {
  const context = useContext(TooltipContext);
  if (!context) throw new Error("Tooltip parts must be used inside Tooltip.Root.");
  return context;
}

export interface TooltipProviderProps {
  children: ReactNode;
  delay?: number;
}

export function TooltipProvider({ children, delay = 500 }: TooltipProviderProps) {
  return <TooltipDelayContext.Provider value={delay}>{children}</TooltipDelayContext.Provider>;
}

export interface TooltipRootProps {
  children: ReactNode;
  defaultOpen?: boolean;
  disabled?: boolean;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
}

export function TooltipRoot({
  children,
  defaultOpen = false,
  disabled = false,
  onOpenChange,
  open,
}: TooltipRootProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const [anchor, setAnchor] = useState<AnchorRect | null>(null);
  const isOpen = !disabled && (open ?? uncontrolledOpen);

  function setOpen(nextOpen: boolean) {
    if (open === undefined) setUncontrolledOpen(nextOpen);
    onOpenChange?.(nextOpen);
  }

  function show(nextAnchor: AnchorRect) {
    if (disabled) return;
    setAnchor(nextAnchor);
    setOpen(true);
  }

  return (
    <TooltipContext.Provider value={{ anchor, open: isOpen, setOpen, show }}>
      {children}
    </TooltipContext.Provider>
  );
}

export interface TooltipTriggerProps extends PressableProps {
  children: ReactNode;
}

export const TooltipTrigger = forwardRef<View, TooltipTriggerProps>(function TooltipTrigger(
  { children, delayLongPress, onLongPress, ...props },
  ref,
) {
  const internalRef = useRef<View>(null);
  const providerDelay = useContext(TooltipDelayContext);
  const { open, show } = useTooltip();

  useEffect(() => {
    if (open) {
      internalRef.current?.measureInWindow((x, y, width, height) => show({ x, y, width, height }));
    }
  }, [open]);

  return (
    <Pressable
      ref={(node) => {
        internalRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      }}
      accessibilityState={{ ...props.accessibilityState, expanded: open }}
      delayLongPress={delayLongPress ?? providerDelay}
      onLongPress={(event) => {
        onLongPress?.(event);
        internalRef.current?.measureInWindow((x, y, width, height) => show({ x, y, width, height }));
      }}
      {...props}
    >
      {children}
    </Pressable>
  );
});

export interface TooltipContentProps extends Omit<ViewProps, "style"> {
  align?: TooltipAlign;
  children: ReactNode;
  offset?: number;
  side?: TooltipSide;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export function TooltipContent({
  align = "center",
  children,
  offset = 8,
  onLayout,
  side = "top",
  style,
  textStyle,
  ...props
}: TooltipContentProps) {
  const { anchor, open, setOpen } = useTooltip();
  const { colors } = useArcSynTheme();
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();
  const [popupSize, setPopupSize] = useState({ height: 0, width: 0 });

  if (!anchor) return null;

  const margin = 12;
  const resolvedSide =
    side === "top" && anchor.y - popupSize.height - offset < margin ? "bottom"
      : side === "bottom" && anchor.y + anchor.height + popupSize.height + offset > windowHeight - margin ? "top"
        : side === "left" && anchor.x - popupSize.width - offset < margin ? "right"
          : side === "right" && anchor.x + anchor.width + popupSize.width + offset > windowWidth - margin ? "left"
            : side;

  const alignHorizontal =
    align === "start" ? anchor.x
      : align === "end" ? anchor.x + anchor.width - popupSize.width
        : anchor.x + (anchor.width - popupSize.width) / 2;
  const alignVertical =
    align === "start" ? anchor.y
      : align === "end" ? anchor.y + anchor.height - popupSize.height
        : anchor.y + (anchor.height - popupSize.height) / 2;

  const left =
    resolvedSide === "left" ? anchor.x - popupSize.width - offset
      : resolvedSide === "right" ? anchor.x + anchor.width + offset
        : alignHorizontal;
  const top =
    resolvedSide === "top" ? anchor.y - popupSize.height - offset
      : resolvedSide === "bottom" ? anchor.y + anchor.height + offset
        : alignVertical;

  const position = {
    left: Math.max(margin, Math.min(left, windowWidth - popupSize.width - margin)),
    opacity: popupSize.width > 0 ? 1 : 0,
    top: Math.max(margin, Math.min(top, windowHeight - popupSize.height - margin)),
  } satisfies ViewStyle;

  const content =
    typeof children === "string" || typeof children === "number"
      ? (
        <Text style={[styles.text, { color: colors.foreground, fontFamily: tokens.fontFamily.sansMedium }, textStyle]}>
          {children}
        </Text>
      )
      : children;

  function handleLayout(event: LayoutChangeEvent) {
    setPopupSize({
      height: event.nativeEvent.layout.height,
      width: event.nativeEvent.layout.width,
    });
    onLayout?.(event);
  }

  return (
    <Modal
      animationType="fade"
      onRequestClose={() => setOpen(false)}
      statusBarTranslucent
      transparent
      visible={open}
    >
      <Pressable
        accessibilityLabel="Fechar dica"
        accessibilityRole="button"
        onPress={() => setOpen(false)}
        style={styles.backdrop}
      >
        <View
          accessibilityLiveRegion="polite"
          accessibilityRole="text"
          onLayout={handleLayout}
          style={[
            styles.content,
            {
              backgroundColor: colors.surfaceRaised,
              borderColor: colors.borderStrong,
            },
            position,
            style,
          ]}
          {...props}
        >
          {content}
        </View>
      </Pressable>
    </Modal>
  );
}

export const Tooltip = {
  Provider: TooltipProvider,
  Root: TooltipRoot,
  Trigger: TooltipTrigger,
  Content: TooltipContent,
};

const styles = {
  backdrop: {
    ...({
      bottom: 0,
      left: 0,
      position: "absolute",
      right: 0,
      top: 0,
    } satisfies ViewStyle),
  },
  content: {
    borderRadius: tokens.radius.sm,
    borderWidth: 1,
    maxWidth: 288,
    paddingHorizontal: tokens.spacing[2],
    paddingVertical: tokens.spacing[1],
    position: "absolute",
  } satisfies ViewStyle,
  text: {
    fontSize: tokens.fontSize.xs,
    lineHeight: 18,
  } satisfies TextStyle,
};
