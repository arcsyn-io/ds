import { useState, type ReactNode } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { BellIcon, XIcon } from "../icons/index.js";
import { tokens, useArcSynTheme } from "../theme.js";
import { Button } from "./button.js";
import { Skeleton } from "./skeleton.js";
import { StatusIndicator, type StatusIndicatorStatus } from "./status-indicator.js";

export type NotificationTone = "neutral" | "info" | "success" | "warning" | "danger";

export interface NotificationCenterItem {
  id: string;
  title: ReactNode;
  description?: ReactNode;
  timestamp?: ReactNode;
  actor?: ReactNode;
  icon?: ReactNode;
  unread?: boolean;
  tone?: NotificationTone;
  accessibilityLabel?: string;
  onSelect?: () => void;
}

export interface NotificationCenterProps {
  items: readonly NotificationCenterItem[];
  maxVisible?: number;
  unreadCount?: number;
  loading?: boolean;
  empty?: ReactNode;
  title?: string;
  description?: string;
  triggerLabel?: string;
  seeAllLabel?: string;
  closeLabel?: string;
  open?: boolean;
  defaultOpen?: boolean;
  disabled?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSeeAll?: () => void;
  style?: StyleProp<ViewStyle>;
}

const toneStatus: Record<NotificationTone, StatusIndicatorStatus> = {
  neutral: "neutral",
  info: "info",
  success: "success",
  warning: "warning",
  danger: "danger",
};

function renderNode(node: ReactNode, color: string, textStyle: object) {
  return typeof node === "string" || typeof node === "number"
    ? <Text style={[textStyle, { color }]}>{node}</Text>
    : node;
}

