import {
  createContext,
  forwardRef,
  useContext,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  View,
  type LayoutChangeEvent,
  type PressableProps,
  type TextProps,
  type ViewProps,
} from "react-native";
import { tokens, useArcSynTheme } from "../theme.js";

export type SliderSize = "sm" | "md" | "lg";
export type SliderValueType = number | readonly number[];

interface SliderContextValue {
  commit: () => void;
  disabled: boolean;
  invalid: boolean;
  labelId: string;
  largeStep: number;
  max: number;
  min: number;
  orientation: "horizontal" | "vertical";
  readOnly: boolean;
  setValueAt: (index: number, value: number, commit?: boolean) => void;
  size: SliderSize;
  values: readonly number[];
}

const SliderContext = createContext<SliderContextValue | null>(null);

function useSliderContext(part: string) {
  const context = useContext(SliderContext);
  if (!context) throw new Error(`Slider.${part} must be used inside Slider.Root.`);
  return context;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function toArray(value: SliderValueType | undefined, fallback: number) {
  return Array.isArray(value) ? [...value] : [typeof value === "number" ? value : fallback];
}

export interface SliderRootProps extends ViewProps {
  value?: SliderValueType;
  defaultValue?: SliderValueType;
  onValueChange?: (value: SliderValueType) => void;
  onValueCommitted?: (value: SliderValueType) => void;
  min?: number;
  max?: number;
  step?: number;
  largeStep?: number;
  minStepsBetweenValues?: number;
  orientation?: "horizontal" | "vertical";
  size?: SliderSize;
  disabled?: boolean;
  invalid?: boolean;
  readOnly?: boolean;
}

export const SliderRoot = forwardRef<View, SliderRootProps>(function SliderRoot(
  {
    value,
    defaultValue,
    onValueChange,
    onValueCommitted,
    min = 0,
    max = 100,
    step = 1,
    largeStep = 10,
    minStepsBetweenValues = 0,
    orientation = "horizontal",
    size = "md",
    disabled = false,
    invalid = false,
    readOnly = false,
    style,
    ...props
  },
  ref,
) {
  const isRange = Array.isArray(value ?? defaultValue);
  const [internalValues, setInternalValues] = useState(() => toArray(defaultValue, min));
  const values = (value === undefined ? internalValues : toArray(value, min)).map((item) => clamp(item, min, max));
  const valuesRef = useRef(values);
  valuesRef.current = values;
  const labelId = `arcsyn-slider-${useId().replace(/:/g, "")}-label`;
  const safeStep = step > 0 ? step : 1;

  function publicValue(nextValues: readonly number[]): SliderValueType {
    return isRange ? nextValues : nextValues[0] ?? min;
  }

  function normalizeAt(index: number, nextValue: number) {
    const stepped = Math.round((nextValue - min) / safeStep) * safeStep + min;
    const gap = minStepsBetweenValues * safeStep;
    const lower = index > 0 ? (valuesRef.current[index - 1] ?? min) + gap : min;
    const upper = index < valuesRef.current.length - 1 ? (valuesRef.current[index + 1] ?? max) - gap : max;
    return clamp(stepped, lower, upper);
  }

  function setValueAt(index: number, nextValue: number, shouldCommit = false) {
    if (disabled || readOnly) return;
    const nextValues = [...valuesRef.current];
    nextValues[index] = normalizeAt(index, nextValue);
    valuesRef.current = nextValues;
    if (value === undefined) setInternalValues(nextValues);
    onValueChange?.(publicValue(nextValues));
    if (shouldCommit) onValueCommitted?.(publicValue(nextValues));
  }

  function commit() {
    onValueCommitted?.(publicValue(valuesRef.current));
  }

  const context: SliderContextValue = {
    commit,
    disabled,
    invalid,
    labelId,
    largeStep,
    max,
    min,
    orientation,
    readOnly,
    setValueAt,
    size,
    values,
  };

  return (
    <SliderContext.Provider value={context}>
      <View
        ref={ref}
        style={[styles.root, orientation === "vertical" && styles.verticalRoot, disabled && styles.disabled, style]}
        {...props}
      />
    </SliderContext.Provider>
  );
});

export type SliderLabelProps = TextProps;

export const SliderLabel = forwardRef<Text, SliderLabelProps>(function SliderLabel({ nativeID, style, ...props }, ref) {
  const { colors } = useArcSynTheme();
  const context = useSliderContext("Label");
  return <Text ref={ref} nativeID={nativeID ?? context.labelId} style={[styles.label, { color: colors.foreground, fontFamily: tokens.fontFamily.sansMedium }, style]} {...props} />;
});

export interface SliderValueProps extends Omit<TextProps, "children"> {
  children?: ReactNode | ((formattedValues: readonly string[], values: readonly number[]) => ReactNode);
  format?: (value: number) => string;
}

export const SliderValue = forwardRef<Text, SliderValueProps>(function SliderValue(
  { children, format = (value) => String(value), style, ...props },
  ref,
) {
  const { colors } = useArcSynTheme();
  const context = useSliderContext("Value");
  const formatted = context.values.map(format);
  const content = typeof children === "function" ? children(formatted, context.values) : children ?? formatted.join(" – ");
  return <Text ref={ref} style={[styles.value, { color: colors.mutedForeground, fontFamily: tokens.fontFamily.mono }, style]} {...props}>{content}</Text>;
});

export type SliderControlProps = ViewProps;

export const SliderControl = forwardRef<View, SliderControlProps>(function SliderControl(
  { onLayout, style, children, ...props },
  ref,
) {
  const context = useSliderContext("Control");
  const lengthRef = useRef(1);
  const activeIndexRef = useRef(0);

  function valueFromLocation(locationX: number, locationY: number) {
    const ratio = context.orientation === "horizontal"
      ? locationX / lengthRef.current
      : 1 - locationY / lengthRef.current;
    return context.min + clamp(ratio, 0, 1) * (context.max - context.min);
  }

  function closestThumb(nextValue: number) {
    return context.values.reduce((closest, item, index) => (
      Math.abs(item - nextValue) < Math.abs((context.values[closest] ?? context.min) - nextValue) ? index : closest
    ), 0);
  }

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => !context.disabled && !context.readOnly,
    onMoveShouldSetPanResponder: () => !context.disabled && !context.readOnly,
    onPanResponderGrant: (event) => {
      const nextValue = valueFromLocation(event.nativeEvent.locationX, event.nativeEvent.locationY);
      activeIndexRef.current = closestThumb(nextValue);
      context.setValueAt(activeIndexRef.current, nextValue);
    },
    onPanResponderMove: (event) => {
      context.setValueAt(activeIndexRef.current, valueFromLocation(event.nativeEvent.locationX, event.nativeEvent.locationY));
    },
    onPanResponderRelease: context.commit,
    onPanResponderTerminate: context.commit,
  });

  function handleLayout(event: LayoutChangeEvent) {
    lengthRef.current = context.orientation === "horizontal"
      ? event.nativeEvent.layout.width
      : event.nativeEvent.layout.height;
    onLayout?.(event);
  }

  return (
    <View
      ref={ref}
      onLayout={handleLayout}
      style={[styles.control, context.orientation === "vertical" ? styles.verticalControl : styles.horizontalControl, style]}
      {...panResponder.panHandlers}
      {...props}
    >
      {children}
    </View>
  );
});

