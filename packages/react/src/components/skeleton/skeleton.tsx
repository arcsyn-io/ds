import { forwardRef, type CSSProperties, type HTMLAttributes } from "react";
import { cx } from "../../utilities/cx.js";

export type SkeletonVariant = "text" | "rectangular" | "circular";
export type SkeletonAnimation = "pulse" | "wave" | "none";
export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  animation?: SkeletonAnimation;
  height?: CSSProperties["height"];
  variant?: SkeletonVariant;
  width?: CSSProperties["width"];
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(function Skeleton(
  { animation = "pulse", className, height, style, variant = "rectangular", width, ...props },
  ref,
) {
  return <div ref={ref} aria-hidden="true" className={cx("arcsyn-skeleton", className)} data-animation={animation} data-variant={variant} style={{ width, height, ...style }} {...props} />;
});
