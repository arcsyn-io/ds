import { createContext, forwardRef, useContext, type ReactNode } from "react";
import { StyleSheet, Text, TextInput, View, type StyleProp, type TextInputProps, type TextStyle, type ViewProps, type ViewStyle } from "react-native";
import { tokens, useArcSynTheme, type ArcSynColors } from "../theme.js";
import type { InputSize } from "./input.js";

interface InputGroupContextValue { invalid: boolean; size: InputSize; colors: ArcSynColors; }

const InputGroupContext = createContext<InputGroupContextValue | null>(null);
const heightBySize: Record<InputSize, number> = { sm: 40, md: 44, lg: 48 };

export interface InputGroupRootProps extends ViewProps { invalid?: boolean; size?: InputSize; style?: StyleProp<ViewStyle>; }

export const InputGroupRoot = forwardRef<View, InputGroupRootProps>(function InputGroupRoot({ invalid = false, size = "md", style, children, ...props }, ref) {
  const { colors } = useArcSynTheme();
  return <InputGroupContext.Provider value={{ invalid, size, colors }}><View ref={ref} style={[styles.root, { backgroundColor: colors.surface, borderColor: invalid ? colors.danger : colors.border, minHeight: heightBySize[size] }, style]} {...props}>{children}</View></InputGroupContext.Provider>;
});

function useInputGroup() {
  const context = useContext(InputGroupContext);
  if (!context) throw new Error("InputGroup.Input and InputGroup.Addon must be used inside InputGroup.Root.");
  return context;
}

export interface InputGroupInputProps extends Omit<TextInputProps, "style"> { style?: StyleProp<TextStyle>; }

export const InputGroupInput = forwardRef<TextInput, InputGroupInputProps>(function InputGroupInput({ style, ...props }, ref) {
  const { colors } = useInputGroup();
  return <TextInput ref={ref} placeholderTextColor={colors.mutedForeground} style={[styles.input, { color: colors.foreground, fontFamily: tokens.fontFamily.sans, fontSize: tokens.fontSize.sm }, style]} {...props} />;
});

export interface InputGroupAddonProps { children: ReactNode; position?: "start" | "end"; style?: StyleProp<ViewStyle>; textStyle?: StyleProp<TextStyle>; }

export function InputGroupAddon({ children, position = "start", style, textStyle }: InputGroupAddonProps) {
  const { colors } = useInputGroup();
  return <View style={[styles.addon, position === "start" ? styles.addonStart : styles.addonEnd, style]}><Text style={[styles.addonText, { color: colors.mutedForeground, fontFamily: tokens.fontFamily.sansMedium }, textStyle]}>{children}</Text></View>;
}

export const InputGroup = { Root: InputGroupRoot, Input: InputGroupInput, Addon: InputGroupAddon };

const styles = StyleSheet.create({
  root: { alignItems: "stretch", borderRadius: tokens.radius.md, borderWidth: 1, flexDirection: "row", overflow: "hidden" },
  input: { flex: 1, minWidth: 0, paddingHorizontal: tokens.spacing[2] },
  addon: { alignItems: "center", justifyContent: "center", paddingHorizontal: tokens.spacing[3] },
  addonStart: { paddingRight: 0 },
  addonEnd: { paddingLeft: 0 },
  addonText: { fontSize: tokens.fontSize.sm },
});
