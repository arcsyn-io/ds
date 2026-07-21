import { type ReactNode } from "react";
import { StyleSheet, Text, View, type StyleProp, type TextStyle, type ViewStyle } from "react-native";
import { tokens, useArcSynTheme } from "../theme.js";

export type BadgeVariant = "neutral" | "accent" | "success" | "warning" | "danger";

export interface BadgeProps { children: ReactNode; variant?: BadgeVariant; style?: StyleProp<ViewStyle>; textStyle?: StyleProp<TextStyle>; }

export function Badge({ children, variant = "neutral", style, textStyle }: BadgeProps) {
  const { colors } = useArcSynTheme();
  const palette = {
    neutral: { backgroundColor: colors.muted, color: colors.foreground },
    accent: { backgroundColor: colors.accent, color: colors.accentForeground },
    success: { backgroundColor: colors.success, color: colors.accentForeground },
    warning: { backgroundColor: colors.warning, color: colors.accentForeground },
    danger: { backgroundColor: colors.danger, color: "#ffffff" },
  }[variant];
  return <View style={[styles.root, { backgroundColor: palette.backgroundColor }, style]}><Text style={[styles.label, { color: palette.color, fontFamily: tokens.fontFamily.sansSemibold }, textStyle]}>{children}</Text></View>;
}

const styles = StyleSheet.create({
  root: { alignSelf: "flex-start", borderRadius: 9999, minHeight: 20, paddingHorizontal: tokens.spacing[2], justifyContent: "center" },
  label: { fontSize: tokens.fontSize.xs, includeFontPadding: false },
});
