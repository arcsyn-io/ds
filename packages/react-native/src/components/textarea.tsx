import { forwardRef } from "react";
import { StyleSheet, TextInput, type StyleProp, type TextInputProps, type TextStyle } from "react-native";
import { tokens, useArcSynTheme } from "../theme.js";

export interface TextareaProps extends Omit<TextInputProps, "style" | "multiline"> { invalid?: boolean; style?: StyleProp<TextStyle>; }

export const Textarea = forwardRef<TextInput, TextareaProps>(function Textarea({ invalid = false, style, ...props }, ref) {
  const { colors } = useArcSynTheme();
  return <TextInput ref={ref} multiline textAlignVertical="top" placeholderTextColor={colors.mutedForeground} accessibilityState={{ disabled: props.editable === false }} style={[styles.root, { backgroundColor: colors.surface, borderColor: invalid ? colors.danger : colors.border, color: colors.foreground, fontFamily: tokens.fontFamily.sans }, style]} {...props} />;
});

const styles = StyleSheet.create({ root: { borderRadius: tokens.radius.md, borderWidth: 1, fontSize: tokens.fontSize.sm, minHeight: 112, padding: tokens.spacing[3] } });
