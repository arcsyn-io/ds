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
    "--success-bg": "color-mix(in srgb, var(--arcsyn-color-success), var(--arcsyn-color-surface-raised) 88%)",
    "--success-border": "color-mix(in srgb, var(--arcsyn-color-success), var(--arcsyn-color-border) 65%)",
    "--success-text": "var(--arcsyn-color-foreground)",
    "--info-bg": "color-mix(in srgb, var(--arcsyn-color-primary), var(--arcsyn-color-surface-raised) 88%)",
    "--info-border": "color-mix(in srgb, var(--arcsyn-color-primary), var(--arcsyn-color-border) 65%)",
    "--info-text": "var(--arcsyn-color-foreground)",
    "--warning-bg": "color-mix(in srgb, var(--arcsyn-color-warning), var(--arcsyn-color-surface-raised) 88%)",
    "--warning-border": "color-mix(in srgb, var(--arcsyn-color-warning), var(--arcsyn-color-border) 65%)",
    "--warning-text": "var(--arcsyn-color-foreground)",
    "--error-bg": "color-mix(in srgb, var(--arcsyn-color-danger), var(--arcsyn-color-surface-raised) 88%)",
    "--error-border": "color-mix(in srgb, var(--arcsyn-color-danger), var(--arcsyn-color-border) 65%)",
    "--error-text": "var(--arcsyn-color-foreground)",
    fontFamily: "var(--arcsyn-font-sans)",
    ...style,
  } as CSSProperties;
  return <SonnerToaster ref={ref} className={cx("arcsyn-toaster", `arcsyn-toaster--${effect}`, className)} closeButton={closeButton} containerAriaLabel={containerAriaLabel} position={position} richColors={richColors} style={tokenStyle} toastOptions={{ ...toastOptions, classNames: { ...toastOptions?.classNames, toast: cx("arcsyn-toast", toastOptions?.classNames?.toast), title: cx("arcsyn-toast__title", toastOptions?.classNames?.title), description: cx("arcsyn-toast__description", toastOptions?.classNames?.description), actionButton: cx("arcsyn-toast__action", toastOptions?.classNames?.actionButton), cancelButton: cx("arcsyn-toast__cancel", toastOptions?.classNames?.cancelButton), closeButton: cx("arcsyn-toast__close", toastOptions?.classNames?.closeButton) } }} {...props} />;
});

export { toast, useSonner };
export type { ExternalToast, ToastT };
