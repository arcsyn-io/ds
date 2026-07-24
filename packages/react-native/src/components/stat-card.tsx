import { type ReactNode } from "react";
import { StyleSheet, Text, View, type ViewProps } from "react-native";
import { ArrowDownIcon, ArrowUpIcon, MinusIcon } from "../icons/index.js";
import { tokens, useArcSynTheme } from "../theme.js";
import { Skeleton } from "./skeleton.js";

export interface StatCardProps extends ViewProps {
  label: ReactNode;
  value: ReactNode;
  description?: ReactNode;
  trend?: { value: ReactNode; direction: "up" | "down" | "neutral"; sentiment?: "positive" | "negative" | "neutral"; accessibleLabel?: string };
  icon?: ReactNode;
  visualization?: ReactNode;
  density?: "compact" | "default";
  loading?: boolean;
  valueAccessibilityLabel?: string;
}
export function StatCard({ label, value, description, trend, icon, visualization, density = "default", loading = false, valueAccessibilityLabel, style, ...props }: StatCardProps) {
  const { colors } = useArcSynTheme();
  const TrendIcon = trend?.direction === "up" ? ArrowUpIcon : trend?.direction === "down" ? ArrowDownIcon : MinusIcon;
  const trendColor = trend?.sentiment === "positive" ? colors.success : trend?.sentiment === "negative" ? colors.danger : colors.mutedForeground;
  const trendBackground = trend?.sentiment === "positive" ? colors.successBackground : trend?.sentiment === "negative" ? colors.dangerBackground : colors.surfaceSunken;
  const trendBorder = trend?.sentiment === "positive" ? colors.successBorder : trend?.sentiment === "negative" ? colors.dangerBorder : colors.border;
  return <View accessibilityState={{ busy: loading }} style={[styles.root, density === "compact" ? styles.compact : styles.standard, { backgroundColor: colors.surfaceRaised, borderColor: colors.border }, style]} {...props}>
    <View style={styles.header}><Text style={[styles.label, { color: colors.mutedForeground }]}>{loading ? "" : label}</Text>{icon ? <View style={[styles.icon, { backgroundColor: colors.surfaceSunken, borderColor: colors.border }]}>{icon}</View> : null}</View>
    {loading ? <Skeleton height={30} width="68%" /> : <Text accessibilityLabel={valueAccessibilityLabel} style={[styles.value, { color: colors.foreground }]}>{value}</Text>}
    {!loading && trend ? <View accessibilityLabel={trend.accessibleLabel ?? `${trend.direction}: ${String(trend.value)}`} style={[styles.trend, { backgroundColor: trendBackground, borderColor: trendBorder }]}><TrendIcon accessible={false} color={trendColor} size={14} /><Text style={[styles.trendText, { color: trendColor }]}>{trend.value}</Text></View> : null}
    {description ? <Text style={[styles.description, { color: colors.mutedForeground }]}>{description}</Text> : null}
    {!loading && visualization ? <View style={styles.visualization}>{visualization}</View> : null}
  </View>;
}
const styles = StyleSheet.create({
  root: { borderRadius: tokens.radius.md, borderWidth: 1, overflow: "hidden" },
  standard: { gap: tokens.spacing[2], padding: tokens.spacing[4] },
  compact: { gap: tokens.spacing[1], padding: tokens.spacing[3] },
  header: { alignItems: "center", flexDirection: "row", justifyContent: "space-between" },
  icon: { alignItems: "center", borderRadius: tokens.radius.sm, borderWidth: 1, height: 36, justifyContent: "center", width: 36 },
  label: { fontFamily: tokens.fontFamily.sansMedium, fontSize: tokens.fontSize.sm },
  value: { fontFamily: tokens.fontFamily.monoMedium, fontSize: tokens.fontSize["2xl"], fontVariant: ["tabular-nums"], fontWeight: "600" },
  trend: { alignItems: "center", alignSelf: "flex-start", borderRadius: tokens.radius.full, borderWidth: 1, flexDirection: "row", gap: tokens.spacing[1], paddingHorizontal: tokens.spacing[2], paddingVertical: tokens.spacing[1] },
  trendText: { fontFamily: tokens.fontFamily.sansSemibold, fontSize: tokens.fontSize.xs },
  description: { fontSize: tokens.fontSize.xs },
  visualization: { marginTop: tokens.spacing[2] },
});
