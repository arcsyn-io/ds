import { useId, useMemo, useState, type HTMLAttributes, type ReactNode } from "react";
import { cx } from "../../utilities/cx.js";
import { DataState } from "../data-state/data-state.js";

export type ChartColor = "primary" | "accent" | "secondary" | "success" | "warning" | "danger";
export type ChartState = "ready" | "loading" | "empty" | "error";
export interface ChartSeries<T> {
  key: keyof T & string;
  label: string;
  color?: ChartColor;
  formatValue?: (value: number, datum: T) => ReactNode;
}
export interface ChartLegendProps extends HTMLAttributes<HTMLUListElement> {
  items: readonly { key: string; label: ReactNode; color?: ChartColor }[];
}
export function ChartLegend({ items, className, ...props }: ChartLegendProps) {
  return <ul className={cx("arcsyn-chart-legend", className)} {...props}>{items.map((item, index) => <li key={item.key}><span aria-hidden="true" data-color={item.color ?? chartColors[index % chartColors.length]} />{item.label}</li>)}</ul>;
}
export interface ChartTooltipProps extends HTMLAttributes<HTMLDivElement> {
  label?: ReactNode;
  value?: ReactNode;
  open?: boolean;
}
export function ChartTooltip({ label, value, open = true, className, ...props }: ChartTooltipProps) {
  if (!open) return null;
  return <div className={cx("arcsyn-chart-tooltip", className)} role="tooltip" {...props}>{label ? <span>{label}</span> : null}<strong>{value}</strong></div>;
}

const chartColors: readonly ChartColor[] = ["primary", "accent", "success", "warning", "danger", "secondary"];
type Datum = Record<string, unknown>;
interface CommonChartProps<T extends Datum> extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "aria-label"> {
  "aria-label": string;
  data: readonly T[];
  xKey: keyof T & string;
  series: readonly ChartSeries<T>[];
  height?: number;
  state?: ChartState;
  legend?: boolean;
  formatLabel?: (value: unknown, datum: T) => ReactNode;
  emptyState?: ReactNode;
  errorState?: ReactNode;
}
interface ActivePoint { x: number; y: number; label: ReactNode; value: ReactNode; }

function numericValues<T extends Datum>(data: readonly T[], series: readonly ChartSeries<T>[]) {
  return data.flatMap((datum) => series.map((item) => Number(datum[item.key])).filter(Number.isFinite));
}
function domain(values: readonly number[]) {
  const min = Math.min(0, ...values);
  const max = Math.max(0, ...values);
  return { min, max: max === min ? min + 1 : max };
}
function yPosition(value: number, min: number, max: number) {
  return 92 - ((value - min) / (max - min)) * 84;
}
function stateContent(state: ChartState, emptyState?: ReactNode, errorState?: ReactNode) {
  if (state === "loading") return <DataState state="loading" size="compact" />;
  if (state === "error") return errorState ?? <DataState state="error" size="compact" />;
  return emptyState ?? <DataState state="empty" size="compact" />;
}
function AccessibleTable<T extends Datum>({ data, xKey, series, label }: { data: readonly T[]; xKey: keyof T & string; series: readonly ChartSeries<T>[]; label: string }) {
  return <table className="arcsyn-chart__table"><caption>{label}</caption><thead><tr><th>{String(xKey)}</th>{series.map((item) => <th key={item.key}>{item.label}</th>)}</tr></thead><tbody>{data.map((datum, index) => <tr key={index}><th>{String(datum[xKey] ?? "")}</th>{series.map((item) => <td key={item.key}>{String(datum[item.key] ?? "")}</td>)}</tr>)}</tbody></table>;
}
function ChartXAxis<T extends Datum>({ data, xKey }: { data: readonly T[]; xKey: keyof T & string }) {
  return <div className="arcsyn-chart__x-axis" aria-hidden="true">{data.map((datum, index) => <span key={index}>{String(datum[xKey] ?? "")}</span>)}</div>;
}

