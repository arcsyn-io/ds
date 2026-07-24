import { type ReactNode } from "react";
import { StyleSheet, Text, View, type TextProps, type ViewProps } from "react-native";
import { tokens, useArcSynTheme } from "../theme.js";
export interface PageHeaderProps extends ViewProps { title: ReactNode; eyebrow?: ReactNode; description?: ReactNode; breadcrumb?: ReactNode; metadata?: ReactNode; actions?: ReactNode; density?: "compact" | "default"; }
export function PageHeader({ title, eyebrow, description, breadcrumb, metadata, actions, density = "default", style, ...props }: PageHeaderProps) {
  const { colors } = useArcSynTheme();
  return <View style={[styles.root, density === "compact" ? styles.compact : styles.standard, { backgroundColor: colors.surfaceRaised, borderColor: colors.border }, style]} {...props}>{breadcrumb}<View style={styles.content}>{eyebrow ? <Text style={[styles.eyebrow, { color: colors.mutedForeground }]}>{eyebrow}</Text> : null}<Text accessibilityRole="header" style={[styles.title, { color: colors.foreground }]}>{title}</Text>{description ? <Text style={[styles.description, { color: colors.mutedForeground }]}>{description}</Text> : null}{metadata}</View>{actions ? <View style={styles.actions}>{actions}</View> : null}</View>;
}
export const PageHeaderTitle = (props: TextProps) => <Text accessibilityRole="header" style={[styles.title, props.style]} {...props} />;
const styles = StyleSheet.create({ root: { borderRadius: tokens.radius.md, borderWidth: 1 }, standard: { gap: tokens.spacing[4], padding: tokens.spacing[5] }, compact: { gap: tokens.spacing[3], padding: tokens.spacing[4] }, content: { gap: tokens.spacing[2] }, eyebrow: { fontFamily: tokens.fontFamily.sansSemibold, fontSize: tokens.fontSize.xs, letterSpacing: .7, textTransform: "uppercase" }, title: { fontFamily: tokens.fontFamily.sansSemibold, fontSize: tokens.fontSize["2xl"] }, description: { fontSize: tokens.fontSize.sm }, actions: { flexDirection: "row", flexWrap: "wrap", gap: tokens.spacing[2] } });
