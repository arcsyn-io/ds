import { useState } from "react";
import { Switch as NativeSwitch, type StyleProp, type ViewStyle } from "react-native";
import { useArcSynTheme } from "../theme.js";

export interface SwitchProps { value?: boolean; defaultValue?: boolean; disabled?: boolean; onValueChange?: (value: boolean) => void; accessibilityLabel?: string; style?: StyleProp<ViewStyle>; }

export function Switch({ value, defaultValue, disabled, onValueChange, accessibilityLabel, style }: SwitchProps) {
  const { colors } = useArcSynTheme();
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue ?? false);
  const currentValue = value ?? uncontrolledValue;
  function change(nextValue: boolean) { if (value === undefined) setUncontrolledValue(nextValue); onValueChange?.(nextValue); }
  return <NativeSwitch value={currentValue} disabled={disabled} onValueChange={change} accessibilityLabel={accessibilityLabel} trackColor={{ false: colors.surfaceSunken, true: colors.primary }} thumbColor={currentValue ? colors.primaryForeground : colors.mutedForeground} style={style} />;
}
