import { forwardRef, type OptgroupHTMLAttributes, type OptionHTMLAttributes, type SelectHTMLAttributes } from "react";
import { ChevronDownIcon } from "../../icons/index.js";
import { cx } from "../../utilities/cx.js";

export type NativeSelectSize = "sm" | "md" | "lg";
export interface NativeSelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  invalid?: boolean;
  size?: NativeSelectSize;
  wrapperClassName?: string;
}

export const NativeSelect = forwardRef<HTMLSelectElement, NativeSelectProps>(function NativeSelect(
  { className, wrapperClassName, invalid = false, size = "md", children, disabled, ...props },
  ref,
) {
  return <span className={cx("arcsyn-native-select", wrapperClassName)} data-size={size} data-disabled={disabled || undefined} data-invalid={invalid || undefined}><select ref={ref} className={cx("arcsyn-native-select__control", className)} aria-invalid={invalid || undefined} disabled={disabled} {...props}>{children}</select><ChevronDownIcon aria-hidden="true" className="arcsyn-native-select__icon" size={16} /></span>;
});

export type NativeSelectOptionProps = OptionHTMLAttributes<HTMLOptionElement>;
export const NativeSelectOption = forwardRef<HTMLOptionElement, NativeSelectOptionProps>(function NativeSelectOption(props, ref) {
  return <option ref={ref} {...props} />;
});

export type NativeSelectOptGroupProps = OptgroupHTMLAttributes<HTMLOptGroupElement>;
export const NativeSelectOptGroup = forwardRef<HTMLOptGroupElement, NativeSelectOptGroupProps>(function NativeSelectOptGroup(props, ref) {
  return <optgroup ref={ref} {...props} />;
});
