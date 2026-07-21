import { forwardRef, type ReactNode } from "react";
import { StyleSheet, Text, View, type StyleProp, type TextStyle, type ViewProps, type ViewStyle } from "react-native";
import { tokens, useArcSynTheme } from "../theme.js";

export interface FieldRootProps extends ViewProps {
  style?: StyleProp<ViewStyle>;
}

export const FieldRoot = forwardRef<View, FieldRootProps>(function FieldRoot({ style, ...props }, ref) {
  return <View ref={ref} style={[styles.root, style]} {...props} />;
});

export interface FieldLabelProps { children: ReactNode; style?: StyleProp<TextStyle>; nativeID?: string; }

export function FieldLabel({ children, style, nativeID }: FieldLabelProps) {
  const { colors } = useArcSynTheme();
  return <Text nativeID={nativeID} style={[styles.label, { color: colors.foreground, fontFamily: tokens.fontFamily.sansSemibold }, style]}>{children}</Text>;
}

export interface FieldDescriptionProps { children: ReactNode; style?: StyleProp<TextStyle>; nativeID?: string; }

export function FieldDescription({ children, style, nativeID }: FieldDescriptionProps) {
  const { colors } = useArcSynTheme();
  return <Text nativeID={nativeID} style={[styles.description, { color: colors.mutedForeground, fontFamily: tokens.fontFamily.sans }, style]}>{children}</Text>;
}

export interface FieldErrorProps { children: ReactNode; style?: StyleProp<TextStyle>; nativeID?: string; }

export function FieldError({ children, style, nativeID }: FieldErrorProps) {
  const { colors } = useArcSynTheme();
  return <Text nativeID={nativeID} accessibilityLiveRegion="polite" style={[styles.error, { color: colors.danger, fontFamily: tokens.fontFamily.sansMedium }, style]}>{children}</Text>;
}

export const Field = { Root: FieldRoot, Label: FieldLabel, Description: FieldDescription, Error: FieldError };

const styles = StyleSheet.create({
  root: { gap: tokens.spacing[1] },
  label: { fontSize: tokens.fontSize.sm, lineHeight: 19 },
  description: { fontSize: tokens.fontSize.xs, lineHeight: 17 },
  error: { fontSize: tokens.fontSize.xs, lineHeight: 17 },
});
