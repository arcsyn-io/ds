import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { AlertIcon, CircleIcon, InfoIcon, SuccessIcon } from "../../icons/index.js";
import { cx } from "../../utilities/cx.js";
import { Spinner } from "../spinner/spinner.js";

export type StatusIndicatorStatus = "neutral" | "info" | "success" | "warning" | "danger" | "loading";
export interface StatusIndicatorProps extends HTMLAttributes<HTMLSpanElement> {
  status?: StatusIndicatorStatus;
  size?: "sm" | "md" | "lg";
  format?: "inline" | "pill";
  indicator?: "dot" | "spinner" | "icon" | "none";
  pulse?: boolean;
  label?: ReactNode;
  iconOnly?: boolean;
  accessibleLabel?: string;
}

const statusLabels: Record<StatusIndicatorStatus, string> = {
  neutral: "Status neutro", info: "Informação", success: "Sucesso", warning: "Atenção", danger: "Erro", loading: "Carregando",
};

export const StatusIndicator = forwardRef<HTMLSpanElement, StatusIndicatorProps>(function StatusIndicator(
  { className, status = "neutral", size = "md", format = "inline", indicator, pulse = false, label, iconOnly = false, accessibleLabel, children, ...props },
  ref,
) {
  const kind = indicator ?? (status === "loading" ? "spinner" : status === "neutral" ? "dot" : "icon");
  const text = label ?? children;
  const Icon = status === "success" ? SuccessIcon : status === "info" ? InfoIcon : status === "warning" || status === "danger" ? AlertIcon : CircleIcon;
  const name = accessibleLabel ?? (typeof text === "string" ? text : statusLabels[status]);
  return (
    <span ref={ref} className={cx("arcsyn-status-indicator", className)} data-status={status} data-size={size} data-format={format} data-pulse={pulse && status !== "loading" || undefined} aria-label={iconOnly ? name : undefined} {...props}>
      {kind === "spinner" ? <Spinner className="arcsyn-status-indicator__spinner" size={size === "lg" ? "md" : "sm"} /> : null}
      {kind === "dot" ? <span className="arcsyn-status-indicator__dot" aria-hidden="true" /> : null}
      {kind === "icon" ? <Icon className="arcsyn-status-indicator__icon" aria-hidden size={size === "lg" ? 18 : size === "sm" ? 12 : 14} /> : null}
      {!iconOnly ? <span>{text ?? statusLabels[status]}</span> : null}
    </span>
  );
});
