import { createContext, forwardRef, useContext, useState, type ReactNode } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  View,
  type PressableProps,
  type ScrollViewProps,
  type StyleProp,
  type TextStyle,
  type ViewProps,
  type ViewStyle,
} from "react-native";
import { tokens, useArcSynTheme } from "../theme.js";

export type TabsValue = string | number;
export type TabsOrientation = "horizontal" | "vertical";

interface TabsContextValue {
  value: TabsValue;
  setValue: (value: TabsValue) => void;
  orientation: TabsOrientation;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabs() {
  const context = useContext(TabsContext);
  if (!context) throw new Error("Tabs parts must be used inside Tabs.Root.");
  return context;
}

export interface TabsRootProps extends ViewProps {
  children: ReactNode;
  value?: TabsValue;
  defaultValue?: TabsValue;
  onValueChange?: (value: TabsValue) => void;
  orientation?: TabsOrientation;
}

export const TabsRoot = forwardRef<View, TabsRootProps>(function TabsRoot(
  { children, value, defaultValue = 0, onValueChange, orientation = "horizontal", style, ...props },
  ref,
) {
  const [uncontrolledValue, setUncontrolledValue] = useState<TabsValue>(defaultValue);
  const activeValue = value ?? uncontrolledValue;
  const setValue = (nextValue: TabsValue) => {
    if (value === undefined) setUncontrolledValue(nextValue);
    onValueChange?.(nextValue);
  };

  return (
    <TabsContext.Provider value={{ value: activeValue, setValue, orientation }}>
      <View ref={ref} style={[styles.root, orientation === "vertical" && styles.rootVertical, style]} {...props}>
        {children}
      </View>
    </TabsContext.Provider>
  );
});

export interface TabsListProps extends ScrollViewProps {
  children: ReactNode;
}

export const TabsList = forwardRef<ScrollView, TabsListProps>(function TabsList(
  { children, style, contentContainerStyle, ...props },
  ref,
) {
  const { orientation } = useTabs();
  const { colors } = useArcSynTheme();
  const horizontal = orientation === "horizontal";

  return (
    <ScrollView
      ref={ref}
      accessibilityRole="tablist"
      horizontal={horizontal}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={[
        styles.list,
        horizontal ? { borderBottomColor: colors.border, borderBottomWidth: 1 } : { borderRightColor: colors.border, borderRightWidth: 1 },
        style,
      ]}
      contentContainerStyle={[horizontal ? styles.listHorizontal : styles.listVertical, contentContainerStyle]}
      {...props}
    >
      {children}
    </ScrollView>
  );
});

export interface TabsTabProps extends Omit<PressableProps, "children" | "style"> {
  children: ReactNode;
  value: TabsValue;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export function TabsTab({ children, value, disabled = false, style, textStyle, onPress, ...props }: TabsTabProps) {
  const { value: activeValue, setValue, orientation } = useTabs();
  const { colors } = useArcSynTheme();
  const active = value === activeValue;
  const isDisabled = disabled === true;
  const content = typeof children === "string" || typeof children === "number"
    ? <Text style={[styles.tabText, { color: active ? colors.foreground : colors.mutedForeground, fontFamily: tokens.fontFamily.sansMedium }, textStyle]}>{children}</Text>
    : children;

  return (
    <Pressable
      accessibilityRole="tab"
      accessibilityState={{ disabled: isDisabled, selected: active }}
      disabled={isDisabled}
      onPress={(event) => {
        onPress?.(event);
        if (!event.defaultPrevented) setValue(value);
      }}
      style={[
        styles.tab,
        orientation === "horizontal"
          ? { borderBottomColor: active ? colors.primary : "transparent", borderBottomWidth: 2 }
          : { borderRightColor: active ? colors.primary : "transparent", borderRightWidth: 2 },
        isDisabled && styles.tabDisabled,
        style,
      ]}
      {...props}
    >
      {content}
    </Pressable>
  );
}

export type TabsPanelsProps = ViewProps;

export const TabsPanels = forwardRef<View, TabsPanelsProps>(function TabsPanels({ style, ...props }, ref) {
  const { colors } = useArcSynTheme();
  return <View ref={ref} style={[styles.panels, { backgroundColor: colors.surface, borderColor: colors.border }, style]} {...props} />;
});

export interface TabsPanelProps extends ViewProps {
  value: TabsValue;
  keepMounted?: boolean;
}

export const TabsPanel = forwardRef<View, TabsPanelProps>(function TabsPanel(
  { value, keepMounted = false, style, ...props },
  ref,
) {
  const { value: activeValue } = useTabs();
  const active = value === activeValue;
  if (!active && !keepMounted) return null;
  return <View ref={ref} style={[styles.panel, !active && styles.panelHidden, style]} {...props} />;
});

export const Tabs = {
  Root: TabsRoot,
  List: TabsList,
  Tab: TabsTab,
  Panels: TabsPanels,
  Panel: TabsPanel,
};

const styles = {
  root: { gap: tokens.spacing[4], width: "100%" } satisfies ViewStyle,
  rootVertical: { alignItems: "stretch", flexDirection: "row" } satisfies ViewStyle,
  list: { flexGrow: 0 } satisfies ViewStyle,
  listHorizontal: { flexDirection: "row" } satisfies ViewStyle,
  listVertical: { minWidth: 144 } satisfies ViewStyle,
  tab: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 44,
    paddingHorizontal: tokens.spacing[3],
  } satisfies ViewStyle,
  tabDisabled: { opacity: 0.45 } satisfies ViewStyle,
  tabText: { fontSize: tokens.fontSize.sm } satisfies TextStyle,
  panels: {
    borderWidth: 1,
    flex: 1,
    minHeight: 128,
  } satisfies ViewStyle,
  panel: { padding: tokens.spacing[4] } satisfies ViewStyle,
  panelHidden: { display: "none" } satisfies ViewStyle,
};