export type SliderTrackProps = ViewProps;

export const SliderTrack = forwardRef<View, SliderTrackProps>(function SliderTrack({ style, ...props }, ref) {
  const { colors } = useArcSynTheme();
  const context = useSliderContext("Track");
  const thickness = context.size === "sm" ? 4 : context.size === "lg" ? 8 : 6;
  return (
    <View
      ref={ref}
      style={[
        styles.track,
        { pointerEvents: "none" },
        {
          backgroundColor: colors.muted,
          borderColor: context.invalid ? colors.danger : colors.border,
          height: context.orientation === "horizontal" ? thickness : "100%",
          width: context.orientation === "vertical" ? thickness : "100%",
        },
        style,
      ]}
      {...props}
    />
  );
});

export type SliderIndicatorProps = ViewProps;

export const SliderIndicator = forwardRef<View, SliderIndicatorProps>(function SliderIndicator({ style, ...props }, ref) {
  const { colors } = useArcSynTheme();
  const context = useSliderContext("Indicator");
  const range = context.max - context.min || 1;
  const first = ((context.values[0] ?? context.min) - context.min) / range * 100;
  const last = ((context.values.at(-1) ?? context.min) - context.min) / range * 100;
  const isRange = context.values.length > 1;
  const start = isRange ? first : 0;
  const extent = Math.max(0, last - start);
  return (
    <View
      ref={ref}
      style={[
        styles.indicator,
        { pointerEvents: "none" },
        {
          backgroundColor: context.invalid ? colors.danger : colors.primary,
          bottom: context.orientation === "vertical" ? `${start}%` : undefined,
          height: context.orientation === "vertical" ? `${isRange ? extent : last}%` : "100%",
          left: context.orientation === "horizontal" ? `${start}%` : undefined,
          width: context.orientation === "horizontal" ? `${isRange ? extent : last}%` : "100%",
        },
        style,
      ]}
      {...props}
    />
  );
});

export interface SliderThumbProps extends Omit<PressableProps, "children"> {
  index?: number;
  label?: string;
  getAccessibilityLabel?: (index: number) => string;
  getAccessibilityValueText?: (value: number, index: number) => string;
}

