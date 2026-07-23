import { forwardRef, type ReactNode } from "react";
import { StyleSheet, Text, View, type TextProps, type ViewProps } from "react-native";
import { tokens, useArcSynTheme } from "../theme.js";

export const Empty = forwardRef<View, ViewProps>(function Empty({ style, ...props }, ref) { const { colors } = useArcSynTheme(); return <View ref={ref} style={[styles.root, { borderColor: colors.borderStrong }, style]} {...props} />; });
export interface EmptyMediaProps extends ViewProps { children?: ReactNode; }
export const EmptyMedia = forwardRef<View, EmptyMediaProps>(function EmptyMedia({ style, ...props }, ref) { const { colors } = useArcSynTheme(); return <View ref={ref} accessible={false} style={[styles.media, { backgroundColor: colors.surfaceSunken, borderColor: colors.border }, style]} {...props} />; });
export const EmptyHeader = forwardRef<View, ViewProps>(function EmptyHeader({ style, ...props }, ref) { return <View ref={ref} style={[styles.header, style]} {...props} />; });
export const EmptyTitle = forwardRef<Text, TextProps>(function EmptyTitle({ style, ...props }, ref) { const { colors } = useArcSynTheme(); return <Text ref={ref} accessibilityRole="header" style={[styles.title, { color: colors.foreground, fontFamily: tokens.fontFamily.sansSemibold }, style]} {...props} />; });
export const EmptyDescription = forwardRef<Text, TextProps>(function EmptyDescription({ style, ...props }, ref) { const { colors } = useArcSynTheme(); return <Text ref={ref} style={[styles.description, { color: colors.mutedForeground, fontFamily: tokens.fontFamily.sans }, style]} {...props} />; });
export const EmptyContent = forwardRef<View, ViewProps>(function EmptyContent({ style, ...props }, ref) { return <View ref={ref} style={[styles.actions, style]} {...props} />; });
export const EmptyFooter = forwardRef<View, ViewProps>(function EmptyFooter({ style, ...props }, ref) { return <View ref={ref} style={[styles.actions, style]} {...props} />; });

const styles = StyleSheet.create({ root: { alignItems: "center", borderStyle: "dashed", borderWidth: 1, gap: tokens.spacing[4], justifyContent: "center", minHeight: 224, padding: tokens.spacing[6] }, media: { alignItems: "center", borderRadius: tokens.radius.md, borderWidth: 1, height: 44, justifyContent: "center", width: 44 }, header: { alignItems: "center", gap: tokens.spacing[2], maxWidth: 480 }, title: { fontSize: tokens.fontSize.lg, textAlign: "center" }, description: { fontSize: tokens.fontSize.sm, lineHeight: 21, textAlign: "center" }, actions: { alignItems: "center", flexDirection: "row", flexWrap: "wrap", gap: tokens.spacing[2], justifyContent: "center" } });
