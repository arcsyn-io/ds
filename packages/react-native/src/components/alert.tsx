import { type ReactNode } from "react";
import { StyleSheet, Text, View, type StyleProp, type TextStyle, type ViewStyle } from "react-native";
import { tokens, useArcSynTheme } from "../theme.js";

export type AlertVariant = "info" | "success" | "warning" | "danger";

export interface AlertProps {
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  variant?: AlertVariant;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  descriptionStyle?: StyleProp<TextStyle>;
}

export function Alert({ title, description, children, variant = "info", style, titleStyle, descriptionStyle }: AlertProps) {
  const { colors } = useArcSynTheme();
  const accentColor = { info: colors.accent, success: colors.success, warning: colors.warning, danger: colors.danger }[variant];
  return <View accessibilityLiveRegion="polite" style={[styles.root, { backgroundColor: colors.surfaceSunken, borderColor: colors.border, borderLeftColor: accentColor }, style]}><Text style={[styles.title, { color: colors.foreground, fontFamily: tokens.fontFamily.sansSemibold }, titleStyle]}>{title}</Text>{description ? <Text style={[styles.description, { color: colors.mutedForeground, fontFamily: tokens.fontFamily.sans }, descriptionStyle]}>{description}</Text> : null}{children}</View>;
}

const styles = StyleSheet.create({
  root: { borderLeftWidth: 3, borderRadius: tokens.radius.md, borderWidth: 1, gap: tokens.spacing[1], padding: tokens.spacing[3] },
  title: { fontSize: tokens.fontSize.sm, lineHeight: 19 },
  description: { fontSize: tokens.fontSize.sm, lineHeight: 20 },
});
