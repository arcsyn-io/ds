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
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon, XIcon } from "../../icons/index.js";
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
    id,
    ...props
  },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? `arcsyn-date-picker-${generatedId}`;
  const labelId = `${inputId}-label`;
  const descriptionId = description ? `${inputId}-description` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [descriptionId, errorId].filter(Boolean).join(" ") || undefined;
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const selectedValue = isControlled ? value : internalValue;
  const selectedDate = useMemo(() => fromISO(selectedValue), [selectedValue]);
  const today = useMemo(() => new Date(), []);
  const [open, setOpen] = useState(false);
  const [viewDate, setViewDate] = useState(() => startOfMonth(selectedDate ?? today));
  const [activeDate, setActiveDate] = useState(() => selectedDate ?? today);
  const calendarRef = useRef<HTMLDivElement>(null);
  const activeDayRef = useRef<HTMLButtonElement>(null);
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
    if (!open) return;
    const next = selectedDate ?? today;
    setViewDate(startOfMonth(next));
    setActiveDate(next);
  }, [open, selectedDate, today]);

  useEffect(() => {
    if (!open) return;
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

  function selectDate(date: Date) {
    if (disabled || readOnly || unavailable(date)) return;
    updateValue(toISO(date));
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
      data-invalid={invalid || Boolean(error) || undefined}
      data-size={size}
      {...props}
    >
      <span className="arcsyn-date-picker__label" id={labelId}>
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </span>
      <BasePopover.Root open={open} onOpenChange={setOpen}>
        <div className="arcsyn-date-picker__field">
          <BasePopover.Trigger
            id={inputId}
            className="arcsyn-date-picker__trigger"
            aria-labelledby={labelId}
            aria-describedby={describedBy}
            aria-invalid={invalid || Boolean(error) || undefined}
            aria-required={required || undefined}
            disabled={disabled}
          >
            <CalendarIcon aria-hidden size={16} />
            <span data-placeholder={!selectedValue || undefined}>
              {selectedValue ? formatValue(selectedValue, locale) : placeholder}
            </span>
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
            align="start"
            sideOffset={6}
          >
            <BasePopover.Popup
              className="arcsyn-date-picker__popup"
              aria-label={`Escolher data para ${typeof label === "string" ? label : "o campo"}`}
              initialFocus={() => activeDayRef.current}
            >
              <div className="arcsyn-date-picker__header">
                <button
                  type="button"
                  className="arcsyn-date-picker__nav"
                  aria-label="Mês anterior"
                  onClick={() => setViewDate((current) => addMonths(current, -1))}
                >
                  <ChevronLeftIcon aria-hidden size={16} />
                </button>
                <strong aria-live="polite">{monthLabel}</strong>
                <button
                  type="button"
                  className="arcsyn-date-picker__nav"
                  aria-label="Próximo mês"
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
      {error ? (
        <span className="arcsyn-date-picker__error" id={errorId} role="alert">
          {error}
        </span>
      ) : null}
      {name ? <input type="hidden" name={name} value={selectedValue ?? ""} /> : null}
    </div>
  );
});
