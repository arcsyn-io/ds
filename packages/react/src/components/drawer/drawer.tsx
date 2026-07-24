import { Drawer as BaseDrawer } from "@base-ui/react/drawer";
import { createContext, forwardRef, useContext, type ComponentPropsWithoutRef, type HTMLAttributes } from "react";
import { cx } from "../../utilities/cx.js";
import type { ButtonSize, ButtonVariant } from "../button/button.js";

export type DrawerSide = "top" | "right" | "bottom" | "left";

const DrawerSideContext = createContext<DrawerSide>("right");

const drawerSwipeDirection = {
  top: "up",
  right: "right",
  bottom: "down",
  left: "left",
} as const;

type DrawerPrimitiveRootProps = ComponentPropsWithoutRef<typeof BaseDrawer.Root>;

export interface DrawerRootProps extends Omit<DrawerPrimitiveRootProps, "swipeDirection"> {
  side?: DrawerSide;
}

export function DrawerRoot({ side = "right", children, ...props }: DrawerRootProps) {
  return (
    <DrawerSideContext.Provider value={side}>
      <BaseDrawer.Root swipeDirection={drawerSwipeDirection[side]} {...props}>
        {children}
      </BaseDrawer.Root>
    </DrawerSideContext.Provider>
  );
}

type DrawerPrimitiveTriggerProps = Omit<ComponentPropsWithoutRef<typeof BaseDrawer.Trigger>, "className">;

export interface DrawerTriggerProps extends DrawerPrimitiveTriggerProps {
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const DrawerTrigger = forwardRef<HTMLButtonElement, DrawerTriggerProps>(function DrawerTrigger(
  { className, variant = "secondary", size = "md", ...props },
  ref,
) {
  return <BaseDrawer.Trigger ref={ref} className={cx("arcsyn-button", className)} data-variant={variant} data-size={size} {...props} />;
});

type DrawerPrimitivePopupProps = Omit<ComponentPropsWithoutRef<typeof BaseDrawer.Popup>, "className">;

export interface DrawerContentProps extends DrawerPrimitivePopupProps {
  className?: string;
}

export const DrawerContent = forwardRef<HTMLDivElement, DrawerContentProps>(function DrawerContent(
  { className, children, ...props },
  ref,
) {
  const side = useContext(DrawerSideContext);

  return (
    <BaseDrawer.Portal>
      <BaseDrawer.Backdrop className="arcsyn-drawer__backdrop" />
      <BaseDrawer.Viewport className="arcsyn-drawer__viewport" data-side={side}>
        <BaseDrawer.Popup ref={ref} className={cx("arcsyn-drawer", className)} data-side={side} {...props}>
          <BaseDrawer.Content className="arcsyn-drawer__content">{children}</BaseDrawer.Content>
        </BaseDrawer.Popup>
      </BaseDrawer.Viewport>
    </BaseDrawer.Portal>
  );
});

export type DrawerHandleProps = HTMLAttributes<HTMLDivElement>;

export const DrawerHandle = forwardRef<HTMLDivElement, DrawerHandleProps>(function DrawerHandle({ className, ...props }, ref) {
  return <div ref={ref} className={cx("arcsyn-drawer__handle", className)} aria-hidden="true" {...props} />;
});

export type DrawerHeaderProps = HTMLAttributes<HTMLDivElement>;

export const DrawerHeader = forwardRef<HTMLDivElement, DrawerHeaderProps>(function DrawerHeader({ className, ...props }, ref) {
  return <div ref={ref} className={cx("arcsyn-drawer__header", className)} {...props} />;
});

type DrawerPrimitiveTitleProps = Omit<ComponentPropsWithoutRef<typeof BaseDrawer.Title>, "className">;

export interface DrawerTitleProps extends DrawerPrimitiveTitleProps {
  className?: string;
}

export const DrawerTitle = forwardRef<HTMLHeadingElement, DrawerTitleProps>(function DrawerTitle({ className, ...props }, ref) {
  return <BaseDrawer.Title ref={ref} className={cx("arcsyn-drawer__title", className)} {...props} />;
});

type DrawerPrimitiveDescriptionProps = Omit<ComponentPropsWithoutRef<typeof BaseDrawer.Description>, "className">;

export interface DrawerDescriptionProps extends DrawerPrimitiveDescriptionProps {
  className?: string;
}

export const DrawerDescription = forwardRef<HTMLParagraphElement, DrawerDescriptionProps>(function DrawerDescription(
  { className, ...props },
  ref,
) {
  return <BaseDrawer.Description ref={ref} className={cx("arcsyn-drawer__description", className)} {...props} />;
});

export type DrawerBodyProps = HTMLAttributes<HTMLDivElement>;

export const DrawerBody = forwardRef<HTMLDivElement, DrawerBodyProps>(function DrawerBody({ className, ...props }, ref) {
  return <div ref={ref} className={cx("arcsyn-drawer__body", className)} {...props} />;
});

export type DrawerFooterProps = HTMLAttributes<HTMLDivElement>;

export const DrawerFooter = forwardRef<HTMLDivElement, DrawerFooterProps>(function DrawerFooter({ className, ...props }, ref) {
  return <div ref={ref} className={cx("arcsyn-drawer__footer", className)} {...props} />;
});

type DrawerPrimitiveCloseProps = Omit<ComponentPropsWithoutRef<typeof BaseDrawer.Close>, "className">;

export interface DrawerCloseProps extends DrawerPrimitiveCloseProps {
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const DrawerClose = forwardRef<HTMLButtonElement, DrawerCloseProps>(function DrawerClose(
  { className, variant = "secondary", size = "md", ...props },
  ref,
) {
  return <BaseDrawer.Close ref={ref} className={cx("arcsyn-button", className)} data-variant={variant} data-size={size} {...props} />;
});

export const Drawer = {
  Root: DrawerRoot,
  Trigger: DrawerTrigger,
  Content: DrawerContent,
  Handle: DrawerHandle,
  Header: DrawerHeader,
  Title: DrawerTitle,
  Description: DrawerDescription,
  Body: DrawerBody,
  Footer: DrawerFooter,
  Close: DrawerClose,
};
