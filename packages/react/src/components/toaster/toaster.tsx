import { forwardRef, type CSSProperties } from "react";
import { Toaster as SonnerToaster, toast, useSonner, type ExternalToast, type ToasterProps as SonnerToasterProps, type ToastT } from "sonner";
import "sonner/dist/styles.css";
import { cx } from "../../utilities/cx.js";

export type ToasterEffect = "slide" | "fade" | "scale" | "spring" | "blur" | "none";
export interface ToasterProps extends SonnerToasterProps {
  effect?: ToasterEffect;
}

export const Toaster = forwardRef<HTMLElement, ToasterProps>(function Toaster(
  { className, closeButton = true, containerAriaLabel = "Notificações", effect = "spring", position = "bottom-right", richColors = true, style, toastOptions, ...props },
  ref,
) {
  const tokenStyle = {
    "--border-radius": "var(--arcsyn-radius-md)",
    "--normal-bg": "var(--arcsyn-color-surface-raised)",
    "--normal-border": "var(--arcsyn-color-border-strong)",
    "--normal-text": "var(--arcsyn-color-foreground)",
    "--success-bg": "var(--arcsyn-color-success-background)",
    "--success-border": "var(--arcsyn-color-success-border)",
    "--success-text": "var(--arcsyn-color-success-foreground)",
    "--info-bg": "var(--arcsyn-color-accent)",
    "--info-border": "var(--arcsyn-color-accent-border)",
    "--info-text": "var(--arcsyn-color-accent-foreground)",
    "--warning-bg": "var(--arcsyn-color-warning-background)",
    "--warning-border": "var(--arcsyn-color-warning-border)",
    "--warning-text": "var(--arcsyn-color-warning-foreground)",
    "--error-bg": "var(--arcsyn-color-danger-background)",
    "--error-border": "var(--arcsyn-color-danger-border)",
    "--error-text": "var(--arcsyn-color-danger-foreground)",
    fontFamily: "var(--arcsyn-font-sans)",
    ...style,
  } as CSSProperties;
  return <SonnerToaster ref={ref} className={cx("arcsyn-toaster", `arcsyn-toaster--${effect}`, className)} closeButton={closeButton} containerAriaLabel={containerAriaLabel} position={position} richColors={richColors} style={tokenStyle} toastOptions={{ ...toastOptions, classNames: { ...toastOptions?.classNames, toast: cx("arcsyn-toast", toastOptions?.classNames?.toast), title: cx("arcsyn-toast__title", toastOptions?.classNames?.title), description: cx("arcsyn-toast__description", toastOptions?.classNames?.description), actionButton: cx("arcsyn-toast__action", toastOptions?.classNames?.actionButton), cancelButton: cx("arcsyn-toast__cancel", toastOptions?.classNames?.cancelButton), closeButton: cx("arcsyn-toast__close", toastOptions?.classNames?.closeButton) } }} {...props} />;
});

export { toast, useSonner };
export type { ExternalToast, ToastT };
