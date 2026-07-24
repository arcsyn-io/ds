import { forwardRef, useEffect, useImperativeHandle, useRef, useState, type FormEvent, type InputHTMLAttributes } from "react";
import { SearchIcon, XIcon } from "../../icons/index.js";
import { cx } from "../../utilities/cx.js";
import { Kbd } from "../kbd/kbd.js";
import { Spinner } from "../spinner/spinner.js";

export interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "onSubmit"> {
  "aria-label": string;
  size?: "sm" | "md" | "lg";
  invalid?: boolean;
  loading?: boolean;
  clearable?: boolean;
  clearLabel?: string;
  shortcut?: string;
  onValueChange?: (value: string) => void;
  onClear?: () => void;
  onSubmit?: (value: string, event: FormEvent<HTMLFormElement>) => void;
  onShortcut?: () => void;
}

function isEditableTarget(target: EventTarget | null) {
  return target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName));
}

function shortcutParts(shortcut: string) {
  return shortcut.toLocaleLowerCase().split("+").map((part) => part.trim());
}

function shortcutLabel(shortcut: string) {
  const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform);
  return shortcutParts(shortcut).map((part) => part === "mod" ? (isMac ? "⌘" : "Ctrl") : part.length === 1 ? part.toLocaleUpperCase() : part).join(isMac ? "" : "+");
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(function SearchInput(
  {
    className,
    size = "md",
    invalid = false,
    loading = false,
    clearable = false,
    clearLabel = "Limpar busca",
    shortcut,
    onValueChange,
    onClear,
    onSubmit,
    onShortcut,
    value,
    defaultValue,
    disabled,
    readOnly,
    onChange,
    onKeyDown,
    ...props
  },
  forwardedRef,
) {
  const inputRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(forwardedRef, () => inputRef.current as HTMLInputElement);
  const [internalValue, setInternalValue] = useState(() => String(defaultValue ?? ""));
  const currentValue = value === undefined ? internalValue : String(value);

  useEffect(() => {
    if (!shortcut || !onShortcut) return;
    const parts = shortcutParts(shortcut);
    const key = parts.at(-1);
    const handler = (event: KeyboardEvent) => {
      if (isEditableTarget(event.target)) return;
      const modifierMatches = !parts.includes("mod") || (event.metaKey || event.ctrlKey);
      if (modifierMatches && event.key.toLocaleLowerCase() === key) {
        event.preventDefault();
        onShortcut();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onShortcut, shortcut]);

  function updateValue(next: string) {
    if (value === undefined) setInternalValue(next);
    onValueChange?.(next);
  }
  function clear() {
    if (disabled || readOnly) return;
    updateValue("");
    onClear?.();
    inputRef.current?.focus();
  }

  return (
    <form className={cx("arcsyn-search-input", className)} data-size={size} data-invalid={invalid || undefined} data-disabled={disabled || undefined} role="search" onSubmit={(event) => { event.preventDefault(); onSubmit?.(currentValue, event); }}>
      <SearchIcon className="arcsyn-search-input__search-icon" aria-hidden size={16} />
      <input
        ref={inputRef}
        type="search"
        value={currentValue}
        disabled={disabled}
        readOnly={readOnly}
        aria-invalid={invalid || undefined}
        aria-busy={loading || undefined}
        onChange={(event) => { updateValue(event.currentTarget.value); onChange?.(event); }}
        onKeyDown={(event) => { if (event.key === "Escape" && currentValue) { event.preventDefault(); clear(); } onKeyDown?.(event); }}
        {...props}
      />
      {loading ? <Spinner className="arcsyn-search-input__spinner" size="sm" label="Carregando resultados" /> : null}
      {clearable && currentValue && !loading ? <button className="arcsyn-search-input__clear" type="button" aria-label={clearLabel} onClick={clear} disabled={disabled || readOnly}><XIcon aria-hidden size={14} /></button> : null}
      {shortcut ? <Kbd className="arcsyn-search-input__shortcut" aria-hidden="true">{shortcutLabel(shortcut)}</Kbd> : null}
    </form>
  );
});
