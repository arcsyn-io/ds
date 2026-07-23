import { forwardRef, type ButtonHTMLAttributes, type HTMLAttributes } from "react";
import { cx } from "../../utilities/cx.js";

export type AttachmentState = "idle" | "uploading" | "processing" | "error" | "done";
export type AttachmentSize = "default" | "sm" | "xs";
export type AttachmentOrientation = "horizontal" | "vertical";
export interface AttachmentProps extends HTMLAttributes<HTMLDivElement> { state?: AttachmentState; size?: AttachmentSize; orientation?: AttachmentOrientation; }

export const Attachment = forwardRef<HTMLDivElement, AttachmentProps>(function Attachment({ className, state = "done", size = "default", orientation = "horizontal", ...props }, ref) { return <div ref={ref} className={cx("arcsyn-attachment", className)} data-state={state} data-size={size} data-orientation={orientation} {...props} />; });
export const AttachmentMedia = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & { variant?: "icon" | "image" }>(function AttachmentMedia({ className, variant = "icon", ...props }, ref) { return <div ref={ref} className={cx("arcsyn-attachment__media", className)} data-variant={variant} {...props} />; });
export const AttachmentContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function AttachmentContent({ className, ...props }, ref) { return <div ref={ref} className={cx("arcsyn-attachment__content", className)} {...props} />; });
export const AttachmentTitle = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(function AttachmentTitle({ className, ...props }, ref) { return <p ref={ref} className={cx("arcsyn-attachment__title", className)} {...props} />; });
export const AttachmentDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(function AttachmentDescription({ className, ...props }, ref) { return <p ref={ref} className={cx("arcsyn-attachment__description", className)} {...props} />; });
export const AttachmentActions = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function AttachmentActions({ className, ...props }, ref) { return <div ref={ref} className={cx("arcsyn-attachment__actions", className)} {...props} />; });
export const AttachmentAction = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(function AttachmentAction({ className, type = "button", ...props }, ref) { return <button ref={ref} type={type} className={cx("arcsyn-attachment__action", className)} {...props} />; });
export const AttachmentTrigger = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(function AttachmentTrigger({ className, type = "button", ...props }, ref) { return <button ref={ref} type={type} className={cx("arcsyn-attachment__trigger", className)} {...props} />; });
export const AttachmentGroup = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function AttachmentGroup({ className, ...props }, ref) { return <div ref={ref} className={cx("arcsyn-attachment-group", className)} {...props} />; });
