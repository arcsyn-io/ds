import { forwardRef, type HTMLAttributes } from "react";
import { cx } from "../../utilities/cx.js";

export type CardProps = HTMLAttributes<HTMLDivElement>;

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card({ className, ...props }, ref) {
  return <div ref={ref} className={cx("arcsyn-card", className)} {...props} />;
});

