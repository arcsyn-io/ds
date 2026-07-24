import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { ArrowDownIcon, ArrowUpIcon, MinusIcon } from "../../icons/index.js";
import { cx } from "../../utilities/cx.js";
import { Skeleton } from "../skeleton/skeleton.js";

export type StatCardDensity = "compact" | "default";
export type StatCardTrendDirection = "up" | "down" | "neutral";
export type StatCardSentiment = "positive" | "negative" | "neutral";

export interface StatCardTrendValue {
  value: ReactNode;
  direction: StatCardTrendDirection;
  sentiment?: StatCardSentiment;
  accessibleLabel?: string;
}

export interface StatCardProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  label: ReactNode;
  value: ReactNode;
  description?: ReactNode;
  trend?: StatCardTrendValue;
  icon?: ReactNode;
  visualization?: ReactNode;
  density?: StatCardDensity;
  loading?: boolean;
  valueAriaLabel?: string;
}

export interface StatCardRootProps extends HTMLAttributes<HTMLDivElement> {
  density?: StatCardDensity;
}

const StatCardRoot = forwardRef<HTMLDivElement, StatCardRootProps>(function StatCardRoot({ className, density = "default", ...props }, ref) {
  return <div ref={ref} className={cx("arcsyn-stat-card", className)} data-density={density} {...props} />;
});
const StatCardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function StatCardHeader({ className, ...props }, ref) {
  return <div ref={ref} className={cx("arcsyn-stat-card__header", className)} {...props} />;
});
const StatCardLabel = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function StatCardLabel({ className, ...props }, ref) {
  return <div ref={ref} className={cx("arcsyn-stat-card__label", className)} {...props} />;
});
const StatCardIcon = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(function StatCardIcon({ className, ...props }, ref) {
  return <span ref={ref} className={cx("arcsyn-stat-card__icon", className)} aria-hidden="true" {...props} />;
});
const StatCardValue = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function StatCardValue({ className, ...props }, ref) {
  return <div ref={ref} className={cx("arcsyn-stat-card__value", className)} {...props} />;
});
export interface StatCardTrendProps extends HTMLAttributes<HTMLSpanElement> {
  direction: StatCardTrendDirection;
  sentiment?: StatCardSentiment;
  accessibleLabel?: string;
}
const trendLabels: Record<StatCardTrendDirection, string> = { up: "Aumentou", down: "Diminuiu", neutral: "Sem alteração" };
const StatCardTrend = forwardRef<HTMLSpanElement, StatCardTrendProps>(function StatCardTrend(
  { className, direction, sentiment = "neutral", accessibleLabel, children, ...props },
  ref,
) {
  const Icon = direction === "up" ? ArrowUpIcon : direction === "down" ? ArrowDownIcon : MinusIcon;
  return (
    <span ref={ref} className={cx("arcsyn-stat-card__trend", className)} data-direction={direction} data-sentiment={sentiment} aria-label={accessibleLabel ?? `${trendLabels[direction]}: ${String(children)}`} {...props}>
      <Icon aria-hidden size={14} /><span>{children}</span>
    </span>
  );
});
const StatCardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(function StatCardDescription({ className, ...props }, ref) {
  return <p ref={ref} className={cx("arcsyn-stat-card__description", className)} {...props} />;
});
const StatCardVisualization = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function StatCardVisualization({ className, ...props }, ref) {
  return <div ref={ref} className={cx("arcsyn-stat-card__visualization", className)} {...props} />;
});

const StatCardComponent = forwardRef<HTMLDivElement, StatCardProps>(function StatCard(
  { label, value, description, trend, icon, visualization, density = "default", loading = false, valueAriaLabel, className, ...props },
  ref,
) {
  return (
    <StatCardRoot ref={ref} density={density} className={className} aria-busy={loading || undefined} {...props}>
      <StatCardHeader><StatCardLabel>{loading ? <Skeleton height="0.875rem" width="55%" /> : label}</StatCardLabel>{icon ? <StatCardIcon>{icon}</StatCardIcon> : null}</StatCardHeader>
      <StatCardValue>{loading ? <Skeleton height="2rem" width="68%" /> : valueAriaLabel ? <><span className="arcsyn-stat-card__sr-only">{valueAriaLabel}</span><span aria-hidden="true">{value}</span></> : value}</StatCardValue>
      {!loading && trend ? <StatCardTrend {...trend}>{trend.value}</StatCardTrend> : null}
      {description ? <StatCardDescription>{loading ? <Skeleton height="0.75rem" width="80%" /> : description}</StatCardDescription> : null}
      {!loading && visualization ? <StatCardVisualization>{visualization}</StatCardVisualization> : null}
    </StatCardRoot>
  );
});

export const StatCard = Object.assign(StatCardComponent, {
  Root: StatCardRoot,
  Header: StatCardHeader,
  Label: StatCardLabel,
  Icon: StatCardIcon,
  Value: StatCardValue,
  Trend: StatCardTrend,
  Description: StatCardDescription,
  Visualization: StatCardVisualization,
});
