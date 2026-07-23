import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";
import { forwardRef, type ComponentPropsWithoutRef, type HTMLAttributes } from "react";
import { CheckIcon, CircleIcon } from "../../icons/index.js";
import { cx } from "../../utilities/cx.js";

export type ContextMenuRootProps = ComponentPropsWithoutRef<typeof BaseContextMenu.Root>;
export function ContextMenuRoot(props: ContextMenuRootProps) { return <BaseContextMenu.Root {...props} />; }
export type ContextMenuTriggerProps = ComponentPropsWithoutRef<typeof BaseContextMenu.Trigger>;
export const ContextMenuTrigger = forwardRef<HTMLDivElement, ContextMenuTriggerProps>(function ContextMenuTrigger({ className, ...props }, ref) {
  return <BaseContextMenu.Trigger ref={ref} className={(state) => cx("arcsyn-context-menu__trigger", typeof className === "function" ? className(state) : className)} {...props} />;
});
export type ContextMenuContentProps = ComponentPropsWithoutRef<typeof BaseContextMenu.Popup>;
export const ContextMenuContent = forwardRef<HTMLDivElement, ContextMenuContentProps>(function ContextMenuContent(
  { className, children, ...props },
  ref,
) {
  return (
    <BaseContextMenu.Portal className="arcsyn-context-menu__portal">
      <BaseContextMenu.Positioner className="arcsyn-context-menu__positioner">
        <BaseContextMenu.Popup
          ref={ref}
          className={(state) => cx("arcsyn-context-menu__popup", typeof className === "function" ? className(state) : className)}
          {...props}
        >
          {children}
        </BaseContextMenu.Popup>
      </BaseContextMenu.Positioner>
    </BaseContextMenu.Portal>
  );
});
export type ContextMenuGroupProps = ComponentPropsWithoutRef<typeof BaseContextMenu.Group>;
export const ContextMenuGroup = BaseContextMenu.Group;
export type ContextMenuLabelProps = ComponentPropsWithoutRef<typeof BaseContextMenu.GroupLabel>;
export const ContextMenuLabel = forwardRef<HTMLDivElement, ContextMenuLabelProps>(function ContextMenuLabel({ className, ...props }, ref) { return <BaseContextMenu.GroupLabel ref={ref} className={(state) => cx("arcsyn-context-menu__label", typeof className === "function" ? className(state) : className)} {...props} />; });
export type ContextMenuItemVariant = "default" | "danger";
type ItemPrimitiveProps = Omit<ComponentPropsWithoutRef<typeof BaseContextMenu.Item>, "className">;
export interface ContextMenuItemProps extends ItemPrimitiveProps { className?: string; variant?: ContextMenuItemVariant; }
export const ContextMenuItem = forwardRef<HTMLElement, ContextMenuItemProps>(function ContextMenuItem({ className, variant = "default", ...props }, ref) { return <BaseContextMenu.Item ref={ref} className={cx("arcsyn-context-menu__item", className)} data-variant={variant} {...props} />; });
type CheckboxPrimitiveProps = Omit<ComponentPropsWithoutRef<typeof BaseContextMenu.CheckboxItem>, "className">;
export interface ContextMenuCheckboxItemProps extends CheckboxPrimitiveProps { className?: string; }
export const ContextMenuCheckboxItem = forwardRef<HTMLElement, ContextMenuCheckboxItemProps>(function ContextMenuCheckboxItem({ className, children, ...props }, ref) { return <BaseContextMenu.CheckboxItem ref={ref} className={cx("arcsyn-context-menu__item", className)} {...props}><span className="arcsyn-context-menu__indicator"><BaseContextMenu.CheckboxItemIndicator><CheckIcon aria-hidden size={16} /></BaseContextMenu.CheckboxItemIndicator></span>{children}</BaseContextMenu.CheckboxItem>; });
export type ContextMenuRadioGroupProps = ComponentPropsWithoutRef<typeof BaseContextMenu.RadioGroup>;
export const ContextMenuRadioGroup = BaseContextMenu.RadioGroup;
type RadioPrimitiveProps = Omit<ComponentPropsWithoutRef<typeof BaseContextMenu.RadioItem>, "className">;
export interface ContextMenuRadioItemProps extends RadioPrimitiveProps { className?: string; }
export const ContextMenuRadioItem = forwardRef<HTMLElement, ContextMenuRadioItemProps>(function ContextMenuRadioItem({ className, children, ...props }, ref) { return <BaseContextMenu.RadioItem ref={ref} className={cx("arcsyn-context-menu__item", className)} {...props}><span className="arcsyn-context-menu__indicator"><BaseContextMenu.RadioItemIndicator><CircleIcon aria-hidden fill="currentColor" size={8} /></BaseContextMenu.RadioItemIndicator></span>{children}</BaseContextMenu.RadioItem>; });
export type ContextMenuSeparatorProps = ComponentPropsWithoutRef<typeof BaseContextMenu.Separator>;
export const ContextMenuSeparator = forwardRef<HTMLDivElement, ContextMenuSeparatorProps>(function ContextMenuSeparator({ className, ...props }, ref) { return <BaseContextMenu.Separator ref={ref} className={(state) => cx("arcsyn-context-menu__separator", typeof className === "function" ? className(state) : className)} {...props} />; });
export type ContextMenuShortcutProps = HTMLAttributes<HTMLSpanElement>;
export const ContextMenuShortcut = forwardRef<HTMLSpanElement, ContextMenuShortcutProps>(function ContextMenuShortcut({ className, ...props }, ref) { return <span ref={ref} aria-hidden="true" className={cx("arcsyn-context-menu__shortcut", className)} {...props} />; });
export const ContextMenu = { Root: ContextMenuRoot, Trigger: ContextMenuTrigger, Content: ContextMenuContent, Group: ContextMenuGroup, Label: ContextMenuLabel, Item: ContextMenuItem, CheckboxItem: ContextMenuCheckboxItem, RadioGroup: ContextMenuRadioGroup, RadioItem: ContextMenuRadioItem, Separator: ContextMenuSeparator, Shortcut: ContextMenuShortcut };
