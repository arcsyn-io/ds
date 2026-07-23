import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { forwardRef, type ComponentPropsWithoutRef, type HTMLAttributes } from "react";
import { cx } from "../../utilities/cx.js";
import type { ButtonSize, ButtonVariant } from "../button/button.js";

export type DropdownMenuRootProps = ComponentPropsWithoutRef<typeof MenuPrimitive.Root>;
export function DropdownMenuRoot(props: DropdownMenuRootProps) {
  return <MenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}

export type DropdownMenuPortalProps = ComponentPropsWithoutRef<typeof MenuPrimitive.Portal>;
export function DropdownMenuPortal(props: DropdownMenuPortalProps) {
  return <MenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />;
}

type TriggerPrimitiveProps = Omit<ComponentPropsWithoutRef<typeof MenuPrimitive.Trigger>, "className">;
export interface DropdownMenuTriggerProps extends TriggerPrimitiveProps {
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
}
export const DropdownMenuTrigger = forwardRef<HTMLButtonElement, DropdownMenuTriggerProps>(function DropdownMenuTrigger(
  { className, variant = "secondary", size = "md", ...props },
  ref,
) {
  return (
    <MenuPrimitive.Trigger
      ref={ref}
      data-slot="dropdown-menu-trigger"
      className={cx("arcsyn-button", "arcsyn-dropdown-menu__trigger", className)}
      data-variant={variant}
      data-size={size}
      {...props}
    />
  );
});

type PopupPrimitiveProps = ComponentPropsWithoutRef<typeof MenuPrimitive.Popup>;
type PositionerProps = Pick<ComponentPropsWithoutRef<typeof MenuPrimitive.Positioner>, "align" | "alignOffset" | "side" | "sideOffset">;
export type DropdownMenuContentProps = PopupPrimitiveProps & PositionerProps;
export const DropdownMenuContent = forwardRef<HTMLDivElement, DropdownMenuContentProps>(function DropdownMenuContent(
  { align = "start", alignOffset = 0, side = "bottom", sideOffset = 4, className, ...props },
  ref,
) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        className="arcsyn-dropdown-menu__positioner"
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
      >
        <MenuPrimitive.Popup
          ref={ref}
          data-slot="dropdown-menu-content"
          className={(state) => cx("arcsyn-dropdown-menu__popup", typeof className === "function" ? className(state) : className)}
          {...props}
        />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  );
});

export type DropdownMenuGroupProps = ComponentPropsWithoutRef<typeof MenuPrimitive.Group>;
export function DropdownMenuGroup(props: DropdownMenuGroupProps) {
  return <MenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />;
}

export type DropdownMenuLabelProps = ComponentPropsWithoutRef<typeof MenuPrimitive.GroupLabel> & { inset?: boolean };
export const DropdownMenuLabel = forwardRef<HTMLDivElement, DropdownMenuLabelProps>(function DropdownMenuLabel(
  { className, inset = false, ...props },
  ref,
) {
  return <MenuPrimitive.GroupLabel ref={ref} data-slot="dropdown-menu-label" data-inset={inset || undefined} className={(state) => cx("arcsyn-dropdown-menu__label", typeof className === "function" ? className(state) : className)} {...props} />;
});

export type DropdownMenuItemVariant = "default" | "danger" | "destructive";
type ItemPrimitiveProps = Omit<ComponentPropsWithoutRef<typeof MenuPrimitive.Item>, "className">;
export interface DropdownMenuItemProps extends ItemPrimitiveProps { className?: string; variant?: DropdownMenuItemVariant; inset?: boolean; }
export const DropdownMenuItem = forwardRef<HTMLElement, DropdownMenuItemProps>(function DropdownMenuItem(
  { className, variant = "default", inset = false, ...props },
  ref,
) {
  return <MenuPrimitive.Item ref={ref} data-slot="dropdown-menu-item" className={cx("arcsyn-dropdown-menu__item", className)} data-variant={variant} data-inset={inset || undefined} {...props} />;
});

export type DropdownMenuSubProps = ComponentPropsWithoutRef<typeof MenuPrimitive.SubmenuRoot>;
export function DropdownMenuSub(props: DropdownMenuSubProps) {
  return <MenuPrimitive.SubmenuRoot {...props} />;
}

export type DropdownMenuSubTriggerProps = ComponentPropsWithoutRef<typeof MenuPrimitive.SubmenuTrigger> & { inset?: boolean };
export const DropdownMenuSubTrigger = forwardRef<HTMLElement, DropdownMenuSubTriggerProps>(function DropdownMenuSubTrigger(
  { className, inset = false, children, ...props },
  ref,
) {
  return <MenuPrimitive.SubmenuTrigger ref={ref} data-slot="dropdown-menu-sub-trigger" data-inset={inset || undefined} className={(state) => cx("arcsyn-dropdown-menu__item", "arcsyn-dropdown-menu__sub-trigger", typeof className === "function" ? className(state) : className)} {...props}>{children}<span aria-hidden className="arcsyn-dropdown-menu__sub-icon">›</span></MenuPrimitive.SubmenuTrigger>;
});

