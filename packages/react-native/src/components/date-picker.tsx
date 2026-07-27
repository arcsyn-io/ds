import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XIcon,
} from "../icons/index.js";
import { tokens, useArcSynTheme } from "../theme.js";
import { Time } from "./time.js";

export type DatePickerSize = "sm" | "md" | "lg";

export interface DatePickerProps {
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
  label: string;
  description?: ReactNode;
  error?: ReactNode;
  placeholder?: string;
  locale?: string;
  min?: string;
  max?: string;
  disabled?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  required?: boolean;
  clearable?: boolean;
  includeTime?: boolean;
  minuteStep?: number;
  secondStep?: number;
  size?: DatePickerSize;
  firstDayOfWeek?: 0 | 1;
  isDateUnavailable?: (value: string) => boolean;
  formatValue?: (value: string, locale: string) => string;
  parseInput?: (input: string, locale: string) => string | null;
  invalidInputMessage?: ReactNode;
  accessibilityHint?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

const isoPattern = /^\d{4}-\d{2}-\d{2}$/;
const isoDateTimePattern =
  /^(\d{4}-\d{2}-\d{2})T([01]\d|2[0-3]):([0-5]\d)(?::([0-5]\d))?$/;

function fromISO(value: string | null | undefined) {
  const dateValue = value?.slice(0, 10);
  if (!dateValue || !isoPattern.test(dateValue)) return null;
  const [year, month, day] = dateValue.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day
    ? date
    : null;
}

function toISO(date: Date) {
  return `${String(date.getFullYear()).padStart(4, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function getTime(value: string | null | undefined) {
  const match = value ? isoDateTimePattern.exec(value) : null;
  return match
    ? { hour: Number(match[2]), minute: Number(match[3]), second: Number(match[4] ?? 0) }
    : { hour: 0, minute: 0, second: 0 };
}

function toValue(date: Date, includeTime: boolean, hour = 0, minute = 0, second = 0) {
  if (!includeTime) return toISO(date);
  return `${toISO(date)}T${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:${String(second).padStart(2, "0")}`;
}

function addDays(date: Date, amount: number) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount);
}

function addMonths(date: Date, amount: number) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

function defaultFormatValue(value: string, locale: string) {
  const date = fromISO(value);
  if (!date) return value;
  const time = getTime(value);
  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    ...(isoDateTimePattern.test(value)
      ? { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }
      : {}),
  }).format(
    new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      time.hour,
      time.minute,
      time.second,
    ),
  );
}

function defaultParseInput(input: string, _locale: string, includeTime = false) {
  const normalized = input.trim();
  const isoDateTimeMatch = isoDateTimePattern.exec(normalized);
  if (isoDateTimeMatch) {
    return `${isoDateTimeMatch[1]}T${isoDateTimeMatch[2]}:${isoDateTimeMatch[3]}:${isoDateTimeMatch[4] ?? "00"}`;
  }
  if (fromISO(normalized) && !includeTime) return normalized;
  const match =
    /^(\d{1,2})[./-](\d{1,2})[./-](\d{4})(?:\s+([01]?\d|2[0-3]):([0-5]\d)(?::([0-5]\d))?)?$/.exec(
      normalized,
    );
  if (!match) return null;
  const [, day, month, year, hour, minute, second] = match;
  const value = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  if (!fromISO(value)) return null;
  if (!includeTime) return value;
  return `${value}T${String(hour ?? "0").padStart(2, "0")}:${minute ?? "00"}:${second ?? "00"}`;
}

const heightBySize: Record<DatePickerSize, number> = { sm: 44, md: 44, lg: 48 };

export function DatePicker({
  value,
  defaultValue = null,
  onValueChange,
  label,
  description,
  error,
  placeholder,
  locale = "pt-BR",
  min,
  max,
  disabled = false,
  readOnly = false,
  invalid = false,
  required = false,
  clearable = true,
  includeTime = false,
  minuteStep = 1,
  secondStep = 1,
  size = "md",
  firstDayOfWeek = 0,
  isDateUnavailable,
  formatValue = defaultFormatValue,
  parseInput,
  invalidInputMessage = "Informe uma data válida.",
  accessibilityHint = "Abre o calendário para escolher uma data",
  style,
  testID,
}: DatePickerProps) {
  const { colors } = useArcSynTheme();
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const selectedValue = isControlled ? value : internalValue;
  const selectedDate = fromISO(selectedValue);
  const selectedTime = getTime(selectedValue);
  const today = new Date();
  const [draft, setDraft] = useState(() =>
    selectedValue ? formatValue(selectedValue, locale) : "",
  );
  const [inputInvalid, setInputInvalid] = useState(false);
  const [open, setOpen] = useState(false);
  const [hour, setHour] = useState(selectedTime.hour);
  const [minute, setMinute] = useState(selectedTime.minute);
  const [second, setSecond] = useState(selectedTime.second);
  const [viewDate, setViewDate] = useState(
    () => new Date((selectedDate ?? today).getFullYear(), (selectedDate ?? today).getMonth(), 1),
  );
  const minDate = fromISO(min);
  const maxDate = fromISO(max);

  const weekdays = useMemo(() => {
    const formatter = new Intl.DateTimeFormat(locale, { weekday: "narrow" });
    const sunday = new Date(2024, 0, 7);
    return Array.from({ length: 7 }, (_, index) =>
      formatter.format(addDays(sunday, (index + firstDayOfWeek) % 7)),
    );
  }, [firstDayOfWeek, locale]);

  const days = useMemo(() => {
    const first = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
    const offset = (first.getDay() - firstDayOfWeek + 7) % 7;
    const start = addDays(first, -offset);
    return Array.from({ length: 42 }, (_, index) => addDays(start, index));
  }, [firstDayOfWeek, viewDate]);

  const monthOptions = useMemo(
    () =>
      Array.from({ length: 12 }, (_, month) => ({
        month,
        label: new Intl.DateTimeFormat(locale, { month: "short" })
          .format(new Date(2024, month, 1))
          .replace(".", ""),
        fullLabel: new Intl.DateTimeFormat(locale, { month: "long" }).format(
          new Date(2024, month, 1),
        ),
      })),
    [locale],
  );
  const fullDateFormatter = new Intl.DateTimeFormat(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  function unavailable(date: Date) {
    return Boolean(
      (minDate && date < minDate) ||
        (maxDate && date > maxDate) ||
        isDateUnavailable?.(toISO(date)),
    );
  }

  function updateValue(next: string | null) {
    if (!isControlled) setInternalValue(next);
    onValueChange?.(next);
  }

  useEffect(() => {
    setDraft(selectedValue ? formatValue(selectedValue, locale) : "");
    const nextTime = getTime(selectedValue);
    setHour(nextTime.hour);
    setMinute(nextTime.minute);
    setSecond(nextTime.second);
    setInputInvalid(false);
  }, [formatValue, locale, selectedValue]);

  function commitDraft() {
    const trimmed = draft.trim();
    if (!trimmed) {
      setInputInvalid(required);
      if (!required) updateValue(null);
      return;
    }
    const parsed = parseInput
      ? parseInput(trimmed, locale)
      : defaultParseInput(trimmed, locale, includeTime);
    const date = fromISO(parsed);
    if (
      !parsed ||
      !date ||
      unavailable(date) ||
      (includeTime && !isoDateTimePattern.test(parsed))
    ) {
      setInputInvalid(true);
      return;
    }
    setInputInvalid(false);
    setDraft(formatValue(parsed, locale));
    updateValue(parsed);
  }

  function showCalendar() {
    if (disabled || readOnly) return;
    const next = selectedDate ?? today;
    setViewDate(new Date(next.getFullYear(), next.getMonth(), 1));
    const nextTime = getTime(selectedValue);
    setHour(nextTime.hour);
    setMinute(nextTime.minute);
    setSecond(nextTime.second);
    setOpen(true);
  }

  function selectDate(date: Date) {
    if (unavailable(date)) return;
    const nextValue = toValue(date, includeTime, hour, minute, second);
    updateValue(nextValue);
    setDraft(formatValue(nextValue, locale));
    setInputInvalid(false);
    if (!includeTime) setOpen(false);
  }

  function updateTime(nextHour: number, nextMinute: number, nextSecond: number) {
    const normalizedHour = (nextHour + 24) % 24;
    const normalizedMinute = (nextMinute + 60) % 60;
    const normalizedSecond = (nextSecond + 60) % 60;
    setHour(normalizedHour);
    setMinute(normalizedMinute);
    setSecond(normalizedSecond);
    if (!selectedDate) return;
    const nextValue = toValue(
      selectedDate,
      true,
      normalizedHour,
      normalizedMinute,
      normalizedSecond,
    );
    updateValue(nextValue);
    setDraft(formatValue(nextValue, locale));
    setInputInvalid(false);
  }

  return (
    <View style={[styles.root, style]} testID={testID}>
      <Text
        nativeID={testID ? `${testID}-label` : undefined}
        style={[styles.label, { color: colors.foreground, fontFamily: tokens.fontFamily.sansSemibold }]}
      >
        {label}
        {required ? " *" : ""}
      </Text>
      <View style={styles.field}>
        <TextInput
          accessibilityLabel={label}
          accessibilityState={{ disabled }}
          editable={!disabled && !readOnly}
          value={draft}
          placeholder={placeholder ?? (includeTime ? "Selecione data e hora" : "Selecione uma data")}
          placeholderTextColor={colors.mutedForeground}
          keyboardType="numbers-and-punctuation"
          returnKeyType="done"
          onChangeText={(next) => {
            setDraft(next);
            setInputInvalid(false);
          }}
          onBlur={commitDraft}
          onSubmitEditing={commitDraft}
          style={[
            styles.trigger,
            {
              backgroundColor: colors.surface,
              borderColor: invalid || inputInvalid || error ? colors.danger : colors.border,
              color: colors.foreground,
              fontFamily: tokens.fontFamily.sans,
              minHeight: heightBySize[size],
              opacity: disabled ? 0.5 : 1,
            },
          ]}
        />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Abrir calendário para ${label}`}
          accessibilityHint={accessibilityHint}
          accessibilityState={{ disabled }}
          disabled={disabled}
          onPress={showCalendar}
          style={styles.calendarButton}
        >
          <CalendarIcon aria-hidden size={17} color={colors.mutedForeground} />
        </Pressable>
        {clearable && selectedValue && !disabled && !readOnly ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Limpar data"
            hitSlop={6}
            onPress={() => updateValue(null)}
            style={styles.clear}
          >
            <XIcon aria-hidden size={15} color={colors.mutedForeground} />
          </Pressable>
        ) : null}
      </View>
      {description ? (
        <Text style={[styles.supporting, { color: colors.mutedForeground, fontFamily: tokens.fontFamily.sans }]}>
          {description}
        </Text>
      ) : null}
      {error || inputInvalid ? (
        <Text
          accessibilityLiveRegion="polite"
          style={[styles.supporting, { color: colors.danger, fontFamily: tokens.fontFamily.sansMedium }]}
        >
          {error ?? invalidInputMessage}
        </Text>
      ) : null}
      <Modal
        transparent
        visible={open}
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <View style={styles.overlay}>
          <Pressable
            accessibilityLabel="Fechar calendário"
            style={StyleSheet.absoluteFill}
            onPress={() => setOpen(false)}
          />
          <View
            accessibilityViewIsModal
            style={[
              styles.dialog,
              { backgroundColor: colors.surfaceRaised, borderColor: colors.borderStrong },
            ]}
          >
            <View style={styles.header}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Ano anterior"
                onPress={() => setViewDate((current) => addMonths(current, -12))}
                style={styles.iconButton}
              >
                <ChevronLeftIcon aria-hidden size={18} color={colors.foreground} />
              </Pressable>
              <Text
                accessibilityRole="header"
                style={[styles.month, { color: colors.foreground, fontFamily: tokens.fontFamily.sansSemibold }]}
              >
                {viewDate.getFullYear()}
              </Text>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Próximo ano"
                onPress={() => setViewDate((current) => addMonths(current, 12))}
                style={styles.iconButton}
              >
                <ChevronRightIcon aria-hidden size={18} color={colors.foreground} />
              </Pressable>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.monthList}
              accessibilityLabel="Escolher mês"
            >
              {monthOptions.map(({ month, label: optionLabel, fullLabel }) => {
                const selected = month === viewDate.getMonth();
                return (
                  <Pressable
                    key={month}
                    accessibilityRole="button"
                    accessibilityLabel={fullLabel}
                    accessibilityState={{ selected }}
                    onPress={() =>
                      setViewDate(new Date(viewDate.getFullYear(), month, 1))
                    }
                    style={[
                      styles.monthOption,
                      {
                        backgroundColor: selected ? colors.primary : colors.surface,
                        borderColor: selected ? colors.primary : colors.border,
                      },
                    ]}
                  >
                    <Text
                      style={{
                        color: selected ? colors.primaryForeground : colors.foreground,
                        fontFamily: selected
                          ? tokens.fontFamily.sansSemibold
                          : tokens.fontFamily.sans,
                        fontSize: tokens.fontSize.xs,
                        textTransform: "capitalize",
                      }}
                    >
                      {optionLabel}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
            <View style={styles.week}>
              {weekdays.map((weekday, index) => (
                <Text
                  key={`${weekday}-${index}`}
                  style={[styles.weekday, { color: colors.mutedForeground, fontFamily: tokens.fontFamily.sansMedium }]}
                >
                  {weekday}
                </Text>
              ))}
            </View>
            {Array.from({ length: 6 }, (_, week) => (
              <View style={styles.week} key={week}>
                {days.slice(week * 7, week * 7 + 7).map((date) => {
                  const dateValue = toISO(date);
                  const selected = Boolean(selectedDate && toISO(selectedDate) === dateValue);
                  const outside = date.getMonth() !== viewDate.getMonth();
                  const blocked = unavailable(date);
                  return (
                    <Pressable
                      key={dateValue}
                      accessibilityRole="button"
                      accessibilityLabel={fullDateFormatter.format(date)}
                      accessibilityState={{ selected, disabled: blocked }}
                      disabled={blocked}
                      onPress={() => selectDate(date)}
                      style={[
                        styles.day,
                        selected && { backgroundColor: colors.primary },
                        toISO(today) === dateValue && !selected && { borderColor: colors.primary },
                        blocked && styles.blocked,
                      ]}
                    >
                      <Text
                        style={{
                          color: selected
                            ? colors.primaryForeground
                            : outside
                              ? colors.mutedForeground
                              : colors.foreground,
                          fontFamily: selected
                            ? tokens.fontFamily.sansSemibold
                            : tokens.fontFamily.sans,
                          fontSize: tokens.fontSize.xs,
                        }}
                      >
                        {date.getDate()}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            ))}
            {includeTime ? (
              <Time
                label="Horário"
                value={`${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:${String(second).padStart(2, "0")}`}
                onValueChange={(nextTime) => {
                  const [nextHour, nextMinute, nextSecond] = nextTime.split(":").map(Number);
                  updateTime(nextHour, nextMinute, nextSecond);
                }}
                minuteStep={minuteStep}
                secondStep={secondStep}
                size="sm"
                style={[styles.time, { borderTopColor: colors.border }]}
              />
            ) : null}
            <View style={[styles.footer, { borderTopColor: colors.border }]}>
              <Pressable
                accessibilityRole="button"
                disabled={unavailable(today)}
                onPress={() => selectDate(today)}
                style={styles.footerButton}
              >
                <Text style={{ color: colors.primary, fontFamily: tokens.fontFamily.sansMedium }}>
                  Hoje
                </Text>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                onPress={() => setOpen(false)}
                style={[styles.footerButton, { borderColor: colors.border }]}
              >
                <Text style={{ color: colors.foreground, fontFamily: tokens.fontFamily.sansMedium }}>
                  {includeTime ? "Aplicar" : "Fechar"}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { gap: tokens.spacing[1], maxWidth: 320, width: "100%" },
  label: { fontSize: tokens.fontSize.sm, lineHeight: 19 },
  field: { position: "relative" },
  trigger: {
    borderRadius: tokens.radius.md,
    borderWidth: 1,
    fontSize: tokens.fontSize.sm,
    paddingLeft: tokens.spacing[3],
    paddingRight: 88,
  },
  calendarButton: {
    alignItems: "center",
    height: 44,
    justifyContent: "center",
    position: "absolute",
    right: 0,
    top: 0,
    width: 44,
  },
  clear: {
    alignItems: "center",
    height: 44,
    justifyContent: "center",
    position: "absolute",
    right: 44,
    top: 0,
    width: 44,
  },
  supporting: { fontSize: tokens.fontSize.xs, lineHeight: 17 },
  overlay: {
    alignItems: "center",
    backgroundColor: "rgba(8, 9, 16, 0.82)",
    flex: 1,
    justifyContent: "center",
    padding: tokens.spacing[4],
  },
  dialog: {
    borderRadius: tokens.radius.lg,
    borderWidth: 1,
    maxWidth: 352,
    padding: tokens.spacing[3],
    width: "100%",
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: tokens.spacing[2],
  },
  iconButton: { alignItems: "center", height: 44, justifyContent: "center", width: 44 },
  month: { flex: 1, fontSize: tokens.fontSize.sm, textAlign: "center", textTransform: "capitalize" },
  monthList: { gap: tokens.spacing[1], paddingBottom: tokens.spacing[2] },
  monthOption: {
    alignItems: "center",
    borderRadius: tokens.radius.sm,
    borderWidth: 1,
    justifyContent: "center",
    minHeight: 44,
    minWidth: 52,
    paddingHorizontal: tokens.spacing[2],
  },
  week: { flexDirection: "row" },
  weekday: {
    fontSize: tokens.fontSize.xs,
    lineHeight: 32,
    textAlign: "center",
    width: `${100 / 7}%`,
  },
  day: {
    alignItems: "center",
    borderColor: "transparent",
    borderRadius: tokens.radius.sm,
    borderWidth: 1,
    height: 44,
    justifyContent: "center",
    width: `${100 / 7}%`,
  },
  blocked: { opacity: 0.32 },
  time: {
    borderTopWidth: 1,
    marginTop: tokens.spacing[2],
    paddingTop: tokens.spacing[2],
  },
  footer: {
    alignItems: "center",
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: tokens.spacing[2],
    paddingTop: tokens.spacing[2],
  },
  footerButton: {
    alignItems: "center",
    borderRadius: tokens.radius.sm,
    borderWidth: 1,
    minHeight: 44,
    justifyContent: "center",
    paddingHorizontal: tokens.spacing[3],
  },
});
