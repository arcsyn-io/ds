import { forwardRef, type HTMLAttributes } from "react";
import { cx } from "../../utilities/cx.js";
import type { InputSize } from "../input/input.js";

export interface InputGroupRootProps extends HTMLAttributes<HTMLDivElement> {
  invalid?: boolean;
  size?: InputSize;
}

export const InputGroupRoot = forwardRef<HTMLDivElement, InputGroupRootProps>(function InputGroupRoot(
  { className, invalid = false, size = "md", ...props },
  ref,
) {
  return <div ref={ref} className={cx("arcsyn-input-group", className)} data-invalid={invalid || undefined} data-size={size} {...props} />;
});

export interface InputGroupAddonProps extends HTMLAttributes<HTMLSpanElement> {
  position?: "start" | "end";
}

export const InputGroupAddon = forwardRef<HTMLSpanElement, InputGroupAddonProps>(function InputGroupAddon(
  { className, position = "start", ...props },
  ref,
) {
  return <span ref={ref} className={cx("arcsyn-input-group__addon", className)} data-position={position} {...props} />;
});

export const InputGroup = {
  Root: InputGroupRoot,
  Addon: InputGroupAddon,
};