export type DropdownMenuSubContentProps = DropdownMenuContentProps;
export const DropdownMenuSubContent = forwardRef<HTMLDivElement, DropdownMenuSubContentProps>(function DropdownMenuSubContent(
  { align = "start", alignOffset = -3, side = "right", sideOffset = 0, className, ...props },
  ref,
) {
  return <DropdownMenuContent ref={ref} data-slot="dropdown-menu-sub-content" align={align} alignOffset={alignOffset} side={side} sideOffset={sideOffset} className={(state) => cx("arcsyn-dropdown-menu__popup--sub", typeof className === "function" ? className(state) : className)} {...props} />;
});

type CheckboxPrimitiveProps = Omit<ComponentPropsWithoutRef<typeof MenuPrimitive.CheckboxItem>, "className">;
export interface DropdownMenuCheckboxItemProps extends CheckboxPrimitiveProps { className?: string; inset?: boolean; }
export const DropdownMenuCheckboxItem = forwardRef<HTMLElement, DropdownMenuCheckboxItemProps>(function DropdownMenuCheckboxItem(
  { className, children, inset = false, ...props },
  ref,
) {
  return <MenuPrimitive.CheckboxItem ref={ref} data-slot="dropdown-menu-checkbox-item" data-inset={inset || undefined} className={cx("arcsyn-dropdown-menu__item", className)} {...props}><span className="arcsyn-dropdown-menu__indicator"><MenuPrimitive.CheckboxItemIndicator>✓</MenuPrimitive.CheckboxItemIndicator></span>{children}</MenuPrimitive.CheckboxItem>;
});

export type DropdownMenuRadioGroupProps = ComponentPropsWithoutRef<typeof MenuPrimitive.RadioGroup>;
export function DropdownMenuRadioGroup(props: DropdownMenuRadioGroupProps) {
  return <MenuPrimitive.RadioGroup data-slot="dropdown-menu-radio-group" {...props} />;
}

type RadioPrimitiveProps = Omit<ComponentPropsWithoutRef<typeof MenuPrimitive.RadioItem>, "className">;
export interface DropdownMenuRadioItemProps extends RadioPrimitiveProps { className?: string; inset?: boolean; }
export const DropdownMenuRadioItem = forwardRef<HTMLElement, DropdownMenuRadioItemProps>(function DropdownMenuRadioItem(
  { className, children, inset = false, ...props },
  ref,
) {
  return <MenuPrimitive.RadioItem ref={ref} data-slot="dropdown-menu-radio-item" data-inset={inset || undefined} className={cx("arcsyn-dropdown-menu__item", className)} {...props}><span className="arcsyn-dropdown-menu__indicator"><MenuPrimitive.RadioItemIndicator>✓</MenuPrimitive.RadioItemIndicator></span>{children}</MenuPrimitive.RadioItem>;
});

export type DropdownMenuSeparatorProps = ComponentPropsWithoutRef<typeof MenuPrimitive.Separator>;
export const DropdownMenuSeparator = forwardRef<HTMLDivElement, DropdownMenuSeparatorProps>(function DropdownMenuSeparator({ className, ...props }, ref) {
  return <MenuPrimitive.Separator ref={ref} data-slot="dropdown-menu-separator" className={(state) => cx("arcsyn-dropdown-menu__separator", typeof className === "function" ? className(state) : className)} {...props} />;
});

export type DropdownMenuShortcutProps = HTMLAttributes<HTMLSpanElement>;
export const DropdownMenuShortcut = forwardRef<HTMLSpanElement, DropdownMenuShortcutProps>(function DropdownMenuShortcut({ className, ...props }, ref) {
  return <span ref={ref} data-slot="dropdown-menu-shortcut" className={cx("arcsyn-dropdown-menu__shortcut", className)} aria-hidden="true" {...props} />;
});

export const DropdownMenu = {
  Root: DropdownMenuRoot,
  Portal: DropdownMenuPortal,
  Trigger: DropdownMenuTrigger,
  Content: DropdownMenuContent,
  Group: DropdownMenuGroup,
  Label: DropdownMenuLabel,
  Item: DropdownMenuItem,
  CheckboxItem: DropdownMenuCheckboxItem,
  RadioGroup: DropdownMenuRadioGroup,
  RadioItem: DropdownMenuRadioItem,
  Separator: DropdownMenuSeparator,
  Shortcut: DropdownMenuShortcut,
  Sub: DropdownMenuSub,
  SubTrigger: DropdownMenuSubTrigger,
  SubContent: DropdownMenuSubContent,
};