export function NotificationCenter({
  items,
  maxVisible = 5,
  unreadCount,
  loading = false,
  empty = "Nenhuma notificação recente.",
  title = "Notificações",
  description,
  triggerLabel = "Abrir notificações",
  seeAllLabel = "Ver todas",
  closeLabel = "Fechar notificações",
  open,
  defaultOpen = false,
  disabled = false,
  onOpenChange,
  onSeeAll,
  style,
}: NotificationCenterProps) {
  const { colors } = useArcSynTheme();
  const [localOpen, setLocalOpen] = useState(defaultOpen);
  const isOpen = open ?? localOpen;
  const visibleItems = items.slice(0, Math.max(0, maxVisible));
  const resolvedUnreadCount = unreadCount ?? items.filter((item) => item.unread).length;
  const accessibleTriggerLabel = resolvedUnreadCount ? `${triggerLabel}, ${resolvedUnreadCount} não lidas` : triggerLabel;

  function setOpen(next: boolean) {
    if (open === undefined) setLocalOpen(next);
    onOpenChange?.(next);
  }

  return (
    <>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={accessibleTriggerLabel}
        accessibilityState={{ disabled, expanded: isOpen }}
        disabled={disabled}
        onPress={() => setOpen(true)}
        style={({ pressed }) => [styles.trigger, { borderColor: colors.border }, pressed && styles.pressed, style]}
      >
        <BellIcon accessible={false} color={colors.foreground} size={19} />
        {resolvedUnreadCount > 0 ? (
          <View style={[styles.count, { backgroundColor: colors.danger, borderColor: colors.surfaceRaised }]}>
            <Text style={[styles.countText, { color: colors.dangerForeground }]}>{resolvedUnreadCount > 99 ? "99+" : resolvedUnreadCount}</Text>
          </View>
        ) : null}
      </Pressable>
      <Modal visible={isOpen} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
          <Pressable
            accessibilityViewIsModal
            onPress={(event) => event.stopPropagation()}
            style={[styles.popup, { backgroundColor: colors.surfaceRaised, borderColor: colors.borderStrong }]}
          >
            <View style={[styles.header, { borderBottomColor: colors.border }]}>
              <View style={styles.heading}>
                <Text accessibilityRole="header" style={[styles.title, { color: colors.foreground }]}>{title}</Text>
                {description ? <Text style={[styles.description, { color: colors.mutedForeground }]}>{description}</Text> : null}
              </View>
              <View style={styles.headerActions}>
                {resolvedUnreadCount > 0 ? <Text style={[styles.summary, { color: colors.mutedForeground }]}>{resolvedUnreadCount} não lidas</Text> : null}
                <Pressable accessibilityRole="button" accessibilityLabel={closeLabel} hitSlop={6} onPress={() => setOpen(false)} style={styles.close}>
                  <XIcon accessible={false} color={colors.foreground} size={18} />
                </Pressable>
              </View>
            </View>
            <ScrollView contentContainerStyle={styles.list}>
              {loading
                ? Array.from({ length: Math.min(maxVisible, 5) }, (_, index) => (
                    <View key={index} style={[styles.skeleton, index > 0 && { borderTopColor: colors.border, borderTopWidth: 1 }]}>
                      <Skeleton variant="circular" height={32} width={32} />
                      <View style={styles.skeletonBody}><Skeleton height={12} width="58%" /><Skeleton height={12} width="88%" /></View>
                    </View>
                  ))
                : visibleItems.length
                  ? visibleItems.map((item, index) => {
                      const isInteractive = Boolean(item.onSelect);
                      const content = (
                        <>
                          <View style={[styles.marker, { backgroundColor: colors.surfaceSunken, borderColor: colors.border }]}>
                            {item.actor ?? item.icon ?? <StatusIndicator status={toneStatus[item.tone ?? "neutral"]} iconOnly accessibleLabel={`Notificação ${item.tone ?? "neutral"}`} />}
                          </View>
                          <View style={styles.itemBody}>
                            {renderNode(item.title, colors.foreground, styles.itemTitle)}
                            {item.description ? renderNode(item.description, colors.mutedForeground, styles.itemDescription) : null}
                            {item.timestamp ? renderNode(item.timestamp, colors.mutedForeground, styles.itemTime) : null}
                          </View>
                          {item.unread ? <View accessible={false} style={[styles.unread, { backgroundColor: colors.primary }]} /> : null}
                        </>
                      );
                      return (
                        <Pressable
                          key={item.id}
                          accessible
                          accessibilityRole={isInteractive ? "button" : undefined}
                          accessibilityLabel={item.accessibilityLabel}
                          disabled={!isInteractive}
                          onPress={() => { item.onSelect?.(); setOpen(false); }}
                          style={({ pressed }) => [
                            styles.item,
                            index > 0 && { borderTopColor: colors.border, borderTopWidth: 1 },
                            item.unread && { backgroundColor: colors.accent },
                            pressed && styles.pressed,
                          ]}
                        >
                          {content}
                        </Pressable>
                      );
                    })
                  : <View style={styles.empty}>{renderNode(empty, colors.mutedForeground, styles.emptyText)}</View>}
            </ScrollView>
            <View style={[styles.footer, { borderTopColor: colors.border }]}>
              <Button
                variant="ghost"
                size="md"
                onPress={() => {
                  onSeeAll?.();
                  setOpen(false);
                }}
                style={styles.seeAll}
              >
                {seeAllLabel}
              </Button>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: { alignItems: "center", borderRadius: tokens.radius.md, borderWidth: 1, height: 44, justifyContent: "center", position: "relative", width: 44 },
  pressed: { opacity: .82 },
  count: { alignItems: "center", borderRadius: tokens.radius.full, borderWidth: 2, justifyContent: "center", minHeight: 17, minWidth: 17, paddingHorizontal: 3, position: "absolute", right: -2, top: -2 },
  countText: { fontFamily: tokens.fontFamily.monoMedium, fontSize: 9, lineHeight: 12 },
  backdrop: { alignItems: "center", backgroundColor: "rgba(8, 9, 16, 0.72)", flex: 1, justifyContent: "center", padding: tokens.spacing[4] },
  popup: { borderRadius: tokens.radius.md, borderWidth: 1, maxHeight: "80%", maxWidth: 400, overflow: "hidden", width: "100%" },
  header: { alignItems: "flex-start", borderBottomWidth: 1, flexDirection: "row", gap: tokens.spacing[3], justifyContent: "space-between", padding: tokens.spacing[4] },
  heading: { flex: 1, gap: tokens.spacing[1] },
  title: { fontFamily: tokens.fontFamily.sansSemibold, fontSize: tokens.fontSize.md },
  description: { fontFamily: tokens.fontFamily.sans, fontSize: tokens.fontSize.xs },
  headerActions: { alignItems: "center", flexDirection: "row", gap: tokens.spacing[2] },
  summary: { fontFamily: tokens.fontFamily.mono, fontSize: tokens.fontSize.xs },
  close: { alignItems: "center", height: 44, justifyContent: "center", margin: -10, width: 44 },
  list: { flexGrow: 1 },
  item: { alignItems: "flex-start", flexDirection: "row", gap: tokens.spacing[3], minHeight: 76, padding: tokens.spacing[3] },
  marker: { alignItems: "center", borderRadius: tokens.radius.sm, borderWidth: 1, height: 32, justifyContent: "center", overflow: "hidden", width: 32 },
  itemBody: { flex: 1, gap: 3 },
  itemTitle: { fontFamily: tokens.fontFamily.sansSemibold, fontSize: tokens.fontSize.sm, lineHeight: 19 },
  itemDescription: { fontFamily: tokens.fontFamily.sans, fontSize: tokens.fontSize.xs, lineHeight: 18 },
  itemTime: { fontFamily: tokens.fontFamily.mono, fontSize: tokens.fontSize.xs },
  unread: { borderRadius: tokens.radius.full, height: 8, marginTop: 4, width: 8 },
  skeleton: { alignItems: "center", flexDirection: "row", gap: tokens.spacing[3], minHeight: 76, padding: tokens.spacing[3] },
  skeletonBody: { flex: 1, gap: tokens.spacing[2] },
  empty: { alignItems: "center", minHeight: 144, justifyContent: "center", padding: tokens.spacing[6] },
  emptyText: { fontFamily: tokens.fontFamily.sans, fontSize: tokens.fontSize.sm, textAlign: "center" },
  footer: { borderTopWidth: 1, padding: tokens.spacing[2] },
  seeAll: { width: "100%" },
});
