import { Popover as BasePopover } from "@base-ui/react/popover";
import { forwardRef, type ComponentPropsWithoutRef, type HTMLAttributes } from "react";
import { cx } from "../../utilities/cx.js";
import type { ButtonSize, ButtonVariant } from "../button/button.js";

export type PopoverRootProps = ComponentPropsWithoutRef<typeof BasePopover.Root>;
export function PopoverRoot(props: PopoverRootProps) { return <BasePopover.Root {...props} />; }
type TriggerPrimitiveProps = Omit<ComponentPropsWithoutRef<typeof BasePopover.Trigger>, "className">;
export interface PopoverTriggerProps extends TriggerPrimitiveProps { className?: string; variant?: ButtonVariant; size?: ButtonSize; }
export const PopoverTrigger = forwardRef<HTMLButtonElement, PopoverTriggerProps>(function PopoverTrigger({ className, variant = "secondary", size = "md", ...props }, ref) { return <BasePopover.Trigger ref={ref} className={cx("arcsyn-button", "arcsyn-popover__trigger", className)} data-variant={variant} data-size={size} {...props} />; });
export type PopoverContentProps = ComponentPropsWithoutRef<typeof BasePopover.Popup>;
export const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(function PopoverContent({ className, children, ...props }, ref) { return <BasePopover.Portal><BasePopover.Positioner className="arcsyn-popover__positioner" sideOffset={6}><BasePopover.Popup ref={ref} className={(state) => cx("arcsyn-popover", typeof className === "function" ? className(state) : className)} {...props}>{children}</BasePopover.Popup></BasePopover.Positioner></BasePopover.Portal>; });
export type PopoverTitleProps = ComponentPropsWithoutRef<typeof BasePopover.Title>;
export const PopoverTitle = forwardRef<HTMLHeadingElement, PopoverTitleProps>(function PopoverTitle({ className, ...props }, ref) { return <BasePopover.Title ref={ref} className={(state) => cx("arcsyn-popover__title", typeof className === "function" ? className(state) : className)} {...props} />; });
export type PopoverDescriptionProps = ComponentPropsWithoutRef<typeof BasePopover.Description>;
export const PopoverDescription = forwardRef<HTMLParagraphElement, PopoverDescriptionProps>(function PopoverDescription({ className, ...props }, ref) { return <BasePopover.Description ref={ref} className={(state) => cx("arcsyn-popover__description", typeof className === "function" ? className(state) : className)} {...props} />; });
export type PopoverCloseProps = ComponentPropsWithoutRef<typeof BasePopover.Close>;
export const PopoverClose = forwardRef<HTMLButtonElement, PopoverCloseProps>(function PopoverClose({ className, ...props }, ref) { return <BasePopover.Close ref={ref} className={cx("arcsyn-popover__close", typeof className === "string" ? className : undefined)} {...props} />; });
export type PopoverFooterProps = HTMLAttributes<HTMLDivElement>;
export const PopoverFooter = forwardRef<HTMLDivElement, PopoverFooterProps>(function PopoverFooter({ className, ...props }, ref) { return <div ref={ref} className={cx("arcsyn-popover__footer", className)} {...props} />; });
export const Popover = { Root: PopoverRoot, Trigger: PopoverTrigger, Content: PopoverContent, Title: PopoverTitle, Description: PopoverDescription, Close: PopoverClose, Footer: PopoverFooter };