export function LineChart<T extends Datum>({ data, xKey, series, height = 240, state = "ready", legend = true, formatLabel, emptyState, errorState, className, "aria-label": ariaLabel, ...props }: CommonChartProps<T>) {
  const label = ariaLabel ?? "Gráfico de linhas";
  const [active, setActive] = useState<ActivePoint | null>(null);
  const values = numericValues(data, series);
  const { min, max } = domain(values);
  const resolvedState = state === "ready" && data.length === 0 ? "empty" : state;
  if (resolvedState !== "ready") return <div className={cx("arcsyn-chart", className)} style={{ minHeight: height }} {...props}>{stateContent(resolvedState, emptyState, errorState)}</div>;
  return (
    <div className={cx("arcsyn-chart", className)} style={{ height }} aria-label={label} role="group" {...props}>
      <div className="arcsyn-chart__plot">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" role="img" aria-hidden="true">
          <line className="arcsyn-chart__axis" x1="8" y1={yPosition(0, min, max)} x2="96" y2={yPosition(0, min, max)} />
          {series.map((item, seriesIndex) => {
            const color = item.color ?? chartColors[seriesIndex % chartColors.length];
            const points = data.map((datum, index) => `${8 + index * (88 / Math.max(1, data.length - 1))},${yPosition(Number(datum[item.key]) || 0, min, max)}`).join(" ");
            return <polyline key={item.key} className="arcsyn-chart__line" data-color={color} data-pattern={seriesIndex % 3} points={points} />;
          })}
        </svg>
        <div className="arcsyn-chart__points">
          {series.flatMap((item, seriesIndex) => data.map((datum, index) => {
            const value = Number(datum[item.key]) || 0;
            const x = 8 + index * (88 / Math.max(1, data.length - 1));
            const y = yPosition(value, min, max);
            const point = { x, y, label: `${item.label} · ${formatLabel?.(datum[xKey], datum) ?? String(datum[xKey])}`, value: item.formatValue?.(value, datum) ?? value };
            return <button key={`${item.key}-${index}`} type="button" className="arcsyn-chart__point" data-color={item.color ?? chartColors[seriesIndex % chartColors.length]} style={{ left: `${x}%`, top: `${y}%` }} aria-label={`${String(point.label)}: ${String(point.value)}`} onFocus={() => setActive(point)} onBlur={() => setActive(null)} onMouseEnter={() => setActive(point)} onMouseLeave={() => setActive(null)} onClick={() => setActive(point)} />;
          }))}
          {active ? <ChartTooltip label={active.label} value={active.value} style={{ left: `${active.x}%`, top: `${active.y}%` }} /> : null}
        </div>
      </div>
      <ChartXAxis data={data} xKey={xKey} />
      {legend ? <ChartLegend className="arcsyn-chart-legend--bottom" items={series.map((item, index) => ({ key: item.key, label: item.label, color: item.color ?? chartColors[index % chartColors.length] }))} /> : null}
      <AccessibleTable data={data} xKey={xKey} series={series} label={label} />
    </div>
  );
}

