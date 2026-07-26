import { useMemo, useState, type ReactNode } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
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
  size?: DatePickerSize;
  firstDayOfWeek?: 0 | 1;
  isDateUnavailable?: (value: string) => boolean;
  formatValue?: (value: string, locale: string) => string;
  accessibilityHint?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
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
  return `${String(date.getFullYear()).padStart(4, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function addDays(date: Date, amount: number) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount);
}

function addMonths(date: Date, amount: number) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

function defaultFormatValue(value: string, locale: string) {
  const date = fromISO(value);
  return date
    ? new Intl.DateTimeFormat(locale, { day: "2-digit", month: "2-digit", year: "numeric" }).format(date)
    : value;
}

const heightBySize: Record<DatePickerSize, number> = { sm: 44, md: 44, lg: 48 };

export function DatePicker({
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
  disabled = false,
  readOnly = false,
  invalid = false,
  required = false,
  clearable = true,
  size = "md",
  firstDayOfWeek = 0,
  isDateUnavailable,
  formatValue = defaultFormatValue,
  accessibilityHint = "Abre o calendário para escolher uma data",
  style,
  testID,
}: DatePickerProps) {
  const { colors } = useArcSynTheme();
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const selectedValue = isControlled ? value : internalValue;
  const selectedDate = fromISO(selectedValue);
  const today = new Date();
  const [open, setOpen] = useState(false);
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

  function showCalendar() {
    if (disabled || readOnly) return;
    const next = selectedDate ?? today;
    setViewDate(new Date(next.getFullYear(), next.getMonth(), 1));
    setOpen(true);
  }

  function selectDate(date: Date) {
    if (unavailable(date)) return;
    updateValue(toISO(date));
    setOpen(false);
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
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={label}
          accessibilityHint={accessibilityHint}
          accessibilityState={{ disabled }}
          onPress={showCalendar}
          style={({ pressed }) => [
            styles.trigger,
            {
              backgroundColor: colors.surface,
              borderColor: invalid || error ? colors.danger : colors.border,
              minHeight: heightBySize[size],
              opacity: disabled ? 0.5 : pressed ? 0.82 : 1,
            },
          ]}
        >
          <CalendarIcon aria-hidden size={17} color={colors.mutedForeground} />
          <Text
            numberOfLines={1}
            style={[
              styles.value,
              {
                color: selectedValue ? colors.foreground : colors.mutedForeground,
                fontFamily: tokens.fontFamily.sans,
              },
            ]}
          >
            {selectedValue ? formatValue(selectedValue, locale) : placeholder}
          </Text>
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
      {error ? (
        <Text
          accessibilityLiveRegion="polite"
          style={[styles.supporting, { color: colors.danger, fontFamily: tokens.fontFamily.sansMedium }]}
        >
          {error}
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
                accessibilityLabel="Mês anterior"
                onPress={() => setViewDate((current) => addMonths(current, -1))}
                style={styles.iconButton}
              >
                <ChevronLeftIcon aria-hidden size={18} color={colors.foreground} />
              </Pressable>
              <Text
                accessibilityRole="header"
                style={[styles.month, { color: colors.foreground, fontFamily: tokens.fontFamily.sansSemibold }]}
              >
                {monthLabel}
              </Text>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Próximo mês"
                onPress={() => setViewDate((current) => addMonths(current, 1))}
                style={styles.iconButton}
              >
                <ChevronRightIcon aria-hidden size={18} color={colors.foreground} />
              </Pressable>
            </View>
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
                  const selected = selectedValue === dateValue;
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
                  Fechar
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
    alignItems: "center",
    borderRadius: tokens.radius.md,
    borderWidth: 1,
    flexDirection: "row",
    gap: tokens.spacing[2],
    paddingLeft: tokens.spacing[3],
    paddingRight: 44,
  },
  value: { flex: 1, fontSize: tokens.fontSize.sm },
  clear: {
    alignItems: "center",
    height: 44,
    justifyContent: "center",
    position: "absolute",
    right: 0,
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
