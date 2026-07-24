import { useState, type ReactNode } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
  type ViewProps,
} from "react-native";
import { tokens, useArcSynTheme } from "../theme.js";
import { Button } from "./button.js";
import { Skeleton } from "./skeleton.js";

export type ChatMessageDirection = "incoming" | "outgoing";
export type ChatMessageStatus = "sending" | "sent" | "delivered" | "read" | "error";

export interface ChatMessage {
  id: string;
  direction?: ChatMessageDirection;
  author?: string;
  avatar?: ReactNode;
  content: ReactNode;
  timestamp?: string;
  status?: ChatMessageStatus;
  grouped?: boolean;
  accessibilityLabel?: string;
}

export interface ChatProps extends ViewProps {
  messages: readonly ChatMessage[];
  header?: ReactNode;
  empty?: ReactNode;
  loading?: boolean;
  loadingCount?: number;
  typingLabel?: string;
  density?: "compact" | "default";
  composer?: ReactNode;
}

const statusLabels: Record<ChatMessageStatus, string> = {
  sending: "Enviando",
  sent: "Enviada",
  delivered: "Entregue",
  read: "Lida",
  error: "Falha no envio",
};

function renderMessageContent(content: ReactNode, color: string) {
  return typeof content === "string" || typeof content === "number"
    ? <Text style={[styles.messageText, { color }]}>{content}</Text>
    : content;
}

export function Chat({
  messages,
  header,
  empty,
  loading = false,
  loadingCount = 3,
  typingLabel,
  density = "default",
  composer,
  style,
  ...props
}: ChatProps) {
  const { colors } = useArcSynTheme();
  return (
    <View style={[styles.root, { backgroundColor: colors.surfaceRaised, borderColor: colors.border }, style]} {...props}>
      {header ? <View style={[styles.header, { borderBottomColor: colors.border }]}>{header}</View> : null}
      <ScrollView
        accessibilityLabel="Mensagens da conversa"
        accessibilityState={{ busy: loading }}
        contentContainerStyle={[styles.messages, density === "compact" && styles.messagesCompact, { backgroundColor: colors.surfaceSunken }]}
      >
        {loading
          ? Array.from({ length: loadingCount }, (_, index) => (
              <View key={index} style={[styles.skeleton, index % 2 === 1 && styles.outgoing]}>
                <Skeleton variant="circular" height={32} width={32} />
                <View style={styles.skeletonBody}><Skeleton height={12} width="32%" /><Skeleton height={52} width="76%" /></View>
              </View>
            ))
          : messages.length
            ? messages.map((message) => {
                const direction = message.direction ?? "incoming";
                const outgoing = direction === "outgoing";
                const textColor = outgoing ? colors.accentForeground : colors.foreground;
                return (
                  <View
                    key={message.id}
                    accessible
                    accessibilityLabel={message.accessibilityLabel ?? [message.author, typeof message.content === "string" ? message.content : undefined, message.timestamp, message.status ? statusLabels[message.status] : undefined].filter(Boolean).join(". ")}
                    style={[styles.message, outgoing && styles.outgoing, message.grouped && styles.grouped]}
                  >
                    {!message.grouped ? <View style={styles.avatar}>{message.avatar}</View> : null}
                    <View style={[styles.messageContent, outgoing && styles.messageContentOutgoing]}>
                      {!message.grouped && message.author ? <Text style={[styles.author, { color: colors.mutedForeground }]}>{message.author}</Text> : null}
                      <View style={[styles.bubble, { backgroundColor: outgoing ? colors.accent : colors.surfaceRaised, borderColor: outgoing ? colors.accentBorder : colors.borderStrong }]}>
                        {renderMessageContent(message.content, textColor)}
                      </View>
                      {message.timestamp || message.status ? (
                        <View style={styles.meta}>
                          {message.timestamp ? <Text style={[styles.metaText, { color: colors.mutedForeground }]}>{message.timestamp}</Text> : null}
                          {message.status ? <Text style={[styles.metaText, { color: message.status === "error" ? colors.danger : message.status === "read" ? colors.primary : colors.mutedForeground }]}>{statusLabels[message.status]}</Text> : null}
                        </View>
                      ) : null}
                    </View>
                  </View>
                );
              })
            : <View style={styles.empty}>{typeof empty === "string" ? <Text style={{ color: colors.mutedForeground }}>{empty}</Text> : empty}</View>}
        {typingLabel ? (
          <View accessibilityLiveRegion="polite" accessibilityLabel={typingLabel} style={styles.typing}>
            <View style={[styles.typingDots, { backgroundColor: colors.surfaceRaised, borderColor: colors.border }]}>
              <View style={[styles.dot, { backgroundColor: colors.mutedForeground }]} />
              <View style={[styles.dot, { backgroundColor: colors.mutedForeground }]} />
              <View style={[styles.dot, { backgroundColor: colors.mutedForeground }]} />
            </View>
            <Text style={[styles.typingText, { color: colors.mutedForeground }]}>{typingLabel}</Text>
          </View>
        ) : null}
      </ScrollView>
      {composer ? <View style={[styles.composerSlot, { borderTopColor: colors.border }]}>{composer}</View> : null}
    </View>
  );
}

