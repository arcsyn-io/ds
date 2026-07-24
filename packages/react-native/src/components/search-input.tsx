import { forwardRef, useState } from "react";
import { Platform, Pressable, StyleSheet, Text, TextInput, View, type TextInputProps } from "react-native";
import { SearchIcon, XIcon } from "../icons/index.js";
import { tokens, useArcSynTheme } from "../theme.js";
import { Spinner } from "./spinner.js";
export interface SearchInputProps extends Omit<TextInputProps, "onChangeText"> { invalid?: boolean; size?: "sm" | "md" | "lg"; loading?: boolean; clearable?: boolean; clearLabel?: string; shortcut?: string; onValueChange?: (value: string) => void; onClear?: () => void; }
export const SearchInput = forwardRef<TextInput, SearchInputProps>(function SearchInput({ value, defaultValue, invalid = false, size = "md", loading = false, clearable = false, clearLabel = "Limpar busca", shortcut, onValueChange, onClear, style, ...props }, ref) {
  const { colors } = useArcSynTheme();
  const [internal, setInternal] = useState(defaultValue ?? "");
  const current = value ?? internal;
  const shortcutLabel = shortcut?.replace(/mod/gi, Platform.OS === "ios" ? "⌘" : "Ctrl");
  function update(next: string) { if (value === undefined) setInternal(next); onValueChange?.(next); }
  return <View style={[styles.root, { backgroundColor: colors.surfaceSunken, borderColor: invalid ? colors.dangerBorder : colors.borderStrong, minHeight: size === "lg" ? 48 : 44 }, style]}><SearchIcon accessible={false} color={colors.mutedForeground} size={16} /><TextInput ref={ref} accessibilityRole="search" placeholderTextColor={colors.mutedForeground} style={[styles.input, { color: colors.foreground }]} value={current} onChangeText={update} {...props} />{loading ? <Spinner size="sm" label="Carregando resultados" /> : null}{clearable && current && !loading ? <Pressable accessibilityLabel={clearLabel} accessibilityRole="button" hitSlop={8} onPress={() => { update(""); onClear?.(); }}><XIcon accessible={false} color={colors.mutedForeground} size={16} /></Pressable> : null}{shortcutLabel ? <Text accessible={false} style={[styles.shortcut, { color: colors.mutedForeground, borderColor: colors.border }]}>{shortcutLabel}</Text> : null}</View>;
});
const styles = StyleSheet.create({ root: { alignItems: "center", borderRadius: tokens.radius.md, borderWidth: 1, flexDirection: "row", gap: tokens.spacing[2], paddingHorizontal: tokens.spacing[3] }, input: { flex: 1, fontFamily: tokens.fontFamily.sans, fontSize: tokens.fontSize.sm, padding: 0 }, shortcut: { borderRadius: tokens.radius.sm, borderWidth: 1, fontFamily: tokens.fontFamily.mono, fontSize: tokens.fontSize.xs, paddingHorizontal: tokens.spacing[1] } });
