import { forwardRef, type ReactNode } from "react";
import { Pressable, StyleSheet, Text, View, type PressableProps, type StyleProp, type TextProps, type ViewProps, type ViewStyle } from "react-native";
import { tokens, useArcSynTheme } from "../theme.js";

export interface CardProps extends ViewProps {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  padding?: "none" | "compact" | "default";
  interactive?: boolean;
  onPress?: PressableProps["onPress"];
}

const CardRoot = forwardRef<View, CardProps>(function CardRoot({ style, padding = "default", interactive = false, onPress, ...props }, ref) {
  const { colors } = useArcSynTheme();
  const rootStyle = [styles.root, padding === "none" ? styles.paddingNone : padding === "compact" ? styles.paddingCompact : styles.paddingDefault, { backgroundColor: colors.surfaceRaised, borderColor: colors.border }, style];
  if (interactive) return <Pressable ref={ref as never} onPress={onPress} accessibilityRole="button" style={({ pressed }) => [rootStyle, pressed && styles.pressed]} {...props as PressableProps} />;
  return <View ref={ref} style={rootStyle} {...props} />;
});

function CardHeader({ style, ...props }: ViewProps) { return <View style={[styles.header, style]} {...props} />; }
function CardHeading({ style, ...props }: ViewProps) { return <View style={[styles.heading, style]} {...props} />; }
function CardActions({ style, ...props }: ViewProps) { return <View style={[styles.actions, style]} {...props} />; }
function CardContent({ style, ...props }: ViewProps) { return <View style={[styles.content, style]} {...props} />; }
function CardFooter({ style, ...props }: ViewProps) { return <View style={[styles.footer, style]} {...props} />; }
function CardText({ kind, style, ...props }: TextProps & { kind: "eyebrow" | "title" | "description" }) {
  const { colors } = useArcSynTheme();
  return <Text style={[styles[kind], { color: kind === "title" ? colors.foreground : colors.mutedForeground }, style]} {...props} />;
}
export const Card = Object.assign(CardRoot, {
  Root: CardRoot,
  Header: CardHeader,
  Heading: CardHeading,
  Eyebrow: (props: TextProps) => <CardText kind="eyebrow" {...props} />,
  Title: (props: TextProps) => <CardText kind="title" accessibilityRole="header" {...props} />,
  Description: (props: TextProps) => <CardText kind="description" {...props} />,
  Actions: CardActions,
  Content: CardContent,
  Footer: CardFooter,
});

const styles = StyleSheet.create({
  root: { borderRadius: tokens.radius.md, borderWidth: 1, overflow: "hidden" },
  paddingNone: { padding: 0 },
  paddingCompact: { padding: tokens.spacing[3] },
  paddingDefault: { padding: tokens.spacing[4] },
  pressed: { opacity: .88 },
  header: { alignItems: "flex-start", flexDirection: "row", gap: tokens.spacing[4], justifyContent: "space-between" },
  heading: { flex: 1, gap: tokens.spacing[1] },
  actions: { alignItems: "center", flexDirection: "row", gap: tokens.spacing[2] },
  content: { marginTop: tokens.spacing[4] },
  footer: { alignItems: "center", flexDirection: "row", gap: tokens.spacing[2], marginTop: tokens.spacing[4] },
  eyebrow: { fontSize: tokens.fontSize.xs, fontWeight: "600", letterSpacing: .7, textTransform: "uppercase" },
  title: { fontSize: tokens.fontSize.md, fontWeight: "600" },
  description: { fontSize: tokens.fontSize.sm },
});