export interface ChatComposerProps extends Omit<TextInputProps, "value" | "defaultValue" | "onChangeText" | "multiline"> {
  value?: string;
  defaultValue?: string;
  inputLabel?: string;
  submitLabel?: string;
  sending?: boolean;
  disabled?: boolean;
  maxLength?: number;
  actions?: ReactNode;
  onValueChange?: (value: string) => void;
  onSend?: (value: string) => void;
}

export function ChatComposer({
  value,
  defaultValue = "",
  placeholder = "Escreva uma mensagem",
  inputLabel = "Mensagem",
  submitLabel = "Enviar",
  sending = false,
  disabled = false,
  maxLength,
  actions,
  onValueChange,
  onSend,
  style,
  ...props
}: ChatComposerProps) {
  const { colors } = useArcSynTheme();
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = value ?? internalValue;
  const canSend = currentValue.trim().length > 0 && !disabled && !sending;

  function updateValue(nextValue: string) {
    if (value === undefined) setInternalValue(nextValue);
    onValueChange?.(nextValue);
  }

  function send() {
    if (!canSend) return;
    onSend?.(currentValue.trim());
    if (value === undefined) setInternalValue("");
  }

  return (
    <View style={styles.composer}>
      <View style={styles.inputWrap}>
        <TextInput
          accessibilityLabel={inputLabel}
          editable={!disabled && !sending}
          maxLength={maxLength}
          multiline
          placeholder={placeholder}
          placeholderTextColor={colors.mutedForeground}
          textAlignVertical="top"
          value={currentValue}
          onChangeText={updateValue}
          style={[styles.input, { backgroundColor: colors.surfaceSunken, borderColor: colors.borderStrong, color: colors.foreground }, style]}
          {...props}
        />
        {maxLength ? <Text style={[styles.counter, { color: colors.mutedForeground }]}>{currentValue.length}/{maxLength}</Text> : null}
      </View>
      <View style={styles.composerFooter}>
        <View style={styles.composerActions}>{actions}</View>
        <Button size="sm" loading={sending} disabled={!canSend && !sending} onPress={send}>{submitLabel}</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { borderRadius: tokens.radius.md, borderWidth: 1, minHeight: 448, overflow: "hidden" },
  header: { borderBottomWidth: 1, minHeight: 64, padding: tokens.spacing[4] },
  messages: { flexGrow: 1, gap: tokens.spacing[3], minHeight: 288, padding: tokens.spacing[4] },
  messagesCompact: { gap: tokens.spacing[2], padding: tokens.spacing[3] },
  message: { alignItems: "flex-end", flexDirection: "row", gap: tokens.spacing[2], maxWidth: "84%" },
  outgoing: { alignSelf: "flex-end", flexDirection: "row-reverse" },
  grouped: { marginLeft: 40 },
  avatar: { alignItems: "center", height: 32, justifyContent: "center", width: 32 },
  messageContent: { alignItems: "flex-start", flexShrink: 1, gap: tokens.spacing[1] },
  messageContentOutgoing: { alignItems: "flex-end" },
  author: { fontFamily: tokens.fontFamily.sansSemibold, fontSize: tokens.fontSize.xs, paddingHorizontal: tokens.spacing[1] },
  bubble: { borderRadius: tokens.radius.md, borderWidth: 1, paddingHorizontal: tokens.spacing[3], paddingVertical: tokens.spacing[2] },
  messageText: { fontFamily: tokens.fontFamily.sans, fontSize: tokens.fontSize.sm, lineHeight: 20 },
  meta: { flexDirection: "row", gap: tokens.spacing[2], paddingHorizontal: tokens.spacing[1] },
  metaText: { fontFamily: tokens.fontFamily.mono, fontSize: tokens.fontSize.xs },
  typing: { alignItems: "center", flexDirection: "row", gap: tokens.spacing[2], marginLeft: 40 },
  typingDots: { alignItems: "center", borderRadius: tokens.radius.full, borderWidth: 1, flexDirection: "row", gap: 3, minHeight: 28, paddingHorizontal: tokens.spacing[2] },
  dot: { borderRadius: tokens.radius.full, height: 4, width: 4 },
  typingText: { fontSize: tokens.fontSize.xs },
  empty: { alignItems: "center", flex: 1, justifyContent: "center", minHeight: 240 },
  skeleton: { alignItems: "flex-end", flexDirection: "row", gap: tokens.spacing[2], maxWidth: "78%" },
  skeletonBody: { flex: 1, gap: tokens.spacing[2] },
  composerSlot: { borderTopWidth: 1 },
  composer: { gap: tokens.spacing[2], padding: tokens.spacing[3] },
  inputWrap: { position: "relative" },
  input: { borderRadius: tokens.radius.md, borderWidth: 1, fontFamily: tokens.fontFamily.sans, fontSize: tokens.fontSize.sm, minHeight: 48, paddingHorizontal: tokens.spacing[3], paddingVertical: tokens.spacing[2] },
  counter: { bottom: tokens.spacing[2], fontFamily: tokens.fontFamily.mono, fontSize: tokens.fontSize.xs, position: "absolute", right: tokens.spacing[3] },
  composerFooter: { alignItems: "center", flexDirection: "row", justifyContent: "space-between" },
  composerActions: { alignItems: "center", flexDirection: "row", gap: tokens.spacing[1] },
});
