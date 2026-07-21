import { forwardRef, type InputHTMLAttributes } from "react";
import { cx } from "../../utilities/cx.js";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  invalid?: boolean;
  size?: InputSize;
}

export type InputSize = "sm" | "md" | "lg";

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ className, invalid = false, size = "md", ...props }, ref) {
  return <input ref={ref} className={cx("arcsyn-input", className)} data-invalid={invalid || undefined} data-size={size} aria-invalid={invalid || undefined} {...props} />;
});
