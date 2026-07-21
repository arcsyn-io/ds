import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cx } from "../../utilities/cx.js";

export type AlertVariant = "info" | "success" | "warning" | "danger";
export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  variant?: AlertVariant;
  title: ReactNode;
  description?: ReactNode;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert({ className, variant = "info", title, description, children, ...props }, ref) {
  return (
    <div ref={ref} className={cx("arcsyn-alert", className)} data-variant={variant} role="status" {...props}>
      <div className="arcsyn-alert__title">{title}</div>
      {description ? <div className="arcsyn-alert__description">{description}</div> : null}
      {children}
    </div>
  );
});
