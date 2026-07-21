import { createContext, forwardRef, useContext, useState, type ReactNode } from "react";
import { Modal, Pressable, StyleSheet, Text, View, type StyleProp, type TextStyle, type ViewProps, type ViewStyle } from "react-native";
import { Button, type ButtonProps, type ButtonSize, type ButtonVariant } from "./button.js";
import { tokens, useArcSynTheme } from "../theme.js";

interface DialogContextValue { open: boolean; setOpen: (open: boolean) => void; }

const DialogContext = createContext<DialogContextValue | null>(null);

export interface DialogRootProps { children: ReactNode; open?: boolean; defaultOpen?: boolean; onOpenChange?: (open: boolean) => void; }

export function DialogRoot({ children, open, defaultOpen = false, onOpenChange }: DialogRootProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isOpen = open ?? uncontrolledOpen;
  const setOpen = (nextOpen: boolean) => { if (open === undefined) setUncontrolledOpen(nextOpen); onOpenChange?.(nextOpen); };
  return <DialogContext.Provider value={{ open: isOpen, setOpen }}>{children}</DialogContext.Provider>;
}

function useDialog() {
  const context = useContext(DialogContext);
  if (!context) throw new Error("Dialog parts must be used inside Dialog.Root.");
  return context;
}

export interface DialogTriggerProps extends Omit<ButtonProps, "onPress"> { onPress?: ButtonProps["onPress"]; }

export function DialogTrigger({ onPress, ...props }: DialogTriggerProps) {
  const { setOpen } = useDialog();
  return <Button {...props} onPress={(event) => { onPress?.(event); setOpen(true); }} />;
}

export interface DialogContentProps { children: ReactNode; style?: StyleProp<ViewStyle>; }

export function DialogContent({ children, style }: DialogContentProps) {
  const { open, setOpen } = useDialog();
  const { colors } = useArcSynTheme();
  return <Modal transparent visible={open} animationType="fade" onRequestClose={() => setOpen(false)}><View style={styles.overlay}><Pressable accessibilityLabel="Fechar diálogo" style={StyleSheet.absoluteFill} onPress={() => setOpen(false)} /><View accessibilityViewIsModal style={[styles.content, { backgroundColor: colors.surfaceRaised, borderColor: colors.borderStrong }, style]}>{children}</View></View></Modal>;
}

export type DialogHeaderProps = ViewProps;

export const DialogHeader = forwardRef<View, DialogHeaderProps>(function DialogHeader({ style, ...props }, ref) {
  return <View ref={ref} style={[styles.header, style]} {...props} />;
});

export interface DialogTitleProps { children: ReactNode; style?: StyleProp<TextStyle>; }

export function DialogTitle({ children, style }: DialogTitleProps) {
  const { colors } = useArcSynTheme();
  return <Text accessibilityRole="header" style={[styles.title, { color: colors.foreground, fontFamily: tokens.fontFamily.sansSemibold }, style]}>{children}</Text>;
}

export interface DialogDescriptionProps { children: ReactNode; style?: StyleProp<TextStyle>; }

export function DialogDescription({ children, style }: DialogDescriptionProps) {
  const { colors } = useArcSynTheme();
  return <Text style={[styles.description, { color: colors.mutedForeground, fontFamily: tokens.fontFamily.sans }, style]}>{children}</Text>;
}

export type DialogFooterProps = ViewProps;

export const DialogFooter = forwardRef<View, DialogFooterProps>(function DialogFooter({ style, ...props }, ref) {
  return <View ref={ref} style={[styles.footer, style]} {...props} />;
});

export interface DialogCloseProps extends Omit<ButtonProps, "onPress"> { onPress?: ButtonProps["onPress"]; variant?: ButtonVariant; size?: ButtonSize; }

export function DialogClose({ onPress, ...props }: DialogCloseProps) {
  const { setOpen } = useDialog();
  return <Button {...props} onPress={(event) => { onPress?.(event); setOpen(false); }} />;
}

export const Dialog = { Root: DialogRoot, Trigger: DialogTrigger, Content: DialogContent, Header: DialogHeader, Title: DialogTitle, Description: DialogDescription, Footer: DialogFooter, Close: DialogClose };

const styles = StyleSheet.create({
  overlay: { alignItems: "center", backgroundColor: "rgb(8, 9, 16)", flex: 1, justifyContent: "center", padding: tokens.spacing[4] },
  content: { borderRadius: tokens.radius.lg, borderWidth: 1, gap: tokens.spacing[5], maxWidth: 512, padding: tokens.spacing[5], width: "100%" },
  header: { gap: tokens.spacing[2] },
  title: { fontSize: tokens.fontSize.lg, lineHeight: 23 },
  description: { fontSize: tokens.fontSize.sm, lineHeight: 21 },
  footer: { alignItems: "center", flexDirection: "row", flexWrap: "wrap", gap: tokens.spacing[2], justifyContent: "flex-end" },
});
