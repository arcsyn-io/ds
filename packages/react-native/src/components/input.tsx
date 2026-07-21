import { forwardRef } from "react";
import { StyleSheet, TextInput, type StyleProp, type TextInputProps, type TextStyle } from "react-native";
import { tokens, useArcSynTheme } from "../theme.js";

export type InputSize = "sm" | "md" | "lg";

export interface InputProps extends Omit<TextInputProps, "style"> {
  invalid?: boolean;
  size?: InputSize;
  style?: StyleProp<TextStyle>;
}

const heightBySize: Record<InputSize, number> = { sm: 40, md: 44, lg: 48 };

export const Input = forwardRef<TextInput, InputProps>(function Input({ invalid = false, size = "md", style, ...props }, ref) {
  const { colors } = useArcSynTheme();
  return <TextInput ref={ref} placeholderTextColor={colors.mutedForeground} accessibilityState={{ disabled: props.editable === false }} style={[styles.root, { borderColor: invalid ? colors.danger : colors.border, color: colors.foreground, minHeight: heightBySize[size], fontFamily: tokens.fontFamily.sans, fontSize: tokens.fontSize.sm }, style]} {...props} />;
});

const styles = StyleSheet.create({
  root: { backgroundColor: "transparent", borderRadius: tokens.radius.md, borderWidth: 1, paddingHorizontal: tokens.spacing[3] },
});
