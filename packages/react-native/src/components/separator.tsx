import { View, type StyleProp, type ViewStyle } from "react-native";
import { useArcSynTheme } from "../theme.js";
export interface SeparatorProps { orientation?: "horizontal" | "vertical"; style?: StyleProp<ViewStyle>; }
export function Separator({ orientation = "horizontal", style }: SeparatorProps) { const { colors } = useArcSynTheme(); return <View accessibilityRole="none" style={[{ backgroundColor: colors.border, height: orientation === "horizontal" ? 1 : "100%", width: orientation === "vertical" ? 1 : "100%" }, style]} />; }
