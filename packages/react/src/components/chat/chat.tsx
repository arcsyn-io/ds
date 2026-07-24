import {
  forwardRef,
  useState,
  type FormEvent,
  type FormHTMLAttributes,
  type HTMLAttributes,
  type KeyboardEvent,
  type OlHTMLAttributes,
  type ReactNode,
  type TextareaHTMLAttributes,
  type TimeHTMLAttributes,
} from "react";
import { cx } from "../../utilities/cx.js";
import { Avatar } from "../avatar/avatar.js";
import { Button } from "../button/button.js";
import { Skeleton } from "../skeleton/skeleton.js";

export type ChatMessageDirection = "incoming" | "outgoing";
export type ChatMessageStatus = "sending" | "sent" | "delivered" | "read" | "error";

export interface ChatRootProps extends HTMLAttributes<HTMLDivElement> {
  density?: "compact" | "default";
}

const ChatRoot = forwardRef<HTMLDivElement, ChatRootProps>(function ChatRoot(
  { className, density = "default", ...props },
  ref,
) {
  return <div ref={ref} className={cx("arcsyn-chat", className)} data-density={density} {...props} />;
});

function divPart(name: string) {
  return forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function ChatPart({ className, ...props }, ref) {
    return <div ref={ref} className={cx(`arcsyn-chat__${name}`, className)} {...props} />;
  });
}

export const ChatHeader = divPart("header");
export const ChatHeaderContent = divPart("header-content");
export const ChatActions = divPart("actions");

export const ChatTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(function ChatTitle({ className, ...props }, ref) {
  return <h3 ref={ref} className={cx("arcsyn-chat__title", className)} {...props} />;
});

export const ChatDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(function ChatDescription({ className, ...props }, ref) {
  return <p ref={ref} className={cx("arcsyn-chat__description", className)} {...props} />;
});

export interface ChatMessagesProps extends OlHTMLAttributes<HTMLOListElement> {
  loading?: boolean;
  loadingCount?: number;
  empty?: ReactNode;
  live?: "off" | "polite";
}

const ChatMessages = forwardRef<HTMLOListElement, ChatMessagesProps>(function ChatMessages(
  { className, loading = false, loadingCount = 3, empty, live = "polite", children, ...props },
  ref,
) {
  const hasContent = children !== undefined && children !== null;
  return (
    <ol
      ref={ref}
      className={cx("arcsyn-chat__messages", className)}
      role="log"
      aria-live={live}
      aria-relevant="additions text"
      aria-busy={loading || undefined}
      {...props}
    >
      {loading
        ? Array.from({ length: loadingCount }, (_, index) => (
            <li className="arcsyn-chat__skeleton" data-direction={index % 2 ? "outgoing" : "incoming"} key={index}>
              <Skeleton variant="circular" width="2rem" height="2rem" />
              <div><Skeleton width="5rem" height=".75rem" /><Skeleton width={index % 2 ? "62%" : "74%"} height="3.25rem" /></div>
            </li>
          ))
        : hasContent
          ? children
          : empty
            ? <li className="arcsyn-chat__empty">{empty}</li>
            : null}
    </ol>
  );
});

const messageStatusLabels: Record<ChatMessageStatus, string> = {
  sending: "Enviando",
  sent: "Enviada",
  delivered: "Entregue",
  read: "Lida",
  error: "Falha no envio",
};

export interface ChatMessageProps extends HTMLAttributes<HTMLLIElement> {
  direction?: ChatMessageDirection;
  author?: ReactNode;
  avatar?: ReactNode;
  timestamp?: ReactNode;
  dateTime?: string;
  status?: ChatMessageStatus;
  grouped?: boolean;
}

const ChatMessage = forwardRef<HTMLLIElement, ChatMessageProps>(function ChatMessage(
  { className, direction = "incoming", author, avatar, timestamp, dateTime, status, grouped = false, children, ...props },
  ref,
) {
  return (
    <li ref={ref} className={cx("arcsyn-chat__message", className)} data-direction={direction} data-grouped={grouped || undefined} {...props}>
      {!grouped ? <div className="arcsyn-chat__avatar">{avatar ?? (author ? <Avatar id={`chat-${String(author)}`} name={String(author)} /> : null)}</div> : null}
      <div className="arcsyn-chat__message-content">
        {!grouped && author ? <span className="arcsyn-chat__author">{author}</span> : null}
        <div className="arcsyn-chat__bubble">{children}</div>
        {timestamp || status ? (
          <div className="arcsyn-chat__meta">
            {timestamp ? <ChatTimestamp dateTime={dateTime}>{timestamp}</ChatTimestamp> : null}
            {status ? <span className="arcsyn-chat__status" data-status={status}>{messageStatusLabels[status]}</span> : null}
          </div>
        ) : null}
      </div>
    </li>
  );
});

