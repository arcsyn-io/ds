import { useState, type ReactNode } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text, View, type StyleProp, type ViewStyle } from "react-native";
import { tokens, useArcSynTheme } from "../theme.js";

export type ContextMenuItemVariant = "default" | "danger";

export interface ContextMenuItem {
  id: string;
  label: string;
  group?: string;
  disabled?: boolean;
  selected?: boolean;
  variant?: ContextMenuItemVariant;
}

export interface ContextMenuProps {
  children: ReactNode;
  items: ContextMenuItem[];
  onItemSelect?: (item: ContextMenuItem) => void;
  disabled?: boolean;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

export function ContextMenu({ children, items, onItemSelect, disabled = false, accessibilityLabel, style }: ContextMenuProps) {
  const [open, setOpen] = useState(false);
  const { colors } = useArcSynTheme();
  let lastGroup: string | undefined;

  return (
    <>
      <Pressable
        accessibilityLabel={accessibilityLabel}
        disabled={disabled}
        delayLongPress={350}
        onLongPress={() => setOpen(true)}
        style={style}
      >
        {children}
      </Pressable>
      <Modal
        animationType="fade"
        hardwareAccelerated
        navigationBarTranslucent
        onRequestClose={() => setOpen(false)}
        presentationStyle="overFullScreen"
        statusBarTranslucent
        transparent
        visible={open}
      >
        <View style={styles.overlay}>
          <Pressable
            accessibilityLabel="Fechar menu contextual"
            style={styles.dismissArea}
            onPress={() => setOpen(false)}
          />
          <View
            accessibilityRole="menu"
            accessibilityViewIsModal
            style={[styles.sheet, { backgroundColor: colors.surfaceRaised, borderColor: colors.borderStrong }]}
          >
            <ScrollView contentContainerStyle={styles.list} keyboardShouldPersistTaps="handled">
              {items.map((item) => {
                const group = item.group !== lastGroup ? item.group : undefined;
                lastGroup = item.group;

                return (
                  <View key={item.id}>
                    {group ? (
                      <Text style={[styles.group, { color: colors.mutedForeground, fontFamily: tokens.fontFamily.sansSemibold }]}>
                        {group}
                      </Text>
                    ) : null}
                    <Pressable
                      accessibilityRole="menuitem"
                      accessibilityState={{ disabled: item.disabled, selected: item.selected }}
                      disabled={item.disabled}
                      onPress={() => {
                        onItemSelect?.(item);
                        setOpen(false);
                      }}
                      style={({ pressed }) => [
                        styles.item,
                        (pressed || item.selected) && { backgroundColor: colors.surfaceSunken },
                        item.disabled && styles.disabled,
                      ]}
                    >
                      <Text
                        style={[
                          styles.itemText,
                          { color: item.variant === "danger" ? colors.danger : colors.foreground, fontFamily: tokens.fontFamily.sans },
                        ]}
                      >
                        {item.label}
                      </Text>
                      {item.selected ? <Text style={{ color: colors.primary }}>✓</Text> : null}
                    </Pressable>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "rgba(8, 9, 16, 0.42)",
    flex: 1,
    justifyContent: "flex-end",
    paddingTop: tokens.spacing[8],
  },
  dismissArea: {
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
  },
  sheet: {
    borderTopLeftRadius: tokens.radius.lg,
    borderTopRightRadius: tokens.radius.lg,
    borderWidth: 1,
    elevation: 12,
    maxHeight: "60%",
    paddingBottom: tokens.spacing[4],
  },
  list: {
    padding: tokens.spacing[2],
  },
  group: {
    fontSize: tokens.fontSize.xs,
    paddingBottom: tokens.spacing[1],
    paddingHorizontal: tokens.spacing[2],
    paddingTop: tokens.spacing[3],
  },
  item: {
    alignItems: "center",
    borderRadius: tokens.radius.sm,
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: 44,
    paddingHorizontal: tokens.spacing[2],
  },
  itemText: {
    fontSize: tokens.fontSize.sm,
  },
  disabled: {
    opacity: 0.45,
  },
});
