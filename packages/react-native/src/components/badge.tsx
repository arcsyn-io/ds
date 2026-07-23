import { type ReactNode } from "react";
import { StyleSheet, Text, View, type StyleProp, type TextStyle, type ViewStyle } from "react-native";
import { tokens, useArcSynTheme } from "../theme.js";

export type BadgeVariant = "neutral" | "accent" | "success" | "warning" | "danger";

export interface BadgeProps { children: ReactNode; variant?: BadgeVariant; style?: StyleProp<ViewStyle>; textStyle?: StyleProp<TextStyle>; }

export function Badge({ children, variant = "neutral", style, textStyle }: BadgeProps) {
  const { colors } = useArcSynTheme();
  const palette = {
    neutral: { backgroundColor: colors.muted, borderColor: "transparent", color: colors.foreground },
    accent: { backgroundColor: colors.accent, borderColor: colors.accentBorder, color: colors.accentForeground },
    success: { backgroundColor: colors.successBackground, borderColor: colors.successBorder, color: colors.successForeground },
    warning: { backgroundColor: colors.warningBackground, borderColor: colors.warningBorder, color: colors.warningForeground },
    danger: { backgroundColor: colors.dangerBackground, borderColor: colors.dangerBorder, color: colors.dangerForeground },
  }[variant];
  return <View style={[styles.root, { backgroundColor: palette.backgroundColor, borderColor: palette.borderColor }, style]}><Text style={[styles.label, { color: palette.color, fontFamily: tokens.fontFamily.sansSemibold }, textStyle]}>{children}</Text></View>;
}

const styles = StyleSheet.create({
  root: { alignSelf: "flex-start", borderRadius: 9999, borderWidth: 1, minHeight: 20, paddingHorizontal: tokens.spacing[2], justifyContent: "center" },
  label: { fontSize: tokens.fontSize.xs, includeFontPadding: false },
});