export interface BarChartProps<T extends Datum> extends CommonChartProps<T> { orientation?: "vertical" | "horizontal"; }
export function BarChart<T extends Datum>({ data, xKey, series, orientation = "vertical", height = 240, state = "ready", legend = true, formatLabel, emptyState, errorState, className, "aria-label": ariaLabel, ...props }: BarChartProps<T>) {
  const label = ariaLabel ?? "Gráfico de barras";
  const [active, setActive] = useState<ActivePoint | null>(null);
  const values = numericValues(data, series);
  const { min, max } = domain(values);
  const resolvedState = state === "ready" && data.length === 0 ? "empty" : state;
  if (resolvedState !== "ready") return <div className={cx("arcsyn-chart", className)} style={{ minHeight: height }} {...props}>{stateContent(resolvedState, emptyState, errorState)}</div>;
  const groups = Math.max(1, data.length);
  const barWidth = 80 / groups / Math.max(1, series.length);
  return (
    <div className={cx("arcsyn-chart", className)} data-orientation={orientation} style={{ height }} aria-label={label} role="group" {...props}>
      <div className="arcsyn-chart__plot">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" role="img" aria-hidden="true">
          {data.flatMap((datum, dataIndex) => series.map((item, seriesIndex) => {
            const value = Number(datum[item.key]) || 0;
            const color = item.color ?? chartColors[seriesIndex % chartColors.length];
            if (orientation === "horizontal") {
              const rowHeight = 80 / (groups * series.length);
              const y = 8 + (dataIndex * series.length + seriesIndex) * rowHeight;
              const width = ((value - min) / (max - min)) * 84;
              return <rect key={`${item.key}-${dataIndex}`} data-color={color} x="8" y={y} width={Math.max(.5, width)} height={rowHeight * .72} rx="1" />;
            }
            const zero = yPosition(0, min, max);
            const top = yPosition(value, min, max);
            return <rect key={`${item.key}-${dataIndex}`} data-color={color} x={10 + dataIndex * (80 / groups) + seriesIndex * barWidth} y={Math.min(zero, top)} width={barWidth * .75} height={Math.max(.5, Math.abs(zero - top))} rx="1" />;
          }))}
        </svg>
        <div className="arcsyn-chart__bar-targets">
          {data.flatMap((datum, dataIndex) => series.map((item, seriesIndex) => {
            const value = Number(datum[item.key]) || 0;
            const x = orientation === "vertical" ? 10 + dataIndex * (80 / groups) + (seriesIndex + .5) * barWidth : 50;
            const y = orientation === "vertical" ? yPosition(value, min, max) : 8 + ((dataIndex * series.length + seriesIndex + .5) * 80 / (groups * series.length));
            const point = { x, y, label: `${item.label} · ${formatLabel?.(datum[xKey], datum) ?? String(datum[xKey])}`, value: item.formatValue?.(value, datum) ?? value };
            return <button key={`${item.key}-${dataIndex}`} type="button" style={{ left: `${x}%`, top: `${y}%` }} aria-label={`${String(point.label)}: ${String(point.value)}`} onFocus={() => setActive(point)} onBlur={() => setActive(null)} onMouseEnter={() => setActive(point)} onMouseLeave={() => setActive(null)} onClick={() => setActive(point)} />;
          }))}
          {active ? <ChartTooltip label={active.label} value={active.value} style={{ left: `${active.x}%`, top: `${active.y}%` }} /> : null}
        </div>
      </div>
      <ChartXAxis data={data} xKey={xKey} />
      {legend ? <ChartLegend className="arcsyn-chart-legend--bottom" items={series.map((item, index) => ({ key: item.key, label: item.label, color: item.color ?? chartColors[index % chartColors.length] }))} /> : null}
      <AccessibleTable data={data} xKey={xKey} series={series} label={label} />
    </div>
  );
}

export interface SparklineProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  values: readonly number[];
  sentiment?: "positive" | "negative" | "neutral";
  height?: number;
}
export function Sparkline({ values, sentiment = "neutral", height = 40, className, "aria-label": ariaLabel, ...props }: SparklineProps) {
  const id = useId();
  const points = useMemo(() => {
    const { min, max } = domain(values);
    return values.map((value, index) => `${index * (100 / Math.max(1, values.length - 1))},${100 - ((value - min) / (max - min)) * 92 - 4}`).join(" ");
  }, [values]);
  return <div className={cx("arcsyn-sparkline", className)} data-sentiment={sentiment} style={{ height }} role="img" aria-label={ariaLabel ?? `Tendência: ${values.join(", ")}`} {...props}><svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="currentColor" stopOpacity=".18" /><stop offset="1" stopColor="currentColor" stopOpacity="0" /></linearGradient></defs><polygon points={`0,100 ${points} 100,100`} fill={`url(#${id})`} /><polyline points={points} /></svg></div>;
}
