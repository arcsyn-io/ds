import { forwardRef, type ReactNode } from "react";
import { StyleSheet, View, type StyleProp, type ViewProps, type ViewStyle } from "react-native";
import { tokens, useArcSynTheme } from "../theme.js";

export interface CardProps extends ViewProps {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const Card = forwardRef<View, CardProps>(function Card({ style, ...props }, ref) {
  const { colors } = useArcSynTheme();
  return <View ref={ref} style={[styles.root, { backgroundColor: colors.surfaceRaised, borderColor: colors.border }, style]} {...props} />;
});

const styles = StyleSheet.create({
  root: { borderRadius: tokens.radius.lg, borderWidth: 1, padding: tokens.spacing[4] },
});
