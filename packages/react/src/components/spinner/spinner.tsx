import { forwardRef, type HTMLAttributes } from "react";
import { cx } from "../../utilities/cx.js";

export type SpinnerSize = "sm" | "md" | "lg";

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  size?: SpinnerSize;
  label?: string;
}

export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(function Spinner(
  { className, size = "md", label, ...props },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cx("arcsyn-spinner", className)}
      data-size={size}
      role={label ? "status" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      {...props}
    />
  );
});
