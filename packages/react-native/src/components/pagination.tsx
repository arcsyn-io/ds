import type { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from "react-native";
import { ArrowLeftIcon, ArrowRightIcon, EllipsisIcon } from "../icons/index.js";
import { tokens, useArcSynTheme } from "../theme.js";

export interface PaginationProps {
  accessibilityLabel?: string;
  onPageChange?: (page: number) => void;
  page: number;
  siblingCount?: number;
  style?: StyleProp<ViewStyle>;
  totalPages: number;
}

type PageToken = number | "ellipsis-start" | "ellipsis-end";
function pageRange(page: number, total: number, siblings: number): PageToken[] {
  if (total <= 7) return Array.from({ length: total }, (_, index) => index + 1);
  const start = Math.max(2, page - siblings);
  const end = Math.min(total - 1, page + siblings);
  return [1, ...(start > 2 ? ["ellipsis-start" as const] : []), ...Array.from({ length: end - start + 1 }, (_, index) => start + index), ...(end < total - 1 ? ["ellipsis-end" as const] : []), total];
}

export function Pagination({ accessibilityLabel = "Paginação", onPageChange, page, siblingCount = 1, style, totalPages }: PaginationProps) {
  const { colors } = useArcSynTheme();
  const current = Math.min(Math.max(page, 1), Math.max(totalPages, 1));
  const pages = pageRange(current, Math.max(totalPages, 1), siblingCount);
  const control = (label: string, target: number, disabled: boolean, icon: ReactNode) => <Pressable accessibilityRole="button" accessibilityLabel={label} accessibilityState={{ disabled }} disabled={disabled} onPress={() => onPageChange?.(target)} style={[styles.button, { borderColor: colors.border, opacity: disabled ? 0.45 : 1 }]}>{icon}</Pressable>;
  return <View accessible accessibilityLabel={accessibilityLabel} style={[styles.root, style]}>{control("Página anterior", current - 1, current <= 1, <ArrowLeftIcon accessible={false} color={colors.foreground} size={16} />)}{pages.map((item) => typeof item === "number" ? <Pressable key={item} accessibilityRole="button" accessibilityLabel={`Página ${item}`} accessibilityState={{ selected: item === current }} onPress={() => onPageChange?.(item)} style={[styles.button, { backgroundColor: item === current ? colors.surfaceSunken : "transparent", borderColor: item === current ? colors.borderStrong : colors.border }]}><Text style={[styles.text, { color: colors.foreground, fontFamily: item === current ? tokens.fontFamily.sansSemibold : tokens.fontFamily.sans }]}>{item}</Text></Pressable> : <View key={item} accessible={false} style={styles.ellipsis}><EllipsisIcon color={colors.mutedForeground} size={16} /></View>)}{control("Próxima página", current + 1, current >= totalPages, <ArrowRightIcon accessible={false} color={colors.foreground} size={16} />)}</View>;
}

const styles = StyleSheet.create({ root: { alignItems: "center", flexDirection: "row", flexWrap: "wrap", gap: tokens.spacing[1], justifyContent: "center" }, button: { alignItems: "center", borderRadius: tokens.radius.sm, borderWidth: 1, height: 44, justifyContent: "center", minWidth: 44, paddingHorizontal: tokens.spacing[2] }, text: { fontSize: tokens.fontSize.sm }, ellipsis: { alignItems: "center", justifyContent: "center", minWidth: 24 } });
