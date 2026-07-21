import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { forwardRef, type ComponentPropsWithoutRef, type HTMLAttributes } from "react";
import { cx } from "../../utilities/cx.js";
import type { ButtonSize, ButtonVariant } from "../button/button.js";

export type DialogRootProps = ComponentPropsWithoutRef<typeof BaseDialog.Root>;

export function DialogRoot(props: DialogRootProps) {
  return <BaseDialog.Root {...props} />;
}

type DialogPrimitiveButtonProps = Omit<ComponentPropsWithoutRef<typeof BaseDialog.Trigger>, "className">;

export interface DialogTriggerProps extends DialogPrimitiveButtonProps {
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const DialogTrigger = forwardRef<HTMLButtonElement, DialogTriggerProps>(function DialogTrigger(
  { className, variant = "primary", size = "md", ...props },
  ref,
) {
  return <BaseDialog.Trigger ref={ref} className={cx("arcsyn-button", className)} data-variant={variant} data-size={size} {...props} />;
});

type DialogPrimitivePopupProps = Omit<ComponentPropsWithoutRef<typeof BaseDialog.Popup>, "className">;

export interface DialogContentProps extends DialogPrimitivePopupProps {
  className?: string;
}

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(function DialogContent(
  { className, children, ...props },
  ref,
) {
  return (
    <BaseDialog.Portal>
      <BaseDialog.Backdrop className="arcsyn-dialog__backdrop" />
      <BaseDialog.Viewport className="arcsyn-dialog__viewport">
        <BaseDialog.Popup ref={ref} className={cx("arcsyn-dialog", className)} {...props}>
          {children}
        </BaseDialog.Popup>
      </BaseDialog.Viewport>
    </BaseDialog.Portal>
  );
});

export type DialogHeaderProps = HTMLAttributes<HTMLDivElement>;

export const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(function DialogHeader({ className, ...props }, ref) {
  return <div ref={ref} className={cx("arcsyn-dialog__header", className)} {...props} />;
});

type DialogPrimitiveTitleProps = Omit<ComponentPropsWithoutRef<typeof BaseDialog.Title>, "className">;

export interface DialogTitleProps extends DialogPrimitiveTitleProps {
  className?: string;
}

export const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(function DialogTitle({ className, ...props }, ref) {
  return <BaseDialog.Title ref={ref} className={cx("arcsyn-dialog__title", className)} {...props} />;
});

type DialogPrimitiveDescriptionProps = Omit<ComponentPropsWithoutRef<typeof BaseDialog.Description>, "className">;

export interface DialogDescriptionProps extends DialogPrimitiveDescriptionProps {
  className?: string;
}

export const DialogDescription = forwardRef<HTMLParagraphElement, DialogDescriptionProps>(function DialogDescription({ className, ...props }, ref) {
  return <BaseDialog.Description ref={ref} className={cx("arcsyn-dialog__description", className)} {...props} />;
});

export type DialogFooterProps = HTMLAttributes<HTMLDivElement>;

export const DialogFooter = forwardRef<HTMLDivElement, DialogFooterProps>(function DialogFooter({ className, ...props }, ref) {
  return <div ref={ref} className={cx("arcsyn-dialog__footer", className)} {...props} />;
});

type DialogPrimitiveCloseProps = Omit<ComponentPropsWithoutRef<typeof BaseDialog.Close>, "className">;

export interface DialogCloseProps extends DialogPrimitiveCloseProps {
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const DialogClose = forwardRef<HTMLButtonElement, DialogCloseProps>(function DialogClose(
  { className, variant = "secondary", size = "md", ...props },
  ref,
) {
  return <BaseDialog.Close ref={ref} className={cx("arcsyn-button", className)} data-variant={variant} data-size={size} {...props} />;
});

export const Dialog = {
  Root: DialogRoot,
  Trigger: DialogTrigger,
  Content: DialogContent,
  Header: DialogHeader,
  Title: DialogTitle,
  Description: DialogDescription,
  Footer: DialogFooter,
  Close: DialogClose,
};