export const ChatTimestamp = forwardRef<HTMLTimeElement, TimeHTMLAttributes<HTMLTimeElement>>(function ChatTimestamp({ className, ...props }, ref) {
  return <time ref={ref} className={cx("arcsyn-chat__timestamp", className)} {...props} />;
});

export const ChatSystemMessage = forwardRef<HTMLLIElement, HTMLAttributes<HTMLLIElement>>(function ChatSystemMessage({ className, ...props }, ref) {
  return <li ref={ref} className={cx("arcsyn-chat__system-message", className)} {...props} />;
});

export interface ChatTypingIndicatorProps extends HTMLAttributes<HTMLLIElement> {
  label?: string;
}

export const ChatTypingIndicator = forwardRef<HTMLLIElement, ChatTypingIndicatorProps>(function ChatTypingIndicator(
  { className, label = "Digitando", ...props },
  ref,
) {
  return (
    <li ref={ref} className={cx("arcsyn-chat__typing", className)} role="status" aria-label={label} {...props}>
      <span aria-hidden className="arcsyn-chat__typing-dots"><i /><i /><i /></span>
      <span>{label}</span>
    </li>
  );
});

export interface ChatComposerProps extends Omit<FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  inputLabel?: string;
  submitLabel?: string;
  sending?: boolean;
  disabled?: boolean;
  maxLength?: number;
  rows?: number;
  actions?: ReactNode;
  sendOnEnter?: boolean;
  onValueChange?: (value: string) => void;
  onSend?: (value: string) => void;
  textareaProps?: Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "value" | "defaultValue" | "placeholder" | "disabled" | "maxLength" | "rows" | "onChange">;
}

const ChatComposer = forwardRef<HTMLFormElement, ChatComposerProps>(function ChatComposer(
  {
    className,
    value,
    defaultValue = "",
    placeholder = "Escreva uma mensagem",
    inputLabel = "Mensagem",
    submitLabel = "Enviar",
    sending = false,
    disabled = false,
    maxLength,
    rows = 1,
    actions,
    sendOnEnter = true,
    onValueChange,
    onSend,
    textareaProps,
    ...props
  },
  ref,
) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = value ?? internalValue;
  const canSend = currentValue.trim().length > 0 && !disabled && !sending;

  function updateValue(nextValue: string) {
    if (value === undefined) setInternalValue(nextValue);
    onValueChange?.(nextValue);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSend) return;
    onSend?.(currentValue.trim());
    if (value === undefined) setInternalValue("");
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    textareaProps?.onKeyDown?.(event);
    if (event.defaultPrevented || !sendOnEnter || event.key !== "Enter" || event.shiftKey || event.nativeEvent.isComposing) return;
    event.preventDefault();
    event.currentTarget.form?.requestSubmit();
  }

  return (
    <form ref={ref} className={cx("arcsyn-chat__composer", className)} onSubmit={submit} {...props}>
      <div className="arcsyn-chat__composer-input">
        <textarea
          {...textareaProps}
          aria-label={inputLabel}
          className={cx("arcsyn-chat__textarea", textareaProps?.className)}
          disabled={disabled || sending}
          maxLength={maxLength}
          placeholder={placeholder}
          rows={rows}
          value={currentValue}
          onChange={(event) => updateValue(event.currentTarget.value)}
          onKeyDown={handleKeyDown}
        />
        {maxLength ? <span className="arcsyn-chat__counter" aria-live="off">{currentValue.length}/{maxLength}</span> : null}
      </div>
      <div className="arcsyn-chat__composer-footer">
        <div className="arcsyn-chat__composer-actions">{actions}</div>
        <Button type="submit" size="sm" loading={sending} disabled={!canSend && !sending}>{submitLabel}</Button>
      </div>
    </form>
  );
});

export const Chat = Object.assign(ChatRoot, {
  Root: ChatRoot,
  Header: ChatHeader,
  HeaderContent: ChatHeaderContent,
  Title: ChatTitle,
  Description: ChatDescription,
  Actions: ChatActions,
  Messages: ChatMessages,
  Message: ChatMessage,
  Timestamp: ChatTimestamp,
  SystemMessage: ChatSystemMessage,
  TypingIndicator: ChatTypingIndicator,
  Composer: ChatComposer,
});
