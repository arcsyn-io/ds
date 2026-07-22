import { Separator as BaseSeparator } from "@base-ui/react/separator";
import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { cx } from "../../utilities/cx.js";
export type SeparatorProps = ComponentPropsWithoutRef<typeof BaseSeparator>;
export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(function Separator({ className, ...props }, ref) { return <BaseSeparator ref={ref} className={(state) => cx("arcsyn-separator", typeof className === "function" ? className(state) : className)} {...props} />; });
