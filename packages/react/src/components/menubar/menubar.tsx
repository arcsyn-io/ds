import { Menubar as BaseMenubar } from "@base-ui/react/menubar";
import { Menu as BaseMenu } from "@base-ui/react/menu";
import { forwardRef, type ComponentPropsWithoutRef, type HTMLAttributes } from "react";
import { cx } from "../../utilities/cx.js";

export type MenubarRootProps = ComponentPropsWithoutRef<typeof BaseMenubar>;
export const MenubarRoot = forwardRef<HTMLDivElement, MenubarRootProps>(function MenubarRoot({ className, ...props }, ref) {
  return <BaseMenubar ref={ref} data-slot="menubar" className={(state) => cx("arcsyn-menubar", typeof className === "function" ? className(state) : className)} {...props} />;
});

export type MenubarMenuProps = ComponentPropsWithoutRef<typeof BaseMenu.Root>;
export function MenubarMenu(props: MenubarMenuProps) { return <BaseMenu.Root {...props} />; }

export type MenubarTriggerProps = ComponentPropsWithoutRef<typeof BaseMenu.Trigger>;
export const MenubarTrigger = forwardRef<HTMLButtonElement, MenubarTriggerProps>(function MenubarTrigger({ className, ...props }, ref) {
  return <BaseMenu.Trigger ref={ref} data-slot="menubar-trigger" className={(state) => cx("arcsyn-menubar__trigger", typeof className === "function" ? className(state) : className)} {...props} />;
});

type PopupProps = ComponentPropsWithoutRef<typeof BaseMenu.Popup>;
type PositionerProps = Pick<ComponentPropsWithoutRef<typeof BaseMenu.Positioner>, "align" | "alignOffset" | "side" | "sideOffset">;
export type MenubarContentProps = PopupProps & PositionerProps;
export const MenubarContent = forwardRef<HTMLDivElement, MenubarContentProps>(function MenubarContent(
  { align = "start", alignOffset = 0, side = "bottom", sideOffset = 4, className, ...props },
  ref,
) {
  return <BaseMenu.Portal><BaseMenu.Positioner className="arcsyn-menubar__positioner" align={align} alignOffset={alignOffset} side={side} sideOffset={sideOffset}><BaseMenu.Popup ref={ref} data-slot="menubar-content" className={(state) => cx("arcsyn-menubar__popup", typeof className === "function" ? className(state) : className)} {...props} /></BaseMenu.Positioner></BaseMenu.Portal>;
});

export type MenubarGroupProps = ComponentPropsWithoutRef<typeof BaseMenu.Group>;
export function MenubarGroup(props: MenubarGroupProps) { return <BaseMenu.Group {...props} />; }

export type MenubarLabelProps = ComponentPropsWithoutRef<typeof BaseMenu.GroupLabel>;
export const MenubarLabel = forwardRef<HTMLDivElement, MenubarLabelProps>(function MenubarLabel({ className, ...props }, ref) {
  return <BaseMenu.GroupLabel ref={ref} className={(state) => cx("arcsyn-menubar__label", typeof className === "function" ? className(state) : className)} {...props} />;
});

export type MenubarItemVariant = "default" | "danger" | "destructive";
export type MenubarItemProps = ComponentPropsWithoutRef<typeof BaseMenu.Item> & { inset?: boolean; variant?: MenubarItemVariant };
export const MenubarItem = forwardRef<HTMLElement, MenubarItemProps>(function MenubarItem({ className, inset = false, variant = "default", ...props }, ref) {
  return <BaseMenu.Item ref={ref} data-inset={inset || undefined} data-variant={variant} className={(state) => cx("arcsyn-menubar__item", typeof className === "function" ? className(state) : className)} {...props} />;
});

export type MenubarCheckboxItemProps = ComponentPropsWithoutRef<typeof BaseMenu.CheckboxItem>;
export const MenubarCheckboxItem = forwardRef<HTMLElement, MenubarCheckboxItemProps>(function MenubarCheckboxItem({ className, children, ...props }, ref) {
  return <BaseMenu.CheckboxItem ref={ref} className={(state) => cx("arcsyn-menubar__item", typeof className === "function" ? className(state) : className)} {...props}><span className="arcsyn-menubar__indicator"><BaseMenu.CheckboxItemIndicator>&#10003;</BaseMenu.CheckboxItemIndicator></span>{children}</BaseMenu.CheckboxItem>;
});

export type MenubarRadioGroupProps = ComponentPropsWithoutRef<typeof BaseMenu.RadioGroup>;
export function MenubarRadioGroup(props: MenubarRadioGroupProps) { return <BaseMenu.RadioGroup {...props} />; }

export type MenubarRadioItemProps = ComponentPropsWithoutRef<typeof BaseMenu.RadioItem>;
export const MenubarRadioItem = forwardRef<HTMLElement, MenubarRadioItemProps>(function MenubarRadioItem({ className, children, ...props }, ref) {
  return <BaseMenu.RadioItem ref={ref} className={(state) => cx("arcsyn-menubar__item", typeof className === "function" ? className(state) : className)} {...props}><span className="arcsyn-menubar__indicator"><BaseMenu.RadioItemIndicator>&#10003;</BaseMenu.RadioItemIndicator></span>{children}</BaseMenu.RadioItem>;
});

export type MenubarSeparatorProps = ComponentPropsWithoutRef<typeof BaseMenu.Separator>;
export const MenubarSeparator = forwardRef<HTMLDivElement, MenubarSeparatorProps>(function MenubarSeparator({ className, ...props }, ref) {
  return <BaseMenu.Separator ref={ref} className={(state) => cx("arcsyn-menubar__separator", typeof className === "function" ? className(state) : className)} {...props} />;
});

export type MenubarShortcutProps = HTMLAttributes<HTMLSpanElement>;
export const MenubarShortcut = forwardRef<HTMLSpanElement, MenubarShortcutProps>(function MenubarShortcut({ className, ...props }, ref) {
  return <span ref={ref} aria-hidden="true" className={cx("arcsyn-menubar__shortcut", className)} {...props} />;
});

export const Menubar = { Root: MenubarRoot, Menu: MenubarMenu, Trigger: MenubarTrigger, Content: MenubarContent, Group: MenubarGroup, Label: MenubarLabel, Item: MenubarItem, CheckboxItem: MenubarCheckboxItem, RadioGroup: MenubarRadioGroup, RadioItem: MenubarRadioItem, Separator: MenubarSeparator, Shortcut: MenubarShortcut };
