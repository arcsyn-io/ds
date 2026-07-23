import { Collapsible as BaseCollapsible } from "@base-ui/react/collapsible";
import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { cx } from "../../utilities/cx.js";

export type CollapsibleRootProps = ComponentPropsWithoutRef<typeof BaseCollapsible.Root>;
export const CollapsibleRoot = forwardRef<HTMLDivElement, CollapsibleRootProps>(function CollapsibleRoot({ className, ...props }, ref) { return <BaseCollapsible.Root ref={ref} className={(state) => cx("arcsyn-collapsible", typeof className === "function" ? className(state) : className)} {...props} />; });
export type CollapsibleTriggerProps = ComponentPropsWithoutRef<typeof BaseCollapsible.Trigger>;
export const CollapsibleTrigger = forwardRef<HTMLButtonElement, CollapsibleTriggerProps>(function CollapsibleTrigger({ className, children, ...props }, ref) { return <BaseCollapsible.Trigger ref={ref} className={(state) => cx("arcsyn-collapsible__trigger", typeof className === "function" ? className(state) : className)} {...props}>{children}<span aria-hidden className="arcsyn-collapsible__icon">+</span></BaseCollapsible.Trigger>; });
export type CollapsiblePanelProps = ComponentPropsWithoutRef<typeof BaseCollapsible.Panel>;
export const CollapsiblePanel = forwardRef<HTMLDivElement, CollapsiblePanelProps>(function CollapsiblePanel({ className, children, ...props }, ref) { return <BaseCollapsible.Panel ref={ref} className={(state) => cx("arcsyn-collapsible__panel", typeof className === "function" ? className(state) : className)} {...props}><div className="arcsyn-collapsible__content">{children}</div></BaseCollapsible.Panel>; });
export const Collapsible = { Root: CollapsibleRoot, Trigger: CollapsibleTrigger, Panel: CollapsiblePanel };
