import { forwardRef, useState } from "react";
import { Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from "react-native";
import { tokens, useArcSynTheme } from "../theme.js";

export interface CheckboxProps { checked?: boolean; defaultChecked?: boolean; disabled?: boolean; invalid?: boolean; onCheckedChange?: (checked: boolean) => void; accessibilityLabel?: string; style?: StyleProp<ViewStyle>; }

export const Checkbox = forwardRef<React.ComponentRef<typeof Pressable>, CheckboxProps>(function Checkbox({ checked, defaultChecked = false, disabled = false, invalid = false, onCheckedChange, accessibilityLabel, style }, ref) {
  const [uncontrolledChecked, setUncontrolledChecked] = useState(defaultChecked);
  const value = checked ?? uncontrolledChecked;
  const { colors } = useArcSynTheme();
  function toggle() { if (disabled) return; const next = !value; if (checked === undefined) setUncontrolledChecked(next); onCheckedChange?.(next); }
  return <Pressable ref={ref} onPress={toggle} disabled={disabled} accessibilityRole="checkbox" accessibilityLabel={accessibilityLabel} accessibilityState={{ checked: value, disabled }} style={[styles.root, { backgroundColor: value ? colors.primary : colors.surface, borderColor: invalid ? colors.danger : value ? colors.primary : colors.borderStrong, opacity: disabled ? 0.5 : 1 }, style]}>{value ? <Text style={[styles.check, { color: colors.primaryForeground }]}>✓</Text> : null}</Pressable>;
});

const styles = StyleSheet.create({ root: { alignItems: "center", borderRadius: tokens.radius.sm, borderWidth: 1, height: 20, justifyContent: "center", width: 20 }, check: { fontFamily: tokens.fontFamily.sansSemibold, fontSize: 13, lineHeight: 16 } });
