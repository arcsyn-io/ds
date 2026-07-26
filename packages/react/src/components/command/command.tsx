import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { SearchIcon } from "../../icons/index.js";
import { cx } from "../../utilities/cx.js";
import { Spinner } from "../spinner/spinner.js";

interface CommandItemRecord {
  disabled: boolean;
  id: string;
  visible: boolean;
}

interface CommandContextValue {
  activeId: string | null;
  close?: () => void;
  inputId: string;
  items: Map<string, CommandItemRecord>;
  listId: string;
  query: string;
  registerItem: (item: CommandItemRecord) => () => void;
  setActiveId: (id: string | null) => void;
  setQuery: (query: string) => void;
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

export interface CommandRootProps extends HTMLAttributes<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  close?: () => void;
}

export const CommandRoot = forwardRef<HTMLDivElement, CommandRootProps>(function CommandRoot(
  { className, value, defaultValue = "", onValueChange, close, ...props },
  ref,
) {
  const [internalQuery, setInternalQuery] = useState(defaultValue);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [version, setVersion] = useState(0);
  const items = useRef(new Map<string, CommandItemRecord>()).current;
  const query = value ?? internalQuery;
  const inputId = useId();
  const listId = useId();

  const setQuery = useCallback((nextQuery: string) => {
    if (value === undefined) setInternalQuery(nextQuery);
    onValueChange?.(nextQuery);
    setActiveId(null);
  }, [onValueChange, value]);

  const registerItem = useCallback((item: CommandItemRecord) => {
    items.set(item.id, item);
    setVersion((current) => current + 1);
    return () => {
      items.delete(item.id);
      setVersion((current) => current + 1);
    };
  }, [items]);

  const context = useMemo<CommandContextValue>(() => ({
    activeId,
    close,
    inputId,
    items,
    listId,
    query,
    registerItem,
    setActiveId,
    setQuery,
    version,
  }), [activeId, close, inputId, items, listId, query, registerItem, setQuery, version]);

  return (
    <CommandContext.Provider value={context}>
      <div ref={ref} className={cx("arcsyn-command", className)} {...props} />
    </CommandContext.Provider>
  );
});

export interface CommandInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "size" | "value" | "defaultValue"> {
  onValueChange?: (value: string) => void;
}

export const CommandInput = forwardRef<HTMLInputElement, CommandInputProps>(function CommandInput(
  { className, placeholder = "Buscar comando...", "aria-label": ariaLabel = "Buscar comandos", onValueChange, onKeyDown, ...props },
  ref,
) {
  const context = useCommandContext("Input");

  function enabledItems() {
    return Array.from(context.items.values()).filter((item) => item.visible && !item.disabled);
  }

  function moveActive(event: KeyboardEvent<HTMLInputElement>, direction: 1 | -1) {
    const items = enabledItems();
    if (!items.length) return;
    event.preventDefault();
    const currentIndex = items.findIndex((item) => item.id === context.activeId);
    const nextIndex = currentIndex < 0
      ? direction === 1 ? 0 : items.length - 1
      : (currentIndex + direction + items.length) % items.length;
    context.setActiveId(items[nextIndex]?.id ?? null);
    document.getElementById(items[nextIndex]?.id ?? "")?.scrollIntoView?.({ block: "nearest" });
  }

  return (
    <div className="arcsyn-command__input-wrapper">
      <SearchIcon aria-hidden className="arcsyn-command__search-icon" size={17} />
      <input
        ref={ref}
        id={context.inputId}
        className={cx("arcsyn-command__input", className)}
        role="combobox"
        aria-label={ariaLabel}
        aria-autocomplete="list"
        aria-controls={context.listId}
        aria-expanded="true"
        aria-activedescendant={context.activeId ?? undefined}
        autoComplete="off"
        placeholder={placeholder}
        value={context.query}
        onChange={(event) => {
          context.setQuery(event.currentTarget.value);
          onValueChange?.(event.currentTarget.value);
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") moveActive(event, 1);
          else if (event.key === "ArrowUp") moveActive(event, -1);
          else if (event.key === "Home") {
            const first = enabledItems()[0];
            if (first) { event.preventDefault(); context.setActiveId(first.id); }
          } else if (event.key === "End") {
            const items = enabledItems();
            const last = items.at(-1);
            if (last) { event.preventDefault(); context.setActiveId(last.id); }
          } else if (event.key === "Enter" && context.activeId) {
            event.preventDefault();
            document.getElementById(context.activeId)?.click();
          }
          onKeyDown?.(event);
        }}
        {...props}
      />
    </div>
  );
});

export type CommandListProps = HTMLAttributes<HTMLDivElement>;

export const CommandList = forwardRef<HTMLDivElement, CommandListProps>(function CommandList({ className, "aria-label": ariaLabel = "Comandos disponíveis", ...props }, ref) {
  const { listId } = useCommandContext("List");
  return <div ref={ref} id={listId} role="listbox" aria-label={ariaLabel} className={cx("arcsyn-command__list", className)} {...props} />;
});

export interface CommandGroupProps extends HTMLAttributes<HTMLDivElement> {
  heading?: ReactNode;
}

export const CommandGroup = forwardRef<HTMLDivElement, CommandGroupProps>(function CommandGroup(
  { className, heading, children, ...props },
  ref,
) {
  const headingId = useId();
  return (
    <div ref={ref} role="group" aria-labelledby={heading ? headingId : undefined} className={cx("arcsyn-command__group", className)} {...props}>
      {heading ? <div id={headingId} className="arcsyn-command__group-heading">{heading}</div> : null}
      {children}
    </div>
  );
});

