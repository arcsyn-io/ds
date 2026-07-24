import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";
import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { cx } from "../../utilities/cx.js";

export type TooltipProviderProps = ComponentPropsWithoutRef<typeof BaseTooltip.Provider>;

export function TooltipProvider({ delay = 500, closeDelay = 100, ...props }: TooltipProviderProps) {
  return <BaseTooltip.Provider delay={delay} closeDelay={closeDelay} {...props} />;
}

export type TooltipRootProps = ComponentPropsWithoutRef<typeof BaseTooltip.Root>;

export function TooltipRoot(props: TooltipRootProps) {
  return <BaseTooltip.Root {...props} />;
}

export type TooltipTriggerProps = ComponentPropsWithoutRef<typeof BaseTooltip.Trigger>;

export const TooltipTrigger = forwardRef<HTMLButtonElement, TooltipTriggerProps>(function TooltipTrigger(
  { className, ...props },
  ref,
) {
  return (
    <BaseTooltip.Trigger
      ref={ref}
      className={(state) => cx("arcsyn-tooltip__trigger", typeof className === "function" ? className(state) : className)}
      {...props}
    />
  );
});

type TooltipPrimitivePositionerProps = ComponentPropsWithoutRef<typeof BaseTooltip.Positioner>;
type TooltipPrimitivePopupProps = Omit<ComponentPropsWithoutRef<typeof BaseTooltip.Popup>, "className">;

export interface TooltipContentProps extends TooltipPrimitivePopupProps {
  align?: TooltipPrimitivePositionerProps["align"];
  alignOffset?: TooltipPrimitivePositionerProps["alignOffset"];
  className?: string;
  side?: TooltipPrimitivePositionerProps["side"];
  sideOffset?: TooltipPrimitivePositionerProps["sideOffset"];
}

export const TooltipContent = forwardRef<HTMLDivElement, TooltipContentProps>(function TooltipContent(
  { align = "center", alignOffset, className, side = "top", sideOffset = 8, ...props },
  ref,
) {
  return (
    <BaseTooltip.Portal>
      <BaseTooltip.Positioner
        align={align}
        alignOffset={alignOffset}
        className="arcsyn-tooltip__positioner"
        side={side}
        sideOffset={sideOffset}
      >
        <BaseTooltip.Popup ref={ref} className={cx("arcsyn-tooltip", className)} {...props} />
      </BaseTooltip.Positioner>
    </BaseTooltip.Portal>
  );
});

export type TooltipArrowProps = ComponentPropsWithoutRef<typeof BaseTooltip.Arrow>;

export const TooltipArrow = forwardRef<HTMLDivElement, TooltipArrowProps>(function TooltipArrow(
  { className, ...props },
  ref,
) {
  return (
    <BaseTooltip.Arrow
      ref={ref}
      className={(state) => cx("arcsyn-tooltip__arrow", typeof className === "function" ? className(state) : className)}
      {...props}
    />
  );
});

export const Tooltip = {
  Provider: TooltipProvider,
  Root: TooltipRoot,
  Trigger: TooltipTrigger,
  Content: TooltipContent,
  Arrow: TooltipArrow,
};
