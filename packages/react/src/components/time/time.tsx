import {
  forwardRef,
  useId,
  useMemo,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cx } from "../../utilities/cx.js";

export type TimeSize = "sm" | "md" | "lg";

export interface TimeProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> {
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string) => void;
  label: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  minuteStep?: number;
  secondStep?: number;
  size?: TimeSize;
}

const timePattern = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;

function parseTime(value: string | null | undefined) {
  const match = value ? timePattern.exec(value) : null;
  return match
    ? { hour: Number(match[1]), minute: Number(match[2]), second: Number(match[3]) }
    : { hour: 0, minute: 0, second: 0 };
}

function toTime(hour: number, minute: number, second: number) {
  return [hour, minute, second].map((part) => String(part).padStart(2, "0")).join(":");
}

function normalizeStep(value: number) {
  return Math.min(60, Math.max(1, Math.floor(value)));
}

function createOptions(limit: number, step: number, current: number) {
  const options = Array.from({ length: Math.ceil(limit / step) }, (_, index) => index * step).filter(
    (option) => option < limit,
  );
  return options.includes(current)
    ? options
    : [...options, current].sort((left, right) => left - right);
}

export const Time = forwardRef<HTMLDivElement, TimeProps>(function Time(
  {
    className,
    value,
    defaultValue = null,
    onValueChange,
    label,
    description,
    error,
    name,
    required = false,
    disabled = false,
    readOnly = false,
    invalid = false,
    minuteStep = 1,
    secondStep = 1,
    size = "md",
    id,
    ...props
  },
  ref,
) {
  const generatedId = useId();
  const rootId = id ?? `arcsyn-time-${generatedId}`;
  const labelId = `${rootId}-label`;
  const descriptionId = description ? `${rootId}-description` : undefined;
  const errorId = error ? `${rootId}-error` : undefined;
  const describedBy = [descriptionId, errorId].filter(Boolean).join(" ") || undefined;
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const selectedValue = isControlled ? value : internalValue;
  const parts = parseTime(selectedValue);
  const normalizedMinuteStep = normalizeStep(minuteStep);
  const normalizedSecondStep = normalizeStep(secondStep);
  const minuteOptions = useMemo(
    () => createOptions(60, normalizedMinuteStep, parts.minute),
    [normalizedMinuteStep, parts.minute],
  );
  const secondOptions = useMemo(
    () => createOptions(60, normalizedSecondStep, parts.second),
    [normalizedSecondStep, parts.second],
  );

  function updatePart(next: Partial<typeof parts>) {
    if (disabled || readOnly) return;
    const nextValue = toTime(
      next.hour ?? parts.hour,
      next.minute ?? parts.minute,
      next.second ?? parts.second,
    );
    if (!isControlled) setInternalValue(nextValue);
    onValueChange?.(nextValue);
  }

  return (
    <div
      ref={ref}
      id={rootId}
      className={cx("arcsyn-time", className)}
      data-disabled={disabled || undefined}
      data-invalid={invalid || Boolean(error) || undefined}
      data-readonly={readOnly || undefined}
      data-size={size}
      {...props}
    >
      <span className="arcsyn-time__label" id={labelId}>
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </span>
      <div
        className="arcsyn-time__control"
        role="group"
        aria-labelledby={labelId}
        aria-describedby={describedBy}
        aria-invalid={invalid || Boolean(error) || undefined}
        aria-required={required || undefined}
        aria-readonly={readOnly || undefined}
      >
        <label>
          <span>Hora</span>
          <select
            aria-label="Hora"
            value={parts.hour}
            disabled={disabled}
            onChange={(event) => updatePart({ hour: Number(event.target.value) })}
          >
            {Array.from({ length: 24 }, (_, option) => (
              <option key={option} value={option}>
                {String(option).padStart(2, "0")}
              </option>
            ))}
          </select>
        </label>
        <span className="arcsyn-time__separator" aria-hidden="true">
          :
        </span>
        <label>
          <span>Minuto</span>
          <select
            aria-label="Minuto"
            value={parts.minute}
            disabled={disabled}
            onChange={(event) => updatePart({ minute: Number(event.target.value) })}
          >
            {minuteOptions.map((option) => (
              <option key={option} value={option}>
                {String(option).padStart(2, "0")}
              </option>
            ))}
          </select>
        </label>
        <span className="arcsyn-time__separator" aria-hidden="true">
          :
        </span>
        <label>
          <span>Segundo</span>
          <select
            aria-label="Segundo"
            value={parts.second}
            disabled={disabled}
            onChange={(event) => updatePart({ second: Number(event.target.value) })}
          >
            {secondOptions.map((option) => (
              <option key={option} value={option}>
                {String(option).padStart(2, "0")}
              </option>
            ))}
          </select>
        </label>
      </div>
      {description ? (
        <span className="arcsyn-time__description" id={descriptionId}>
          {description}
        </span>
      ) : null}
      {error ? (
        <span className="arcsyn-time__error" id={errorId} role="alert">
          {error}
        </span>
      ) : null}
      {name ? <input type="hidden" name={name} value={selectedValue ?? ""} /> : null}
    </div>
  );
});
