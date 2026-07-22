import { View, type StyleProp, type ViewStyle } from "react-native";

export interface AspectRatioProps { ratio?: number; children?: React.ReactNode; style?: StyleProp<ViewStyle>; }

export function AspectRatio({ ratio = 16 / 9, children, style }: AspectRatioProps) {
  return <View style={[{ aspectRatio: ratio > 0 ? ratio : 16 / 9, overflow: "hidden", width: "100%" }, style]}>{children}</View>;
}
