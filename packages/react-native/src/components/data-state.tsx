import { type ReactNode } from "react";
import { StyleSheet, Text, View, type ViewProps } from "react-native";
import { AlertIcon, InfoIcon, SearchIcon } from "../icons/index.js";
import { tokens, useArcSynTheme } from "../theme.js";
import { Skeleton } from "./skeleton.js";
export type DataStateKind = "loading" | "empty" | "no-results" | "error" | "permission";
export interface DataStateProps extends ViewProps { state: DataStateKind; size?: "compact" | "default" | "full"; title?: ReactNode; description?: ReactNode; icon?: ReactNode; action?: ReactNode; secondaryAction?: ReactNode; skeletonCount?: number; loadingLabel?: string; }
const titles: Record<DataStateKind, string> = { loading: "Carregando dados", empty: "Nenhum item disponível", "no-results": "Nenhum resultado encontrado", error: "Não foi possível carregar os dados", permission: "Acesso não permitido" };
export function DataState({ state, size = "default", title, description, icon, action, secondaryAction, skeletonCount = 3, loadingLabel = "Carregando dados", style, ...props }: DataStateProps) {
  const { colors } = useArcSynTheme();
  if (state === "loading") return <View accessibilityRole="progressbar" accessibilityLabel={loadingLabel} style={[styles.root, styles.skeletons, style]} {...props}>{Array.from({ length: skeletonCount }, (_, index) => <Skeleton key={index} height={index ? 12 : 16} width={`${80 - index * 8}%`} />)}</View>;
  const Icon = state === "error" ? AlertIcon : state === "no-results" ? SearchIcon : InfoIcon;
  return <View accessibilityRole={state === "error" ? "alert" : "text"} style={[styles.root, size === "compact" ? styles.compact : size === "full" ? styles.full : null, style]} {...props}><View style={[styles.icon, { backgroundColor: state === "error" ? colors.dangerBackground : colors.muted }]}>{icon ?? <Icon accessible={false} color={state === "error" ? colors.danger : colors.mutedForeground} size={24} />}</View><Text accessibilityRole="header" style={[styles.title, { color: colors.foreground }]}>{title ?? titles[state]}</Text>{description ? <Text style={[styles.description, { color: colors.mutedForeground }]}>{description}</Text> : null}<View style={styles.actions}>{action}{secondaryAction}</View></View>;
}
const styles = StyleSheet.create({ root: { alignItems: "center", gap: tokens.spacing[3], justifyContent: "center", minHeight: 192, padding: tokens.spacing[6] }, compact: { minHeight: 112, padding: tokens.spacing[3] }, full: { minHeight: 400 }, skeletons: { alignItems: "stretch" }, icon: { alignItems: "center", borderRadius: tokens.radius.md, justifyContent: "center", minHeight: 48, minWidth: 48, padding: tokens.spacing[3] }, title: { fontFamily: tokens.fontFamily.sansSemibold, fontSize: tokens.fontSize.md, textAlign: "center" }, description: { fontSize: tokens.fontSize.sm, textAlign: "center" }, actions: { alignItems: "center", flexDirection: "row", gap: tokens.spacing[2] } });