export const SliderThumb = forwardRef<View, SliderThumbProps>(function SliderThumb(
  { index = 0, label, getAccessibilityLabel, getAccessibilityValueText, style, ...props },
  ref,
) {
  const { colors } = useArcSynTheme();
  const context = useSliderContext("Thumb");
  const value = context.values[index] ?? context.min;
  const percentage = (value - context.min) / (context.max - context.min || 1) * 100;
  const visualSize = context.size === "sm" ? 14 : context.size === "lg" ? 20 : 16;
  const accessibleLabel = label ?? getAccessibilityLabel?.(index);
  return (
    <Pressable
      ref={ref}
      accessibilityActions={[{ name: "increment" }, { name: "decrement" }]}
      accessibilityHint={context.readOnly ? "Somente leitura" : undefined}
      accessibilityLabel={accessibleLabel}
      accessibilityLabelledBy={!accessibleLabel ? context.labelId : undefined}
      accessibilityRole="adjustable"
      accessibilityState={{ disabled: context.disabled }}
      accessibilityValue={{
        min: context.min,
        max: context.max,
        now: value,
        text: getAccessibilityValueText?.(value, index),
      }}
      disabled={context.disabled}
      onAccessibilityAction={(event) => {
        if (event.nativeEvent.actionName === "increment") context.setValueAt(index, value + context.largeStep, true);
        if (event.nativeEvent.actionName === "decrement") context.setValueAt(index, value - context.largeStep, true);
      }}
      style={(state) => [
        styles.thumbTarget,
        context.orientation === "horizontal"
          ? { left: `${percentage}%`, transform: [{ translateX: -22 }] }
          : { bottom: `${percentage}%`, transform: [{ translateY: 22 }] },
        typeof style === "function" ? style(state) : style,
      ]}
      {...props}
    >
      <View
        style={[
          styles.thumb,
          { pointerEvents: "none" },
          {
            backgroundColor: colors.surfaceRaised,
            borderColor: context.invalid ? colors.danger : colors.primary,
            height: visualSize,
            width: visualSize,
          },
        ]}
      />
    </Pressable>
  );
});

export interface SliderMark {
  value: number;
  label?: ReactNode;
}

export interface SliderMarksProps extends ViewProps {
  marks: readonly (number | SliderMark)[];
}

export function SliderMarks({ marks, style, ...props }: SliderMarksProps) {
  const { colors } = useArcSynTheme();
  const context = useSliderContext("Marks");
  const range = context.max - context.min || 1;
  return (
    <View style={[StyleSheet.absoluteFill, { pointerEvents: "none" }, style]} {...props}>
      {marks.map((mark) => {
        const item = typeof mark === "number" ? { value: mark } : mark;
        const percentage = clamp((item.value - context.min) / range * 100, 0, 100);
        return (
          <View
            key={item.value}
            style={[
              styles.mark,
              context.orientation === "horizontal"
                ? { left: `${percentage}%`, transform: [{ translateX: -2 }] }
                : { bottom: `${percentage}%`, transform: [{ translateY: 2 }] },
            ]}
          >
            <View style={[styles.markDot, { backgroundColor: colors.borderStrong }]} />
            {item.label !== undefined ? <Text style={[styles.markLabel, { color: colors.mutedForeground, fontFamily: tokens.fontFamily.mono }]}>{item.label}</Text> : null}
          </View>
        );
      })}
    </View>
  );
}

export const Slider = {
  Root: SliderRoot,
  Label: SliderLabel,
  Value: SliderValue,
  Control: SliderControl,
  Track: SliderTrack,
  Indicator: SliderIndicator,
  Thumb: SliderThumb,
  Marks: SliderMarks,
};

const styles = StyleSheet.create({
  root: { gap: tokens.spacing[2], width: "100%" },
  verticalRoot: { height: 224, width: 72 },
  disabled: { opacity: 0.5 },
  label: { fontSize: tokens.fontSize.sm },
  value: { fontSize: tokens.fontSize.xs },
  control: { alignItems: "center", justifyContent: "center", position: "relative" },
  horizontalControl: { height: 44, width: "100%" },
  verticalControl: { height: "100%", width: 44 },
  track: { borderRadius: tokens.radius.full, borderWidth: 1, overflow: "hidden", position: "relative" },
  indicator: { borderRadius: tokens.radius.full, position: "absolute" },
  thumbTarget: { alignItems: "center", height: 44, justifyContent: "center", position: "absolute", width: 44 },
  thumb: { borderRadius: tokens.radius.full, borderWidth: 2 },
  mark: { position: "absolute" },
  markDot: { borderRadius: tokens.radius.full, height: 4, width: 4 },
  markLabel: { fontSize: tokens.fontSize.xs, left: -8, marginTop: 8, position: "absolute" },
});
