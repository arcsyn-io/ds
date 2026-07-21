import { forwardRef, type InputHTMLAttributes } from "react";
import { cx } from "../../utilities/cx.js";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> { invalid?: boolean; }

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox({ className, invalid = false, ...props }, ref) {
  return <input ref={ref} type="checkbox" className={cx("arcsyn-checkbox", className)} data-invalid={invalid || undefined} aria-invalid={invalid || undefined} {...props} />;
});
