import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { AlertIcon, FilterIcon, InfoIcon, SearchIcon } from "../../icons/index.js";
import { cx } from "../../utilities/cx.js";
import { Skeleton } from "../skeleton/skeleton.js";
import { Spinner } from "../spinner/spinner.js";

export type DataStateKind = "loading" | "empty" | "no-results" | "error" | "permission";
export interface DataStateProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  state: DataStateKind;
  size?: "compact" | "default" | "full";
  title?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  action?: ReactNode;
  secondaryAction?: ReactNode;
  skeletonCount?: number;
  loadingLabel?: string;
}
const defaultTitles: Record<DataStateKind, string> = {
  loading: "Carregando dados",
  empty: "Nenhum item disponível",
  "no-results": "Nenhum resultado encontrado",
  error: "Não foi possível carregar os dados",
  permission: "Acesso não permitido",
};

export const DataState = forwardRef<HTMLDivElement, DataStateProps>(function DataState(
  { state, size = "default", title, description, icon, action, secondaryAction, skeletonCount = 3, loadingLabel = "Carregando dados", className, role, ...props },
  ref,
) {
  if (state === "loading") {
    return (
      <div ref={ref} className={cx("arcsyn-data-state", className)} data-state={state} data-size={size} role={role ?? "status"} aria-label={loadingLabel} {...props}>
        <div className="arcsyn-data-state__loading-heading" aria-hidden="true"><Spinner size="md" /><span>{loadingLabel}</span></div>
        <div className="arcsyn-data-state__skeletons" aria-hidden="true">{Array.from({ length: skeletonCount }, (_, index) => <div className="arcsyn-data-state__skeleton-row" key={index}><Skeleton height=".75rem" width="1.5rem" /><Skeleton height=".75rem" width={`${56 + (index % 2) * 12}%`} /><Skeleton height=".75rem" width="20%" /></div>)}</div>
      </div>
    );
  }
  const DefaultIcon = state === "error" ? AlertIcon : state === "no-results" ? SearchIcon : state === "permission" ? InfoIcon : FilterIcon;
  return (
    <div ref={ref} className={cx("arcsyn-data-state", className)} data-state={state} data-size={size} role={role ?? (state === "error" ? "alert" : undefined)} {...props}>
      <div className="arcsyn-data-state__icon" aria-hidden="true">{icon ?? <DefaultIcon size={size === "compact" ? 18 : 24} />}</div>
      <div className="arcsyn-data-state__copy">
        <h3>{title ?? defaultTitles[state]}</h3>
        {description ? <p>{description}</p> : null}
      </div>
      {action || secondaryAction ? <div className="arcsyn-data-state__actions">{action}{secondaryAction}</div> : null}
    </div>
  );
});
