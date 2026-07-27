import {
  forwardRef,
  useEffect,
  useId,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
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
  includeSeconds?: boolean;
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
    includeSeconds = true,
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
  const [draftParts, setDraftParts] = useState(() => ({
    hour: String(parts.hour).padStart(2, "0"),
    minute: String(parts.minute).padStart(2, "0"),
    second: String(parts.second).padStart(2, "0"),
  }));
  const normalizedMinuteStep = normalizeStep(minuteStep);
  const normalizedSecondStep = normalizeStep(secondStep);

  useEffect(() => {
    setDraftParts({
      hour: String(parts.hour).padStart(2, "0"),
      minute: String(parts.minute).padStart(2, "0"),
      second: String(parts.second).padStart(2, "0"),
    });
  }, [parts.hour, parts.minute, parts.second]);

  function updatePart(next: Partial<typeof parts>) {
    if (disabled || readOnly) return;
    const draftHour = Number(draftParts.hour);
    const draftMinute = Number(draftParts.minute);
    const draftSecond = Number(draftParts.second);
    const nextValue = toTime(
      next.hour ?? (Number.isFinite(draftHour) ? draftHour : parts.hour),
      next.minute ?? (Number.isFinite(draftMinute) ? draftMinute : parts.minute),
      next.second ?? (Number.isFinite(draftSecond) ? draftSecond : parts.second),
    );
    const nextParts = parseTime(nextValue);
    setDraftParts({
      hour: String(nextParts.hour).padStart(2, "0"),
      minute: String(nextParts.minute).padStart(2, "0"),
      second: String(nextParts.second).padStart(2, "0"),
    });
    if (!isControlled) setInternalValue(nextValue);
    onValueChange?.(nextValue);
  }

  function commitPart(part: keyof typeof parts, limit: number) {
    const draft = draftParts[part];
    const parsed = Number(draft);
    const nextValue = Number.isFinite(parsed) ? Math.min(limit - 1, Math.max(0, parsed)) : parts[part];
    updatePart({ [part]: nextValue });
  }

  function handlePartKeyDown(
    event: KeyboardEvent<HTMLInputElement>,
    part: keyof typeof parts,
    limit: number,
    step: number,
  ) {
    if (event.key === "Enter") {
      event.preventDefault();
      commitPart(part, limit);
      event.currentTarget.select();
      return;
    }
    if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return;
    event.preventDefault();
    const direction = event.key === "ArrowUp" ? 1 : -1;
    updatePart({ [part]: (parts[part] + direction * step + limit) % limit });
  }

  return (
    <div
      ref={ref}
      id={rootId}
      className={cx("arcsyn-time", className)}
      data-disabled={disabled || undefined}
      data-invalid={invalid || Boolean(error) || undefined}
      data-readonly={readOnly || undefined}
      data-seconds={includeSeconds || undefined}
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
          <input
            aria-label="Hora"
            type="number"
            inputMode="numeric"
            min={0}
            max={23}
            step={1}
            value={draftParts.hour}
            disabled={disabled}
            readOnly={readOnly}
            onFocus={(event) => event.currentTarget.select()}
            onChange={(event) => {
              if (/^\d{0,2}$/.test(event.target.value)) {
                setDraftParts((current) => ({ ...current, hour: event.target.value }));
              }
            }}
            onBlur={() => commitPart("hour", 24)}
            onKeyDown={(event) => handlePartKeyDown(event, "hour", 24, 1)}
          />
        </label>
        <span className="arcsyn-time__separator" aria-hidden="true">
          :
        </span>
        <label>
          <span>Minuto</span>
          <input
            aria-label="Minuto"
            type="number"
            inputMode="numeric"
            min={0}
            max={59}
            step={normalizedMinuteStep}
            value={draftParts.minute}
            disabled={disabled}
            readOnly={readOnly}
            onFocus={(event) => event.currentTarget.select()}
            onChange={(event) => {
              if (/^\d{0,2}$/.test(event.target.value)) {
                setDraftParts((current) => ({ ...current, minute: event.target.value }));
              }
            }}
            onBlur={() => commitPart("minute", 60)}
            onKeyDown={(event) =>
              handlePartKeyDown(event, "minute", 60, normalizedMinuteStep)
            }
          />
        </label>
        {includeSeconds ? (
          <>
            <span className="arcsyn-time__separator" aria-hidden="true">
              :
            </span>
            <label>
              <span>Segundo</span>
              <input
                aria-label="Segundo"
                type="number"
                inputMode="numeric"
                min={0}
                max={59}
                step={normalizedSecondStep}
                value={draftParts.second}
                disabled={disabled}
                readOnly={readOnly}
                onFocus={(event) => event.currentTarget.select()}
                onChange={(event) => {
                  if (/^\d{0,2}$/.test(event.target.value)) {
                    setDraftParts((current) => ({ ...current, second: event.target.value }));
                  }
                }}
                onBlur={() => commitPart("second", 60)}
                onKeyDown={(event) =>
                  handlePartKeyDown(event, "second", 60, normalizedSecondStep)
                }
              />
            </label>
          </>
        ) : null}
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
