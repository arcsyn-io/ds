import { createContext, forwardRef, useContext, useState, type ReactNode } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type ScrollViewProps,
  type StyleProp,
  type TextStyle,
  type ViewProps,
  type ViewStyle,
} from "react-native";
import { Button, type ButtonProps, type ButtonSize, type ButtonVariant } from "./button.js";
import { tokens, useArcSynTheme } from "../theme.js";

export type DrawerSide = "top" | "right" | "bottom" | "left";

interface DrawerContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  side: DrawerSide;
}

const DrawerContext = createContext<DrawerContextValue | null>(null);

export interface DrawerRootProps {
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: DrawerSide;
}

export function DrawerRoot({ children, open, defaultOpen = false, onOpenChange, side = "right" }: DrawerRootProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isOpen = open ?? uncontrolledOpen;
  const setOpen = (nextOpen: boolean) => {
    if (open === undefined) setUncontrolledOpen(nextOpen);
    onOpenChange?.(nextOpen);
  };

  return <DrawerContext.Provider value={{ open: isOpen, setOpen, side }}>{children}</DrawerContext.Provider>;
}

function useDrawer() {
  const context = useContext(DrawerContext);
  if (!context) throw new Error("Drawer parts must be used inside Drawer.Root.");
  return context;
}

export interface DrawerTriggerProps extends Omit<ButtonProps, "onPress"> {
  onPress?: ButtonProps["onPress"];
}

export function DrawerTrigger({ onPress, ...props }: DrawerTriggerProps) {
  const { open, setOpen } = useDrawer();
  return <Button {...props} accessibilityState={{ expanded: open }} onPress={(event) => { onPress?.(event); setOpen(true); }} />;
}

export interface DrawerContentProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  closeOnBackdropPress?: boolean;
}

const overlayPosition: Record<DrawerSide, ViewStyle> = {
  top: { justifyContent: "flex-start" },
  right: { alignItems: "flex-end" },
  bottom: { justifyContent: "flex-end" },
  left: { alignItems: "flex-start" },
};

const panelPosition: Record<DrawerSide, ViewStyle> = {
  top: { borderBottomWidth: 1, maxHeight: "90%", width: "100%" },
  right: { borderLeftWidth: 1, height: "100%", maxWidth: 480, width: "88%" },
  bottom: { borderTopWidth: 1, maxHeight: "90%", width: "100%" },
  left: { borderRightWidth: 1, height: "100%", maxWidth: 480, width: "88%" },
};

export function DrawerContent({ children, style, closeOnBackdropPress = true }: DrawerContentProps) {
  const { open, setOpen, side } = useDrawer();
  const { colors } = useArcSynTheme();

  return (
    <Modal
      transparent
      visible={open}
      animationType={side === "top" || side === "bottom" ? "slide" : "fade"}
      onRequestClose={() => setOpen(false)}
      statusBarTranslucent
    >
      <View style={[styles.overlay, overlayPosition[side]]}>
        <Pressable
          accessible={closeOnBackdropPress}
          accessibilityLabel={closeOnBackdropPress ? "Fechar painel" : undefined}
          accessibilityRole={closeOnBackdropPress ? "button" : undefined}
          style={StyleSheet.absoluteFill}
          onPress={closeOnBackdropPress ? () => setOpen(false) : undefined}
        />
        <View
          accessibilityViewIsModal
          style={[styles.content, panelPosition[side], { backgroundColor: colors.surfaceRaised, borderColor: colors.borderStrong }, style]}
        >
          {children}
        </View>
      </View>
    </Modal>
  );
}

export type DrawerHandleProps = ViewProps;

export const DrawerHandle = forwardRef<View, DrawerHandleProps>(function DrawerHandle({ style, ...props }, ref) {
  const { side } = useDrawer();
  const { colors } = useArcSynTheme();
  if (side === "left" || side === "right") return null;
  return <View ref={ref} accessible={false} style={[styles.handle, { backgroundColor: colors.borderStrong }, style]} {...props} />;
});

export type DrawerHeaderProps = ViewProps;

export const DrawerHeader = forwardRef<View, DrawerHeaderProps>(function DrawerHeader({ style, ...props }, ref) {
  const { colors } = useArcSynTheme();
  return <View ref={ref} style={[styles.header, { borderBottomColor: colors.border }, style]} {...props} />;
});

export interface DrawerTitleProps {
  children: ReactNode;
  style?: StyleProp<TextStyle>;
}

export function DrawerTitle({ children, style }: DrawerTitleProps) {
  const { colors } = useArcSynTheme();
  return <Text accessibilityRole="header" style={[styles.title, { color: colors.foreground, fontFamily: tokens.fontFamily.sansSemibold }, style]}>{children}</Text>;
}

export interface DrawerDescriptionProps {
  children: ReactNode;
  style?: StyleProp<TextStyle>;
}

export function DrawerDescription({ children, style }: DrawerDescriptionProps) {
  const { colors } = useArcSynTheme();
  return <Text style={[styles.description, { color: colors.mutedForeground, fontFamily: tokens.fontFamily.sans }, style]}>{children}</Text>;
}

export type DrawerBodyProps = ScrollViewProps;

export const DrawerBody = forwardRef<ScrollView, DrawerBodyProps>(function DrawerBody({ contentContainerStyle, ...props }, ref) {
  return <ScrollView ref={ref} contentContainerStyle={[styles.body, contentContainerStyle]} keyboardShouldPersistTaps="handled" {...props} />;
});

export type DrawerFooterProps = ViewProps;

export const DrawerFooter = forwardRef<View, DrawerFooterProps>(function DrawerFooter({ style, ...props }, ref) {
  const { colors } = useArcSynTheme();
  return <View ref={ref} style={[styles.footer, { borderTopColor: colors.border }, style]} {...props} />;
});

export interface DrawerCloseProps extends Omit<ButtonProps, "onPress"> {
  onPress?: ButtonProps["onPress"];
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function DrawerClose({ onPress, ...props }: DrawerCloseProps) {
  const { setOpen } = useDrawer();
  return <Button {...props} onPress={(event) => { onPress?.(event); setOpen(false); }} />;
}

export const Drawer = {
  Root: DrawerRoot,
  Trigger: DrawerTrigger,
  Content: DrawerContent,
  Handle: DrawerHandle,
  Header: DrawerHeader,
  Title: DrawerTitle,
  Description: DrawerDescription,
  Body: DrawerBody,
  Footer: DrawerFooter,
  Close: DrawerClose,
};

const styles = StyleSheet.create({
  overlay: { backgroundColor: "rgba(8, 9, 16, 0.72)", flex: 1 },
  content: { overflow: "hidden" },
  handle: { alignSelf: "center", borderRadius: tokens.radius.full, height: 4, marginTop: tokens.spacing[2], width: 40 },
  header: { borderBottomWidth: 1, gap: tokens.spacing[2], padding: tokens.spacing[5] },
  title: { fontSize: tokens.fontSize.lg, lineHeight: 23 },
  description: { fontSize: tokens.fontSize.sm, lineHeight: 21 },
  body: { flexGrow: 1, padding: tokens.spacing[5] },
  footer: {
    alignItems: "center",
    borderTopWidth: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: tokens.spacing[2],
    justifyContent: "flex-end",
    paddingHorizontal: tokens.spacing[5],
    paddingVertical: tokens.spacing[4],
  },
});
