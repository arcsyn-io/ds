import { forwardRef, type CSSProperties, type HTMLAttributes } from "react";
import { cx } from "../../utilities/cx.js";

export interface AspectRatioProps extends HTMLAttributes<HTMLDivElement> {
  ratio?: number;
}

export const AspectRatio = forwardRef<HTMLDivElement, AspectRatioProps>(function AspectRatio({ ratio = 16 / 9, className, style, ...props }, ref) {
  const resolvedRatio = ratio > 0 ? ratio : 16 / 9;
  return <div ref={ref} className={cx("arcsyn-aspect-ratio", className)} style={{ "--arcsyn-aspect-ratio": String(resolvedRatio), ...style } as CSSProperties} {...props} />;
});
