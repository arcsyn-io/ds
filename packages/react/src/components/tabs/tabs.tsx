import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import { forwardRef, type ComponentPropsWithoutRef, type HTMLAttributes } from "react";
import { cx } from "../../utilities/cx.js";

type TabsPrimitiveRootProps = Omit<ComponentPropsWithoutRef<typeof BaseTabs.Root>, "className">;

export interface TabsRootProps extends TabsPrimitiveRootProps {
  className?: string;
}

export const TabsRoot = forwardRef<HTMLDivElement, TabsRootProps>(function TabsRoot({ className, ...props }, ref) {
  return <BaseTabs.Root ref={ref} className={cx("arcsyn-tabs", className)} {...props} />;
});

type TabsPrimitiveListProps = Omit<ComponentPropsWithoutRef<typeof BaseTabs.List>, "className">;

export interface TabsListProps extends TabsPrimitiveListProps {
  className?: string;
}

export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(function TabsList({ className, ...props }, ref) {
  return <BaseTabs.List ref={ref} className={cx("arcsyn-tabs__list", className)} {...props} />;
});

type TabsPrimitiveTabProps = Omit<ComponentPropsWithoutRef<typeof BaseTabs.Tab>, "className">;

export interface TabsTabProps extends TabsPrimitiveTabProps {
  className?: string;
}

export const TabsTab = forwardRef<HTMLButtonElement, TabsTabProps>(function TabsTab({ className, ...props }, ref) {
  return <BaseTabs.Tab ref={ref} className={cx("arcsyn-tabs__tab", className)} {...props} />;
});

type TabsPrimitiveIndicatorProps = Omit<ComponentPropsWithoutRef<typeof BaseTabs.Indicator>, "className">;

export interface TabsIndicatorProps extends TabsPrimitiveIndicatorProps {
  className?: string;
}

export const TabsIndicator = forwardRef<HTMLSpanElement, TabsIndicatorProps>(function TabsIndicator({ className, ...props }, ref) {
  return <BaseTabs.Indicator ref={ref} className={cx("arcsyn-tabs__indicator", className)} {...props} />;
});

export type TabsPanelsProps = HTMLAttributes<HTMLDivElement>;

export const TabsPanels = forwardRef<HTMLDivElement, TabsPanelsProps>(function TabsPanels({ className, ...props }, ref) {
  return <div ref={ref} className={cx("arcsyn-tabs__panels", className)} {...props} />;
});

type TabsPrimitivePanelProps = Omit<ComponentPropsWithoutRef<typeof BaseTabs.Panel>, "className">;

export interface TabsPanelProps extends TabsPrimitivePanelProps {
  className?: string;
}

export const TabsPanel = forwardRef<HTMLDivElement, TabsPanelProps>(function TabsPanel({ className, ...props }, ref) {
  return <BaseTabs.Panel ref={ref} className={cx("arcsyn-tabs__panel", className)} {...props} />;
});

export const Tabs = {
  Root: TabsRoot,
  List: TabsList,
  Tab: TabsTab,
  Indicator: TabsIndicator,
  Panels: TabsPanels,
  Panel: TabsPanel,
};
