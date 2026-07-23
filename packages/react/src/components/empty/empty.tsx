import { forwardRef, type HTMLAttributes } from "react";
import { cx } from "../../utilities/cx.js";

export const Empty = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function Empty({ className, ...props }, ref) { return <div ref={ref} className={cx("arcsyn-empty", className)} {...props} />; });
export const EmptyMedia = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function EmptyMedia({ className, ...props }, ref) { return <div ref={ref} className={cx("arcsyn-empty__media", className)} aria-hidden="true" {...props} />; });
export const EmptyHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function EmptyHeader({ className, ...props }, ref) { return <div ref={ref} className={cx("arcsyn-empty__header", className)} {...props} />; });
export const EmptyTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(function EmptyTitle({ className, ...props }, ref) { return <h3 ref={ref} className={cx("arcsyn-empty__title", className)} {...props} />; });
export const EmptyDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(function EmptyDescription({ className, ...props }, ref) { return <p ref={ref} className={cx("arcsyn-empty__description", className)} {...props} />; });
export const EmptyContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function EmptyContent({ className, ...props }, ref) { return <div ref={ref} className={cx("arcsyn-empty__content", className)} {...props} />; });
export const EmptyFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function EmptyFooter({ className, ...props }, ref) { return <div ref={ref} className={cx("arcsyn-empty__footer", className)} {...props} />; });
