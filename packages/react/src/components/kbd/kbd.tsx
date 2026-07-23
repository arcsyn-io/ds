import { forwardRef, type HTMLAttributes } from "react";
import { cx } from "../../utilities/cx.js";
export type KbdProps = HTMLAttributes<HTMLElement>;
export const Kbd = forwardRef<HTMLElement, KbdProps>(function Kbd({ className, ...props }, ref) { return <kbd ref={ref} className={cx("arcsyn-kbd", className)} {...props} />; });
