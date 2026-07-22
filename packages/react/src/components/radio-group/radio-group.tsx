import { Radio as BaseRadio } from "@base-ui/react/radio";
import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group";
import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { cx } from "../../utilities/cx.js";

export type RadioGroupOrientation = "horizontal" | "vertical";
export type RadioGroupItemVariant = "default" | "card";
export type RadioGroupRootProps<Value = string> = ComponentPropsWithoutRef<typeof BaseRadioGroup<Value>> & { orientation?: RadioGroupOrientation; invalid?: boolean };

export function RadioGroupRoot<Value = string>({ className, orientation = "vertical", invalid = false, ...props }: RadioGroupRootProps<Value>) {
  return <BaseRadioGroup className={(state) => cx("arcsyn-radio-group", typeof className === "function" ? className(state) : className)} data-orientation={orientation} data-invalid={invalid || undefined} aria-invalid={invalid || undefined} {...props} />;
}

export type RadioGroupItemProps = ComponentPropsWithoutRef<typeof BaseRadio.Root> & { variant?: RadioGroupItemVariant };
export const RadioGroupItem = forwardRef<HTMLSpanElement, RadioGroupItemProps>(function RadioGroupItem({ className, children, disabled, variant = "default", ...props }, ref) {
  return <label className="arcsyn-radio-group__item" data-variant={variant} data-disabled={disabled || undefined}><BaseRadio.Root ref={ref} className={(state) => cx("arcsyn-radio-group__control", typeof className === "function" ? className(state) : className)} disabled={disabled} {...props}><BaseRadio.Indicator className="arcsyn-radio-group__indicator" /></BaseRadio.Root><span className="arcsyn-radio-group__label">{children}</span></label>;
});

export const RadioGroup = { Root: RadioGroupRoot, Item: RadioGroupItem };
