import { forwardRef } from "react";
import { StyleSheet, Text, type TextProps } from "react-native";
import { tokens, useArcSynTheme } from "../theme.js";
export type KbdProps = TextProps;
export const Kbd = forwardRef<Text, KbdProps>(function Kbd({ style, ...props }, ref) { const { colors } = useArcSynTheme(); return <Text ref={ref} accessibilityRole="text" style={[styles.root, { backgroundColor: colors.surfaceSunken, borderColor: colors.borderStrong, color: colors.foreground, fontFamily: tokens.fontFamily.mono }, style]} {...props} />; });
const styles = StyleSheet.create({ root: { borderRadius: tokens.radius.sm, borderWidth: 1, fontSize: tokens.fontSize.xs, minHeight: 24, minWidth: 24, paddingHorizontal: tokens.spacing[1], textAlign: "center", textAlignVertical: "center" } });
