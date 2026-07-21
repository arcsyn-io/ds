import { forwardRef, type InputHTMLAttributes } from "react";
import { cx } from "../../utilities/cx.js";

export type SwitchProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "role">;

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch({ className, ...props }, ref) {
  return <input ref={ref} type="checkbox" role="switch" className={cx("arcsyn-switch", className)} {...props} />;
});
