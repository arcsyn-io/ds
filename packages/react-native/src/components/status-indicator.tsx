import { type ReactNode } from "react";
import { StyleSheet, Text, View, type ViewProps } from "react-native";
import { tokens, useArcSynTheme } from "../theme.js";
import { Spinner } from "./spinner.js";
export type StatusIndicatorStatus = "neutral" | "info" | "success" | "warning" | "danger" | "loading";
export interface StatusIndicatorProps extends ViewProps { status?: StatusIndicatorStatus; size?: "sm" | "md" | "lg"; format?: "inline" | "pill"; label?: ReactNode; iconOnly?: boolean; accessibleLabel?: string; }
export function StatusIndicator({ status = "neutral", size = "md", format = "inline", label, iconOnly = false, accessibleLabel, style, children, ...props }: StatusIndicatorProps) {
  const { colors } = useArcSynTheme();
  const color = status === "success" ? colors.success : status === "warning" ? colors.warning : status === "danger" ? colors.danger : status === "info" ? colors.accentSolid : colors.mutedForeground;
  const backgroundColor = status === "success" ? colors.successBackground : status === "warning" ? colors.warningBackground : status === "danger" ? colors.dangerBackground : status === "info" ? colors.accent : colors.surfaceSunken;
  const borderColor = status === "success" ? colors.successBorder : status === "warning" ? colors.warningBorder : status === "danger" ? colors.dangerBorder : status === "info" ? colors.accentBorder : colors.border;
  const text = label ?? children ?? status;
  return <View accessible={iconOnly} accessibilityLabel={iconOnly ? accessibleLabel ?? String(text) : undefined} style={[styles.root, format === "pill" && { backgroundColor, borderColor, borderRadius: tokens.radius.full, borderWidth: 1, paddingHorizontal: tokens.spacing[2], paddingVertical: tokens.spacing[1] }, style]} {...props}>{status === "loading" ? <Spinner size="sm" /> : <View accessible={false} style={[styles.dot, { backgroundColor: color }]} />}{!iconOnly ? <Text style={{ color, fontFamily: tokens.fontFamily.sansMedium, fontSize: size === "sm" ? tokens.fontSize.xs : size === "lg" ? tokens.fontSize.md : tokens.fontSize.sm }}>{text}</Text> : null}</View>;
}
const styles = StyleSheet.create({ root: { alignItems: "center", flexDirection: "row", gap: tokens.spacing[2] }, dot: { borderRadius: tokens.radius.full, height: 8, width: 8 } });
