import { Slider as BaseSlider } from "@base-ui/react/slider";
import {
  createContext,
  forwardRef,
  useEffect,
  useContext,
  useMemo,
  useRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import { cx } from "../../utilities/cx.js";

export type SliderSize = "sm" | "md" | "lg";
export type SliderValueType = number | readonly number[];

interface SliderContextValue {
  disabled: boolean;
  invalid: boolean;
  max: number;
  min: number;
  orientation: "horizontal" | "vertical";
  readOnly: boolean;
  size: SliderSize;
}

const SliderContext = createContext<SliderContextValue | null>(null);

function useSliderContext(part: string) {
  const context = useContext(SliderContext);
  if (!context) throw new Error(`Slider.${part} must be used inside Slider.Root.`);
  return context;
}

function componentClassName<State>(
  baseClassName: string,
  className: string | ((state: State) => string | undefined) | undefined,
) {
  return typeof className === "function"
    ? (state: State) => cx(baseClassName, className(state))
    : cx(baseClassName, className);
}

type BaseSliderRootProps = ComponentPropsWithoutRef<typeof BaseSlider.Root>;

export interface SliderRootProps extends Omit<BaseSliderRootProps, "defaultValue" | "value"> {
  value?: SliderValueType;
  defaultValue?: SliderValueType;
  size?: SliderSize;
  invalid?: boolean;
  readOnly?: boolean;
}

export const SliderRoot = forwardRef<HTMLDivElement, SliderRootProps>(function SliderRoot(
  {
    className,
    children,
    value,
    defaultValue,
    size = "md",
    invalid = false,
    readOnly = false,
    disabled = false,
    min = 0,
    max = 100,
    orientation = "horizontal",
    onValueChange,
    onValueCommitted,
    ...props
  },
  ref,
) {
  const context = useMemo<SliderContextValue>(() => ({
    disabled,
    invalid,
    max,
    min,
    orientation,
    readOnly,
    size,
  }), [disabled, invalid, max, min, orientation, readOnly, size]);
  const fixedReadOnlyValue = value ?? defaultValue ?? min;

  return (
    <SliderContext.Provider value={context}>
      <BaseSlider.Root
        ref={ref}
        className={componentClassName("arcsyn-slider", className)}
        data-disabled={disabled || undefined}
        data-invalid={invalid || undefined}
        data-readonly={readOnly || undefined}
        data-size={size}
        disabled={disabled}
        min={min}
        max={max}
        orientation={orientation}
        value={readOnly ? fixedReadOnlyValue : value}
        defaultValue={readOnly ? undefined : defaultValue}
        onValueChange={readOnly ? undefined : onValueChange}
        onValueCommitted={readOnly ? undefined : onValueCommitted}
        {...props}
      >
        {children}
      </BaseSlider.Root>
    </SliderContext.Provider>
  );
});

export type SliderLabelProps = ComponentPropsWithoutRef<typeof BaseSlider.Label>;

export const SliderLabel = forwardRef<HTMLDivElement, SliderLabelProps>(function SliderLabel({ className, ...props }, ref) {
  return <BaseSlider.Label ref={ref} className={componentClassName("arcsyn-slider__label", className)} {...props} />;
});

export type SliderValueProps = ComponentPropsWithoutRef<typeof BaseSlider.Value>;

export const SliderValue = forwardRef<HTMLOutputElement, SliderValueProps>(function SliderValue({ className, ...props }, ref) {
  return <BaseSlider.Value ref={ref} className={componentClassName("arcsyn-slider__value", className)} {...props} />;
});

export type SliderControlProps = ComponentPropsWithoutRef<typeof BaseSlider.Control>;

export const SliderControl = forwardRef<HTMLDivElement, SliderControlProps>(function SliderControl({ className, ...props }, ref) {
  const context = useSliderContext("Control");
  return <BaseSlider.Control ref={ref} className={componentClassName("arcsyn-slider__control", className)} data-orientation={context.orientation} data-size={context.size} {...props} />;
});

export type SliderTrackProps = ComponentPropsWithoutRef<typeof BaseSlider.Track>;

export const SliderTrack = forwardRef<HTMLDivElement, SliderTrackProps>(function SliderTrack({ className, ...props }, ref) {
  const context = useSliderContext("Track");
  return <BaseSlider.Track ref={ref} className={componentClassName("arcsyn-slider__track", className)} data-orientation={context.orientation} data-size={context.size} {...props} />;
});

export type SliderIndicatorProps = ComponentPropsWithoutRef<typeof BaseSlider.Indicator>;

export const SliderIndicator = forwardRef<HTMLDivElement, SliderIndicatorProps>(function SliderIndicator({ className, ...props }, ref) {
  return <BaseSlider.Indicator ref={ref} className={componentClassName("arcsyn-slider__indicator", className)} {...props} />;
});

export interface SliderThumbProps extends Omit<ComponentPropsWithoutRef<typeof BaseSlider.Thumb>, "inputRef"> {
  label?: string;
}

export const SliderThumb = forwardRef<HTMLDivElement, SliderThumbProps>(function SliderThumb(
  { className, label, index, getAriaLabel, onKeyDown, ...props },
  ref,
) {
  const context = useSliderContext("Thumb");
  const internalInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (context.readOnly) internalInputRef.current?.setAttribute("aria-readonly", "true");
    else internalInputRef.current?.removeAttribute("aria-readonly");
    if (context.invalid) internalInputRef.current?.setAttribute("aria-invalid", "true");
    else internalInputRef.current?.removeAttribute("aria-invalid");
  }, [context.invalid, context.readOnly]);
  return (
    <BaseSlider.Thumb
      ref={ref}
      className={componentClassName("arcsyn-slider__thumb", className)}
      data-readonly={context.readOnly || undefined}
      index={index}
      inputRef={internalInputRef}
      getAriaLabel={getAriaLabel ?? (label ? () => label : undefined)}
      onKeyDown={(event) => {
        if (context.readOnly) event.preventDefault();
        onKeyDown?.(event);
      }}
      {...props}
    />
  );
});

export interface SliderMark {
  value: number;
  label?: ReactNode;
}

export interface SliderMarksProps {
  marks: readonly (number | SliderMark)[];
  className?: string;
}

export function SliderMarks({ marks, className }: SliderMarksProps) {
  const context = useSliderContext("Marks");
  const range = context.max - context.min || 1;
  return (
    <div className={cx("arcsyn-slider__marks", className)} data-orientation={context.orientation} aria-hidden="true">
      {marks.map((mark) => {
        const item = typeof mark === "number" ? { value: mark } : mark;
        const percentage = Math.min(100, Math.max(0, ((item.value - context.min) / range) * 100));
        return (
          <span
            className="arcsyn-slider__mark"
            key={item.value}
            style={context.orientation === "horizontal" ? { left: `${percentage}%` } : { bottom: `${percentage}%` }}
          >
            <i />
            {item.label !== undefined ? <b>{item.label}</b> : null}
          </span>
        );
      })}
    </div>
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
