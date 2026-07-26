import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  type PressableProps,
  type ScrollViewProps,
  type StyleProp,
  type TextInputProps,
  type TextProps,
  type TextStyle,
  type ViewProps,
  type ViewStyle,
} from "react-native";
import { SearchIcon } from "../icons/index.js";
import { tokens, useArcSynTheme } from "../theme.js";
import { Spinner } from "./spinner.js";

interface CommandItemRecord { id: string; visible: boolean; }
interface CommandContextValue {
  close?: () => void;
  items: Map<string, CommandItemRecord>;
  query: string;
  registerItem: (item: CommandItemRecord) => () => void;
  setQuery: (value: string) => void;
  version: number;
}

const CommandContext = createContext<CommandContextValue | null>(null);

function useCommandContext(part: string) {
  const context = useContext(CommandContext);
  if (!context) throw new Error(`Command.${part} must be used inside Command.Root or Command.Dialog.`);
  return context;
}

function normalize(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase().trim();
}

function textFromChildren(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(textFromChildren).join(" ");
  return "";
}

export interface CommandRootProps extends ViewProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  close?: () => void;
}

export const CommandRoot = forwardRef<View, CommandRootProps>(function CommandRoot(
  { value, defaultValue = "", onValueChange, close, style, ...props },
  ref,
) {
  const { colors } = useArcSynTheme();
  const [internalQuery, setInternalQuery] = useState(defaultValue);
  const [version, setVersion] = useState(0);
  const items = useRef(new Map<string, CommandItemRecord>()).current;
  const query = value ?? internalQuery;
  const setQuery = useCallback((nextValue: string) => {
    if (value === undefined) setInternalQuery(nextValue);
    onValueChange?.(nextValue);
  }, [onValueChange, value]);
  const registerItem = useCallback((item: CommandItemRecord) => {
    items.set(item.id, item);
    setVersion((current) => current + 1);
    return () => {
      items.delete(item.id);
      setVersion((current) => current + 1);
    };
  }, [items]);
  const context = useMemo(() => ({ close, items, query, registerItem, setQuery, version }), [close, items, query, registerItem, setQuery, version]);
  return <CommandContext.Provider value={context}><View ref={ref} style={[styles.root, { backgroundColor: colors.surfaceRaised }, style]} {...props} /></CommandContext.Provider>;
});

export interface CommandInputProps extends Omit<TextInputProps, "defaultValue" | "onChangeText" | "value"> {
  onValueChange?: (value: string) => void;
}

export const CommandInput = forwardRef<TextInput, CommandInputProps>(function CommandInput(
  { placeholder = "Buscar comando...", placeholderTextColor, onValueChange, style, ...props },
  ref,
) {
  const { colors } = useArcSynTheme();
  const context = useCommandContext("Input");
  return (
    <View style={[styles.inputWrapper, { borderBottomColor: colors.border }]}>
      <SearchIcon accessible={false} color={colors.mutedForeground} size={17} />
      <TextInput
        ref={ref}
        accessibilityRole="search"
        autoFocus
        value={context.query}
        onChangeText={(nextValue) => { context.setQuery(nextValue); onValueChange?.(nextValue); }}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor ?? colors.mutedForeground}
        style={[styles.input, { color: colors.foreground, fontFamily: tokens.fontFamily.sans }, style]}
        {...props}
      />
    </View>
  );
});

export type CommandListProps = ScrollViewProps;

export const CommandList = forwardRef<ScrollView, CommandListProps>(function CommandList({ style, ...props }, ref) {
  return <ScrollView ref={ref} accessibilityRole="menu" keyboardShouldPersistTaps="handled" style={[styles.list, style]} contentContainerStyle={[styles.listContent, props.contentContainerStyle]} {...props} />;
});

export interface CommandGroupProps extends ViewProps { heading?: ReactNode; headingStyle?: StyleProp<TextStyle>; }

export const CommandGroup = forwardRef<View, CommandGroupProps>(function CommandGroup({ heading, headingStyle, style, children, ...props }, ref) {
  const { colors } = useArcSynTheme();
  return <View ref={ref} style={style} {...props}>{heading ? <Text style={[styles.groupHeading, { color: colors.mutedForeground, fontFamily: tokens.fontFamily.sansSemibold }, headingStyle]}>{heading}</Text> : null}{children}</View>;
});

export interface CommandItemProps extends Omit<PressableProps, "onPress"> {
  value: string;
  keywords?: readonly string[];
  disabled?: boolean;
  onSelect?: (value: string) => void;
}

let itemSequence = 0;

export const CommandItem = forwardRef<View, CommandItemProps>(function CommandItem(
  { value, keywords = [], disabled = false, onSelect, style, children, ...props },
  ref,
) {
  const { colors } = useArcSynTheme();
  const context = useCommandContext("Item");
  const id = useRef(`command-item-${++itemSequence}`).current;
  const childText = typeof children === "function" ? "" : textFromChildren(children);
  const visible = !normalize(context.query) || normalize([value, childText, ...keywords].join(" ")).includes(normalize(context.query));
  const registerItem = context.registerItem;
  useEffect(() => registerItem({ id, visible }), [id, registerItem, visible]);
  if (!visible) return null;
  return (
    <Pressable
      ref={ref}
      accessibilityRole="menuitem"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={() => { onSelect?.(value); context.close?.(); }}
      style={(state) => [
        styles.item,
        { backgroundColor: state.pressed ? colors.muted : "transparent", opacity: disabled ? 0.45 : 1 },
        typeof style === "function" ? style(state) : style,
      ]}
      {...props}
    >
      {typeof children === "string" || typeof children === "number"
        ? <Text style={[styles.itemText, { color: colors.foreground, fontFamily: tokens.fontFamily.sans }]}>{children}</Text>
        : children}
    </Pressable>
  );
});

