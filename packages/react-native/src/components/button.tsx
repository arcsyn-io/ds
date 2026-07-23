import { forwardRef, type ReactNode } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  type PressableProps,
  type StyleProp,
  type TextStyle,
  type View,
  type ViewStyle,
} from "react-native";
import { tokens, useArcSynTheme } from "../theme.js";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends Omit<PressableProps, "children" | "style"> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const heightBySize: Record<ButtonSize, number> = { sm: 40, md: 44, lg: 48 };
const minWidthBySize: Record<ButtonSize, number> = { sm: 80, md: 96, lg: 112 };

export const Button = forwardRef<View, ButtonProps>(function Button(
  { children, variant = "primary", size = "md", loading = false, disabled = false, style, textStyle, ...props },
  ref,
) {
  const { colors } = useArcSynTheme();
  const isDisabled = disabled || loading;
  const palette = {
    primary: { backgroundColor: colors.primary, borderColor: colors.primary, color: colors.primaryForeground },
    secondary: { backgroundColor: "transparent", borderColor: colors.border, color: colors.foreground },
    outline: { backgroundColor: "transparent", borderColor: colors.primary, color: colors.primary },
    ghost: { backgroundColor: "transparent", borderColor: "transparent", color: colors.foreground },
    danger: { backgroundColor: colors.dangerBackground, borderColor: colors.dangerBorder, color: colors.dangerForeground },
  }[variant];

  return (
    <Pressable
      ref={ref}
      accessibilityRole="button"
      accessibilityState={{ busy: loading, disabled: isDisabled }}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.root,
        { backgroundColor: palette.backgroundColor, borderColor: palette.borderColor, minHeight: heightBySize[size], minWidth: minWidthBySize[size] },
        pressed && !isDisabled && styles.pressed,
        isDisabled && styles.disabled,
        style,
      ]}
      {...props}
    >
      {loading ? <ActivityIndicator color={palette.color} size="small" /> : null}
      <Text style={[styles.label, { color: palette.color, fontFamily: tokens.fontFamily.sansSemibold, fontSize: size === "sm" ? tokens.fontSize.xs : tokens.fontSize.sm }, textStyle]}>{children}</Text>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  root: { alignItems: "center", borderRadius: tokens.radius.md, borderWidth: 1, flexDirection: "row", gap: tokens.spacing[2], justifyContent: "center", paddingHorizontal: tokens.spacing[3] },
  label: { includeFontPadding: false, textAlign: "center" },
  pressed: { opacity: 0.82 },
  disabled: { opacity: 0.5 },
});
