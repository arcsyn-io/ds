import { forwardRef, useEffect, useRef, type ComponentRef } from "react";
import { Animated, Easing, type DimensionValue, type StyleProp, type ViewStyle } from "react-native";
import { tokens, useArcSynTheme } from "../theme.js";

export type SkeletonVariant = "text" | "rectangular" | "circular";
export interface SkeletonProps {
  animated?: boolean;
  height?: DimensionValue;
  style?: StyleProp<ViewStyle>;
  variant?: SkeletonVariant;
  width?: DimensionValue;
}

export const Skeleton = forwardRef<ComponentRef<typeof Animated.View>, SkeletonProps>(function Skeleton({ animated = true, height, style, variant = "rectangular", width = "100%" }, ref) {
  const opacity = useRef(new Animated.Value(animated ? 0.55 : 1)).current;
  const { colors } = useArcSynTheme();
  useEffect(() => {
    if (!animated) { opacity.setValue(1); return; }
    const animation = Animated.loop(Animated.sequence([Animated.timing(opacity, { duration: 800, easing: Easing.inOut(Easing.ease), toValue: 1, useNativeDriver: true }), Animated.timing(opacity, { duration: 800, easing: Easing.inOut(Easing.ease), toValue: 0.55, useNativeDriver: true })]));
    animation.start();
    return () => animation.stop();
  }, [animated, opacity]);
  const resolvedHeight = height ?? (variant === "text" ? 14 : variant === "circular" ? 44 : 64);
  return <Animated.View ref={ref} accessible={false} style={[{ backgroundColor: colors.muted, borderRadius: variant === "circular" ? 999 : variant === "text" ? 2 : tokens.radius.sm, height: resolvedHeight, opacity, width }, style]} />;
});
