import { Popover as BasePopover } from "@base-ui/react/popover";
import {
  forwardRef,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import {
  CalendarIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  XIcon,
} from "../../icons/index.js";
import { cx } from "../../utilities/cx.js";

export type DatePickerSize = "sm" | "md" | "lg";

export interface DatePickerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> {
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
  label: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  placeholder?: string;
  locale?: string;
  min?: string;
  max?: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  clearable?: boolean;
  size?: DatePickerSize;
  firstDayOfWeek?: 0 | 1;
  isDateUnavailable?: (value: string) => boolean;
  formatValue?: (value: string, locale: string) => string;
  parseInput?: (input: string, locale: string) => string | null;
  invalidInputMessage?: ReactNode;
}

const isoPattern = /^\d{4}-\d{2}-\d{2}$/;

function fromISO(value: string | null | undefined) {
  if (!value || !isoPattern.test(value)) return null;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day
    ? date
    : null;
}

function toISO(date: Date) {
  const year = String(date.getFullYear()).padStart(4, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addDays(date: Date, amount: number) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount);
}

function addMonths(date: Date, amount: number) {
  const target = new Date(date.getFullYear(), date.getMonth() + amount, 1);
  target.setDate(Math.min(date.getDate(), new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate()));
  return target;
}

function sameDay(left: Date, right: Date) {
  return toISO(left) === toISO(right);
}

function defaultFormatValue(value: string, locale: string) {
  const date = fromISO(value);
  return date
    ? new Intl.DateTimeFormat(locale, { day: "2-digit", month: "2-digit", year: "numeric" }).format(date)
    : value;
}

function defaultParseInput(input: string) {
  const normalized = input.trim();
  if (fromISO(normalized)) return normalized;
  const match = /^(\d{1,2})[./-](\d{1,2})[./-](\d{4})$/.exec(normalized);
  if (!match) return null;
  const [, day, month, year] = match;
  const value = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  return fromISO(value) ? value : null;
}

export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(function DatePicker(
  {
    className,
    value,
    defaultValue = null,
    onValueChange,
    label,
    description,
    error,
    placeholder = "Selecione uma data",
    locale = "pt-BR",
    min,
    max,
    name,
    required = false,
    disabled = false,
    readOnly = false,
    invalid = false,
    clearable = true,
    size = "md",
    firstDayOfWeek = 0,
    isDateUnavailable,
    formatValue = defaultFormatValue,
    parseInput = defaultParseInput,
    invalidInputMessage = "Informe uma data válida.",
    id,
    ...props
  },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? `arcsyn-date-picker-${generatedId}`;
  const [inputInvalid, setInputInvalid] = useState(false);
  const labelId = `${inputId}-label`;
  const descriptionId = description ? `${inputId}-description` : undefined;
  const errorId = `${inputId}-error`;
  const describedBy =
    [descriptionId, error || inputInvalid ? errorId : undefined].filter(Boolean).join(" ") ||
    undefined;
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const selectedValue = isControlled ? value : internalValue;
  const selectedDate = useMemo(() => fromISO(selectedValue), [selectedValue]);
  const today = useMemo(() => new Date(), []);
  const [draft, setDraft] = useState(() =>
    selectedValue ? formatValue(selectedValue, locale) : "",
  );
  const [open, setOpen] = useState(false);
  const [viewDate, setViewDate] = useState(() => startOfMonth(selectedDate ?? today));
  const [activeDate, setActiveDate] = useState(() => selectedDate ?? today);
  const fieldRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const activeDayRef = useRef<HTMLButtonElement>(null);
  const openingModeRef = useRef<"input" | "calendar">("calendar");
  const minDate = fromISO(min);
  const maxDate = fromISO(max);
  const unavailable = (date: Date) => {
    const iso = toISO(date);
    return Boolean(
      (minDate && date < minDate) ||
        (maxDate && date > maxDate) ||
        isDateUnavailable?.(iso),
    );
  };

  useEffect(() => {
    setDraft(selectedValue ? formatValue(selectedValue, locale) : "");
    setInputInvalid(false);
  }, [formatValue, locale, selectedValue]);

  useEffect(() => {
    if (!open) return;
    const next = selectedDate ?? today;
    setViewDate(startOfMonth(next));
    setActiveDate(next);
  }, [open, selectedDate, today]);

  useEffect(() => {
    if (!open || openingModeRef.current === "input") return;
    calendarRef.current
      ?.querySelector<HTMLButtonElement>(`[data-date="${toISO(activeDate)}"]`)
      ?.focus();
  }, [activeDate, open, viewDate]);

  const weekdays = useMemo(() => {
    const formatter = new Intl.DateTimeFormat(locale, { weekday: "short" });
    const sunday = new Date(2024, 0, 7);
    return Array.from({ length: 7 }, (_, index) =>
      formatter.format(addDays(sunday, (index + firstDayOfWeek) % 7)).replace(".", ""),
    );
  }, [firstDayOfWeek, locale]);

  const days = useMemo(() => {
    const first = startOfMonth(viewDate);
    const offset = (first.getDay() - firstDayOfWeek + 7) % 7;
    const gridStart = addDays(first, -offset);
    return Array.from({ length: 42 }, (_, index) => addDays(gridStart, index));
  }, [firstDayOfWeek, viewDate]);

  const monthLabel = new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric",
  }).format(viewDate);
  const monthOptions = useMemo(
    () =>
      Array.from({ length: 12 }, (_, month) => ({
        month,
        label: new Intl.DateTimeFormat(locale, { month: "long" }).format(
          new Date(2024, month, 1),
        ),
      })),
    [locale],
  );
  const previousMonth = addMonths(viewDate, -1);
  const nextMonth = addMonths(viewDate, 1);
  const previousYear = new Date(viewDate.getFullYear() - 1, viewDate.getMonth(), 1);
  const nextYear = new Date(viewDate.getFullYear() + 1, viewDate.getMonth(), 1);
  const canShowMonth = (date: Date) => {
    const monthStart = startOfMonth(date);
    const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return !((minDate && monthEnd < minDate) || (maxDate && monthStart > maxDate));
  };
  const fullDateFormatter = new Intl.DateTimeFormat(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  function updateValue(next: string | null) {
    if (!isControlled) setInternalValue(next);
    onValueChange?.(next);
  }

  function commitDraft() {
    const trimmed = draft.trim();
    if (!trimmed) {
      setInputInvalid(required);
      if (!required) updateValue(null);
      return;
    }
    const parsed = parseInput(trimmed, locale);
    const date = fromISO(parsed);
    if (!parsed || !date || unavailable(date)) {
      setInputInvalid(true);
      return;
    }
    setInputInvalid(false);
    setDraft(formatValue(parsed, locale));
    updateValue(parsed);
  }

  function selectDate(date: Date) {
    if (disabled || readOnly || unavailable(date)) return;
    updateValue(toISO(date));
    setDraft(formatValue(toISO(date), locale));
    setInputInvalid(false);
    setOpen(false);
  }

  function moveActive(next: Date) {
    setActiveDate(next);
    if (
      next.getFullYear() !== viewDate.getFullYear() ||
      next.getMonth() !== viewDate.getMonth()
    ) {
      setViewDate(startOfMonth(next));
    }
  }

  function handleCalendarKeyDown(event: KeyboardEvent<HTMLButtonElement>, date: Date) {
    let next: Date | null = null;
    if (event.key === "ArrowLeft") next = addDays(date, -1);
    if (event.key === "ArrowRight") next = addDays(date, 1);
    if (event.key === "ArrowUp") next = addDays(date, -7);
    if (event.key === "ArrowDown") next = addDays(date, 7);
    if (event.key === "Home") next = addDays(date, -((date.getDay() - firstDayOfWeek + 7) % 7));
    if (event.key === "End") next = addDays(date, 6 - ((date.getDay() - firstDayOfWeek + 7) % 7));
    if (event.key === "PageUp") next = addMonths(date, event.shiftKey ? -12 : -1);
    if (event.key === "PageDown") next = addMonths(date, event.shiftKey ? 12 : 1);
    if (next) {
      event.preventDefault();
      moveActive(next);
    }
  }

  return (
    <div
      ref={ref}
      className={cx("arcsyn-date-picker", className)}
      data-disabled={disabled || undefined}
      data-invalid={invalid || inputInvalid || Boolean(error) || undefined}
      data-size={size}
      {...props}
    >
      <label className="arcsyn-date-picker__label" id={labelId} htmlFor={inputId}>
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      <BasePopover.Root
        open={open}
        onOpenChange={(nextOpen, eventDetails) => {
          if (
            !nextOpen &&
            eventDetails.event?.target instanceof Node &&
            inputRef.current?.contains(eventDetails.event.target)
          ) {
            return;
          }
          setOpen(nextOpen);
        }}
      >
        <div ref={fieldRef} className="arcsyn-date-picker__field">
          <input
            ref={inputRef}
            id={inputId}
            className="arcsyn-date-picker__input"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            value={draft}
            placeholder={placeholder}
            aria-describedby={describedBy}
            aria-invalid={invalid || inputInvalid || Boolean(error) || undefined}
            aria-required={required || undefined}
            disabled={disabled}
            readOnly={readOnly}
            onFocus={() => {
              openingModeRef.current = "input";
              setOpen(true);
            }}
            onChange={(event) => {
              setDraft(event.target.value);
              setInputInvalid(false);
            }}
            onBlur={commitDraft}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                commitDraft();
              }
              if (event.key === "ArrowDown" && event.altKey) {
                event.preventDefault();
                openingModeRef.current = "calendar";
                activeDayRef.current?.focus();
                setOpen(true);
              }
            }}
          />
          <BasePopover.Trigger
            className="arcsyn-date-picker__trigger"
            aria-label={`Abrir calendário para ${typeof label === "string" ? label : "o campo"}`}
            disabled={disabled}
            onPointerDown={() => {
              openingModeRef.current = "calendar";
            }}
            onKeyDown={() => {
              openingModeRef.current = "calendar";
            }}
          >
            <CalendarIcon aria-hidden size={16} />
          </BasePopover.Trigger>
          {clearable && selectedValue && !disabled && !readOnly ? (
            <button
              className="arcsyn-date-picker__clear"
              type="button"
              aria-label="Limpar data"
              onClick={() => updateValue(null)}
            >
              <XIcon aria-hidden size={14} />
            </button>
          ) : null}
        </div>
        <BasePopover.Portal>
          <BasePopover.Positioner
            className="arcsyn-date-picker__positioner"
            anchor={() => fieldRef.current}
            align="start"
            sideOffset={6}
            collisionAvoidance={{ side: "flip", align: "shift", fallbackAxisSide: "none" }}
          >
            <BasePopover.Popup
              className="arcsyn-date-picker__popup"
              aria-label={`Escolher data para ${typeof label === "string" ? label : "o campo"}`}
              initialFocus={() =>
                openingModeRef.current === "input" ? false : activeDayRef.current
              }
              finalFocus={() => (openingModeRef.current === "input" ? false : true)}
            >
              <div className="arcsyn-date-picker__header">
                <button
                  type="button"
                  className="arcsyn-date-picker__nav"
                  aria-label="Mês anterior"
                  disabled={!canShowMonth(previousMonth)}
                  onClick={() => setViewDate((current) => addMonths(current, -1))}
                >
                  <ChevronLeftIcon aria-hidden size={16} />
                </button>
                <div className="arcsyn-date-picker__period" aria-live="polite">
                  <select
                    aria-label="Mês"
                    className="arcsyn-date-picker__month-select"
                    value={viewDate.getMonth()}
                    onChange={(event) =>
                      setViewDate(
                        new Date(viewDate.getFullYear(), Number(event.target.value), 1),
                      )
                    }
                  >
                    {monthOptions.map(({ month, label: optionLabel }) => (
                      <option
                        key={month}
                        value={month}
                        disabled={!canShowMonth(new Date(viewDate.getFullYear(), month, 1))}
                      >
                        {optionLabel}
                      </option>
                    ))}
                  </select>
                  <span
                    className="arcsyn-date-picker__period-control"
                    role="group"
                    aria-label="Ano"
                  >
                    <span className="arcsyn-date-picker__period-value">
                      {viewDate.getFullYear()}
                    </span>
                    <span className="arcsyn-date-picker__period-actions">
                      <button
                        type="button"
                        aria-label="Próximo ano"
                        disabled={!canShowMonth(nextYear)}
                        onClick={() => setViewDate(nextYear)}
                      >
                        <ChevronUpIcon aria-hidden size={12} />
                      </button>
                      <button
                        type="button"
                        aria-label="Ano anterior"
                        disabled={!canShowMonth(previousYear)}
                        onClick={() => setViewDate(previousYear)}
                      >
                        <ChevronDownIcon aria-hidden size={12} />
                      </button>
                    </span>
                  </span>
                  <span className="arcsyn-date-picker__period-label">{monthLabel}</span>
                </div>
                <button
                  type="button"
                  className="arcsyn-date-picker__nav"
                  aria-label="Próximo mês"
                  disabled={!canShowMonth(nextMonth)}
                  onClick={() => setViewDate((current) => addMonths(current, 1))}
                >
                  <ChevronRightIcon aria-hidden size={16} />
                </button>
              </div>
              <div
                ref={calendarRef}
                className="arcsyn-date-picker__calendar"
                role="grid"
                aria-label={monthLabel}
              >
                <div className="arcsyn-date-picker__week" role="row">
                  {weekdays.map((weekday, index) => (
                    <span key={`${weekday}-${index}`} role="columnheader" aria-label={weekday}>
                      {weekday}
                    </span>
                  ))}
                </div>
                {Array.from({ length: 6 }, (_, week) => (
                  <div className="arcsyn-date-picker__week" role="row" key={week}>
                    {days.slice(week * 7, week * 7 + 7).map((date) => {
                      const dateValue = toISO(date);
                      const isSelected = Boolean(selectedDate && sameDay(date, selectedDate));
                      const isActive = sameDay(date, activeDate);
                      const isOutside = date.getMonth() !== viewDate.getMonth();
                      const isUnavailable = unavailable(date);
                      return (
                        <button
                          type="button"
                          role="gridcell"
                          ref={isActive ? activeDayRef : undefined}
                          className="arcsyn-date-picker__day"
                          key={dateValue}
                          data-date={dateValue}
                          data-outside={isOutside || undefined}
                          data-today={sameDay(date, today) || undefined}
                          data-selected={isSelected || undefined}
                          aria-current={sameDay(date, today) ? "date" : undefined}
                          aria-label={fullDateFormatter.format(date)}
                          aria-selected={isSelected}
                          disabled={isUnavailable}
                          tabIndex={isActive ? 0 : -1}
                          onFocus={() => setActiveDate(date)}
                          onKeyDown={(event) => handleCalendarKeyDown(event, date)}
                          onClick={() => selectDate(date)}
                        >
                          {date.getDate()}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
              <div className="arcsyn-date-picker__footer">
                <button
                  type="button"
                  className="arcsyn-date-picker__today"
                  disabled={unavailable(today)}
                  onClick={() => selectDate(today)}
                >
                  Hoje
                </button>
                <BasePopover.Close className="arcsyn-date-picker__close">
                  Fechar
                </BasePopover.Close>
              </div>
            </BasePopover.Popup>
          </BasePopover.Positioner>
        </BasePopover.Portal>
      </BasePopover.Root>
      {description ? (
        <span className="arcsyn-date-picker__description" id={descriptionId}>
          {description}
        </span>
      ) : null}
      {error || inputInvalid ? (
        <span className="arcsyn-date-picker__error" id={errorId} role="alert">
          {error ?? invalidInputMessage}
        </span>
      ) : null}
      {name ? <input type="hidden" name={name} value={selectedValue ?? ""} /> : null}
    </div>
  );
});