export type CommandSeparatorProps = ViewProps;
export const CommandSeparator = forwardRef<View, CommandSeparatorProps>(function CommandSeparator({ style, ...props }, ref) {
  const { colors } = useArcSynTheme();
  return <View ref={ref} accessibilityRole="none" style={[styles.separator, { backgroundColor: colors.border }, style]} {...props} />;
});

export type CommandEmptyProps = TextProps;
export const CommandEmpty = forwardRef<Text, CommandEmptyProps>(function CommandEmpty({ style, ...props }, ref) {
  const { colors } = useArcSynTheme();
  const context = useCommandContext("Empty");
  if (Array.from(context.items.values()).some((item) => item.visible)) return null;
  return <Text ref={ref} accessibilityLiveRegion="polite" style={[styles.feedback, { color: colors.mutedForeground, fontFamily: tokens.fontFamily.sans }, style]} {...props} />;
});

export interface CommandLoadingProps extends ViewProps { label?: string; }
export const CommandLoading = forwardRef<View, CommandLoadingProps>(function CommandLoading({ label = "Carregando comandos", style, children, ...props }, ref) {
  const { colors } = useArcSynTheme();
  return <View ref={ref} accessibilityLiveRegion="polite" style={[styles.loading, style]} {...props}><Spinner size="sm" label={label} />{children ? <Text style={[styles.itemText, { color: colors.mutedForeground, fontFamily: tokens.fontFamily.sans }]}>{children}</Text> : null}</View>;
});

export type CommandShortcutProps = TextProps;
export const CommandShortcut = forwardRef<Text, CommandShortcutProps>(function CommandShortcut({ style, ...props }, ref) {
  const { colors } = useArcSynTheme();
  return <Text ref={ref} accessible={false} style={[styles.shortcut, { color: colors.mutedForeground, fontFamily: tokens.fontFamily.mono }, style]} {...props} />;
});

export interface CommandDialogProps {
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  description?: string;
  commandProps?: Omit<CommandRootProps, "children" | "close">;
  style?: StyleProp<ViewStyle>;
}

export function CommandDialog({
  children,
  open,
  defaultOpen = false,
  onOpenChange,
  title = "Paleta de comandos",
  description = "Busque e execute uma ação.",
  commandProps,
  style,
}: CommandDialogProps) {
  const { colors } = useArcSynTheme();
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = open ?? internalOpen;
  const setOpen = (nextOpen: boolean) => {
    if (open === undefined) setInternalOpen(nextOpen);
    onOpenChange?.(nextOpen);
  };
  return (
    <Modal transparent visible={isOpen} animationType="fade" onRequestClose={() => setOpen(false)}>
      <View style={styles.overlay}>
        <Pressable accessibilityLabel="Fechar paleta de comandos" style={StyleSheet.absoluteFill} onPress={() => setOpen(false)} />
        <View accessibilityViewIsModal accessibilityLabel={`${title}. ${description}`} style={[styles.dialog, { borderColor: colors.borderStrong }, style]}>
          <CommandRoot {...commandProps} close={() => setOpen(false)}>{children}</CommandRoot>
        </View>
      </View>
    </Modal>
  );
}

export const Command = {
  Root: CommandRoot,
  Input: CommandInput,
  List: CommandList,
  Group: CommandGroup,
  Item: CommandItem,
  Separator: CommandSeparator,
  Empty: CommandEmpty,
  Loading: CommandLoading,
  Shortcut: CommandShortcut,
  Dialog: CommandDialog,
};

const styles = StyleSheet.create({
  root: { overflow: "hidden", width: "100%" },
  inputWrapper: { alignItems: "center", borderBottomWidth: 1, flexDirection: "row", gap: tokens.spacing[3], minHeight: 48, paddingHorizontal: tokens.spacing[4] },
  input: { flex: 1, fontSize: tokens.fontSize.sm, minHeight: 48, padding: 0 },
  list: { maxHeight: 352 },
  listContent: { padding: tokens.spacing[2] },
  groupHeading: { fontSize: tokens.fontSize.xs, letterSpacing: 0.4, paddingHorizontal: tokens.spacing[2], paddingBottom: tokens.spacing[1], paddingTop: tokens.spacing[3], textTransform: "uppercase" },
  item: { alignItems: "center", borderRadius: tokens.radius.sm, flexDirection: "row", gap: tokens.spacing[3], minHeight: 44, padding: tokens.spacing[2] },
  itemText: { fontSize: tokens.fontSize.sm },
  separator: { height: 1, marginVertical: tokens.spacing[1] },
  feedback: { fontSize: tokens.fontSize.sm, minHeight: 80, padding: tokens.spacing[4], textAlign: "center", textAlignVertical: "center" },
  loading: { alignItems: "center", flexDirection: "row", gap: tokens.spacing[2], justifyContent: "center", minHeight: 80, padding: tokens.spacing[4] },
  shortcut: { fontSize: tokens.fontSize.xs, marginLeft: "auto" },
  overlay: { alignItems: "center", backgroundColor: "rgba(8, 9, 16, 0.72)", flex: 1, justifyContent: "flex-start", paddingHorizontal: tokens.spacing[4], paddingTop: 64 },
  dialog: { borderRadius: tokens.radius.lg, borderWidth: 1, maxWidth: 608, overflow: "hidden", width: "100%" },
});
