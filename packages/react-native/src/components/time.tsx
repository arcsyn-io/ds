import { useEffect, useState, type ReactNode } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { tokens, useArcSynTheme } from "../theme.js";

export type TimeSize = "sm" | "md" | "lg";

export interface TimeProps {
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string) => void;
  label: string;
  description?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  includeSeconds?: boolean;
  minuteStep?: number;
  secondStep?: number;
  size?: TimeSize;
  accessibilityHint?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
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

interface TimeSegmentProps {
  label: string;
  value: number;
  step: number;
  limit: number;
  disabled: boolean;
  onChange: (value: number) => void;
}

function TimeSegment({
  label,
  value,
  step,
  limit,
  disabled,
  onChange,
}: TimeSegmentProps) {
  const { colors } = useArcSynTheme();
  const changeBy = (amount: number) => onChange((value + amount + limit) % limit);

  return (
    <View style={styles.segment}>
      <Text
        style={[
          styles.segmentLabel,
          { color: colors.mutedForeground, fontFamily: tokens.fontFamily.sans },
        ]}
      >
        {label}
      </Text>
      <View style={[styles.stepper, { borderColor: colors.border }]}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Diminuir ${label.toLowerCase()}`}
          accessibilityState={{ disabled }}
          disabled={disabled}
          onPress={() => changeBy(-step)}
          style={styles.stepButton}
        >
          <Text style={{ color: colors.foreground, fontSize: tokens.fontSize.md }}>−</Text>
        </Pressable>
        <Text
          accessibilityLabel={`${label} ${String(value).padStart(2, "0")}`}
          style={[
            styles.value,
            { color: colors.foreground, fontFamily: tokens.fontFamily.mono },
          ]}
        >
          {String(value).padStart(2, "0")}
        </Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Aumentar ${label.toLowerCase()}`}
          accessibilityState={{ disabled }}
          disabled={disabled}
          onPress={() => changeBy(step)}
          style={styles.stepButton}
        >
          <Text style={{ color: colors.foreground, fontSize: tokens.fontSize.md }}>+</Text>
        </Pressable>
      </View>
    </View>
  );
}

const minHeightBySize: Record<TimeSize, number> = { sm: 44, md: 44, lg: 48 };

export function Time({
  value,
  defaultValue = null,
  onValueChange,
  label,
  description,
  error,
  required = false,
  disabled = false,
  readOnly = false,
  invalid = false,
  includeSeconds = true,
  minuteStep = 1,
  secondStep = 1,
  size = "md",
  accessibilityHint,
  style,
  testID,
}: TimeProps) {
  const { colors } = useArcSynTheme();
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const selectedValue = isControlled ? value : internalValue;
  const parts = parseTime(selectedValue);
  const [currentParts, setCurrentParts] = useState(parts);
  const interactionDisabled = disabled || readOnly;

  useEffect(() => {
    setCurrentParts(parseTime(selectedValue));
  }, [selectedValue]);

  function updatePart(next: Partial<typeof parts>) {
    if (interactionDisabled) return;
    const nextValue = toTime(
      next.hour ?? currentParts.hour,
      next.minute ?? currentParts.minute,
      next.second ?? currentParts.second,
    );
    setCurrentParts(parseTime(nextValue));
    if (!isControlled) setInternalValue(nextValue);
    onValueChange?.(nextValue);
  }

  return (
    <View style={[styles.root, style]} testID={testID}>
      <Text
        nativeID={testID ? `${testID}-label` : undefined}
        style={[
          styles.label,
          { color: colors.foreground, fontFamily: tokens.fontFamily.sansSemibold },
        ]}
      >
        {label}
        {required ? " *" : ""}
      </Text>
      <View
        accessible
        accessibilityLabel={label}
        accessibilityHint={accessibilityHint}
        accessibilityState={{ disabled: disabled || readOnly }}
        style={[
          styles.control,
          {
            backgroundColor: readOnly ? colors.muted : colors.surface,
            borderColor: invalid || error ? colors.danger : colors.border,
            minHeight: minHeightBySize[size],
            opacity: disabled ? 0.5 : 1,
          },
        ]}
      >
        <TimeSegment
          label="Hora"
          value={currentParts.hour}
          step={1}
          limit={24}
          disabled={interactionDisabled}
          onChange={(hour) => updatePart({ hour })}
        />
        <Text style={[styles.separator, { color: colors.mutedForeground }]}>:</Text>
        <TimeSegment
          label="Minuto"
          value={currentParts.minute}
          step={normalizeStep(minuteStep)}
          limit={60}
          disabled={interactionDisabled}
          onChange={(minute) => updatePart({ minute })}
        />
        {includeSeconds ? (
          <>
            <Text style={[styles.separator, { color: colors.mutedForeground }]}>:</Text>
            <TimeSegment
              label="Segundo"
              value={currentParts.second}
              step={normalizeStep(secondStep)}
              limit={60}
              disabled={interactionDisabled}
              onChange={(second) => updatePart({ second })}
            />
          </>
        ) : null}
      </View>
      {description ? (
        <Text
          style={[
            styles.supporting,
            { color: colors.mutedForeground, fontFamily: tokens.fontFamily.sans },
          ]}
        >
          {description}
        </Text>
      ) : null}
      {error ? (
        <Text
          accessibilityLiveRegion="polite"
          style={[
            styles.supporting,
            { color: colors.danger, fontFamily: tokens.fontFamily.sansMedium },
          ]}
        >
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { gap: tokens.spacing[1], maxWidth: 352, width: "100%" },
  label: { fontSize: tokens.fontSize.sm, lineHeight: 19 },
  control: {
    alignItems: "stretch",
    borderRadius: tokens.radius.md,
    borderWidth: 1,
    flexDirection: "row",
    gap: tokens.spacing[1],
    padding: tokens.spacing[2],
  },
  segment: { flex: 1, gap: tokens.spacing[1] },
  segmentLabel: { fontSize: tokens.fontSize.xs, textAlign: "center" },
  stepper: {
    alignItems: "center",
    borderRadius: tokens.radius.sm,
    borderWidth: 1,
    minHeight: 132,
  },
  stepButton: {
    alignItems: "center",
    height: 44,
    justifyContent: "center",
    width: "100%",
  },
  value: {
    fontSize: tokens.fontSize.sm,
    lineHeight: 44,
    textAlign: "center",
    width: "100%",
  },
  separator: {
    alignSelf: "center",
    fontSize: tokens.fontSize.md,
    lineHeight: 44,
    paddingTop: 20,
  },
  supporting: { fontSize: tokens.fontSize.xs, lineHeight: 17 },
});
