import { ActivityIndicator, View, type StyleProp, type ViewStyle } from "react-native";
import { useArcSynTheme } from "../theme.js";

export type SpinnerSize = "sm" | "md" | "lg";

export interface SpinnerProps { size?: SpinnerSize; label?: string; style?: StyleProp<ViewStyle>; }

export function Spinner({ size = "md", label, style }: SpinnerProps) {
  const { colors } = useArcSynTheme();
  return <View accessibilityRole="progressbar" accessibilityLabel={label} style={style}><ActivityIndicator color={colors.primary} size={size === "lg" ? "large" : "small"} /></View>;
}
