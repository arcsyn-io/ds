import { useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text, View, type StyleProp, type ViewStyle } from "react-native";
import { CheckIcon, ChevronDownIcon } from "../icons/index.js";
import { tokens, useArcSynTheme } from "../theme.js";

export type DropdownMenuItemVariant = "default" | "danger";

export interface DropdownMenuItem {
  id: string;
  label: string;
  group?: string;
  disabled?: boolean;
  selected?: boolean;
  variant?: DropdownMenuItemVariant;
}

export interface DropdownMenuProps {
  triggerLabel: string;
  items: DropdownMenuItem[];
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onItemSelect?: (item: DropdownMenuItem) => void;
  closeOnSelect?: boolean;
  disabled?: boolean;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

export function DropdownMenu({
  triggerLabel,
  items,
  open,
  defaultOpen = false,
  onOpenChange,
  onItemSelect,
  closeOnSelect = true,
  disabled = false,
  accessibilityLabel,
  style,
}: DropdownMenuProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isOpen = open ?? uncontrolledOpen;
  const { colors } = useArcSynTheme();

  function setOpen(next: boolean) {
    if (open === undefined) setUncontrolledOpen(next);
    onOpenChange?.(next);
  }

  function select(item: DropdownMenuItem) {
    onItemSelect?.(item);
    if (closeOnSelect) setOpen(false);
  }

  let lastGroup: string | undefined;

  return (
    <>
      <Pressable
        accessibilityLabel={accessibilityLabel ?? triggerLabel}
        accessibilityRole="button"
        accessibilityState={{ disabled, expanded: isOpen }}
        disabled={disabled}
        onPress={() => setOpen(true)}
        style={({ pressed }) => [
          styles.trigger,
          { backgroundColor: colors.surface, borderColor: colors.border },
          pressed && !disabled && styles.pressed,
          disabled && styles.disabled,
          style,
        ]}
      >
        <Text style={[styles.triggerText, { color: colors.foreground, fontFamily: tokens.fontFamily.sansSemibold }]}>{triggerLabel}</Text>
        <ChevronDownIcon accessible={false} color={colors.mutedForeground} size={16} />
      </Pressable>
      <Modal visible={isOpen} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
          <Pressable
            accessibilityRole="menu"
            style={[styles.sheet, { backgroundColor: colors.surfaceRaised, borderColor: colors.borderStrong }]}
            onPress={(event) => event.stopPropagation()}
          >
            <ScrollView>
              {items.map((item) => {
                const group = item.group !== lastGroup ? item.group : undefined;
                lastGroup = item.group;
                return (
                  <View key={item.id}>
                    {group ? <Text style={[styles.group, { color: colors.mutedForeground, fontFamily: tokens.fontFamily.sansSemibold }]}>{group}</Text> : null}
                    <Pressable
                      accessibilityRole="menuitem"
                      accessibilityState={{ disabled: item.disabled, selected: item.selected }}
                      disabled={item.disabled}
                      onPress={() => select(item)}
                      style={({ pressed }) => [
                        styles.item,
                        (pressed || item.selected) && { backgroundColor: colors.surfaceSunken },
                        item.disabled && styles.disabled,
                      ]}
                    >
                      <Text style={[styles.itemText, { color: item.variant === "danger" ? colors.danger : colors.foreground, fontFamily: tokens.fontFamily.sans }]}>{item.label}</Text>
                      {item.selected ? <CheckIcon accessible={false} color={colors.primary} size={16} /> : null}
                    </Pressable>
                  </View>
                );
              })}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: { alignItems: "center", borderRadius: tokens.radius.md, borderWidth: 1, flexDirection: "row", gap: tokens.spacing[2], justifyContent: "center", minHeight: 44, paddingHorizontal: tokens.spacing[3] },
  triggerText: { fontSize: tokens.fontSize.sm },
  pressed: { opacity: 0.82 },
  disabled: { opacity: 0.45 },
  backdrop: { backgroundColor: "rgba(8, 9, 16, 0.72)", flex: 1, justifyContent: "flex-end" },
  sheet: { borderTopLeftRadius: tokens.radius.lg, borderTopRightRadius: tokens.radius.lg, borderWidth: 1, maxHeight: "60%", padding: tokens.spacing[2] },
  group: { fontSize: tokens.fontSize.xs, paddingHorizontal: tokens.spacing[2], paddingBottom: tokens.spacing[1], paddingTop: tokens.spacing[3] },
  item: { alignItems: "center", borderRadius: tokens.radius.sm, flexDirection: "row", gap: tokens.spacing[2], justifyContent: "space-between", minHeight: 44, paddingHorizontal: tokens.spacing[2] },
  itemText: { fontSize: tokens.fontSize.sm },
});
