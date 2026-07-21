import { forwardRef, type HTMLAttributes } from "react";
import { cx } from "../../utilities/cx.js";

export type BadgeVariant = "neutral" | "accent" | "success" | "warning" | "danger";
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> { variant?: BadgeVariant; }

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge({ className, variant = "neutral", ...props }, ref) {
  return <span ref={ref} className={cx("arcsyn-badge", className)} data-variant={variant} {...props} />;
});