export interface CommandItemProps extends Omit<HTMLAttributes<HTMLDivElement>, "onSelect"> {
  value: string;
  keywords?: readonly string[];
  disabled?: boolean;
  onSelect?: (value: string) => void;
}

export const CommandItem = forwardRef<HTMLDivElement, CommandItemProps>(function CommandItem(
  { className, children, value, keywords = [], disabled = false, onSelect, onClick, onPointerMove, ...props },
  ref,
) {
  const context = useCommandContext("Item");
  const generatedId = useId();
  const id = `arcsyn-command-item-${generatedId.replace(/:/g, "")}`;
  const searchText = normalize([value, textFromChildren(children), ...keywords].join(" "));
  const visible = !normalize(context.query) || searchText.includes(normalize(context.query));
  const registerItem = context.registerItem;

  useLayoutEffect(() => registerItem({ disabled, id, visible }), [disabled, id, registerItem, visible]);

  return (
    <div
      ref={ref}
      id={id}
      role="option"
      aria-disabled={disabled || undefined}
      aria-selected={context.activeId === id}
      className={cx("arcsyn-command__item", className)}
      data-command-item=""
      data-active={context.activeId === id || undefined}
      hidden={!visible}
      onPointerMove={(event) => {
        if (!disabled) context.setActiveId(id);
        onPointerMove?.(event);
      }}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented || disabled) return;
        onSelect?.(value);
        context.close?.();
      }}
      {...props}
    >
      {children}
    </div>
  );
});

export type CommandSeparatorProps = HTMLAttributes<HTMLDivElement>;

export const CommandSeparator = forwardRef<HTMLDivElement, CommandSeparatorProps>(function CommandSeparator({ className, ...props }, ref) {
  return <div ref={ref} role="separator" className={cx("arcsyn-command__separator", className)} {...props} />;
});

export type CommandEmptyProps = HTMLAttributes<HTMLDivElement>;

export const CommandEmpty = forwardRef<HTMLDivElement, CommandEmptyProps>(function CommandEmpty({ className, ...props }, ref) {
  const context = useCommandContext("Empty");
  const hasVisibleItems = Array.from(context.items.values()).some((item) => item.visible);
  if (hasVisibleItems) return null;
  return <div ref={ref} role="status" className={cx("arcsyn-command__empty", className)} {...props} />;
});

export interface CommandLoadingProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
}

export const CommandLoading = forwardRef<HTMLDivElement, CommandLoadingProps>(function CommandLoading(
  { className, label = "Carregando comandos", children, ...props },
  ref,
) {
  return <div ref={ref} role="status" className={cx("arcsyn-command__loading", className)} {...props}><Spinner size="sm" label={label} />{children}</div>;
});

export type CommandShortcutProps = HTMLAttributes<HTMLElement>;

export const CommandShortcut = forwardRef<HTMLElement, CommandShortcutProps>(function CommandShortcut({ className, ...props }, ref) {
  return <kbd ref={ref} className={cx("arcsyn-command__shortcut", className)} {...props} />;
});

function isEditableTarget(target: EventTarget | null) {
  return target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName));
}

function matchesShortcut(event: globalThis.KeyboardEvent, shortcut: string) {
  const parts = shortcut.toLocaleLowerCase().split("+").map((part) => part.trim());
  const key = parts.at(-1);
  return (!parts.includes("mod") || event.metaKey || event.ctrlKey)
    && (!parts.includes("shift") || event.shiftKey)
    && event.key.toLocaleLowerCase() === key;
}

export interface CommandDialogProps extends Omit<ComponentPropsWithoutRef<typeof BaseDialog.Root>, "children"> {
  children: ReactNode;
  shortcut?: string | false;
  title?: string;
  description?: string;
  commandProps?: Omit<CommandRootProps, "children" | "close">;
}

export function CommandDialog({
  children,
  shortcut = "mod+k",
  title = "Paleta de comandos",
  description = "Busque e execute uma ação.",
  commandProps,
  open,
  defaultOpen,
  onOpenChange,
  ...props
}: CommandDialogProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen ?? false);
  const isOpen = open ?? internalOpen;
  const setOpen = useCallback((nextOpen: boolean) => {
    if (open === undefined) setInternalOpen(nextOpen);
    (onOpenChange as ((nextOpen: boolean) => void) | undefined)?.(nextOpen);
  }, [onOpenChange, open]);

  useEffect(() => {
    if (!shortcut) return;
    const handler = (event: globalThis.KeyboardEvent) => {
      if (isEditableTarget(event.target) || !matchesShortcut(event, shortcut)) return;
      event.preventDefault();
      setOpen(!isOpen);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, setOpen, shortcut]);

  return (
    <BaseDialog.Root open={isOpen} onOpenChange={(nextOpen) => setOpen(nextOpen)} {...props}>
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className="arcsyn-command-dialog__backdrop" />
        <BaseDialog.Viewport className="arcsyn-command-dialog__viewport">
          <BaseDialog.Popup className="arcsyn-command-dialog">
            <BaseDialog.Title className="arcsyn-command__visually-hidden">{title}</BaseDialog.Title>
            <BaseDialog.Description className="arcsyn-command__visually-hidden">{description}</BaseDialog.Description>
            <CommandRoot {...commandProps} close={() => setOpen(false)}>{children}</CommandRoot>
          </BaseDialog.Popup>
        </BaseDialog.Viewport>
      </BaseDialog.Portal>
    </BaseDialog.Root>
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
