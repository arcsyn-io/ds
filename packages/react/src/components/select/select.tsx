import { Select as BaseSelect } from "@base-ui/react/select";
import { forwardRef, type ComponentPropsWithoutRef, type HTMLAttributes } from "react";
import { CheckIcon, ChevronDownIcon } from "../../icons/index.js";
import { cx } from "../../utilities/cx.js";

export type SelectRootProps<Value = string> = ComponentPropsWithoutRef<typeof BaseSelect.Root<Value>>;
export function SelectRoot<Value = string>(props: SelectRootProps<Value>) { return <BaseSelect.Root {...props} />; }

export type SelectTriggerProps = ComponentPropsWithoutRef<typeof BaseSelect.Trigger>;
export const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(function SelectTrigger({ className, children, ...props }, ref) {
  return <BaseSelect.Trigger ref={ref} className={(state) => cx("arcsyn-select__trigger", typeof className === "function" ? className(state) : className)} {...props}>{children}<BaseSelect.Icon className="arcsyn-select__icon"><ChevronDownIcon aria-hidden size={16} /></BaseSelect.Icon></BaseSelect.Trigger>;
});

export type SelectValueProps = ComponentPropsWithoutRef<typeof BaseSelect.Value>;
export const SelectValue = forwardRef<HTMLSpanElement, SelectValueProps>(function SelectValue({ className, ...props }, ref) { return <BaseSelect.Value ref={ref} className={(state) => cx("arcsyn-select__value", typeof className === "function" ? className(state) : className)} {...props} />; });

export type SelectContentProps = ComponentPropsWithoutRef<typeof BaseSelect.Popup>;
export const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>(function SelectContent({ className, children, ...props }, ref) {
  return <BaseSelect.Portal><BaseSelect.Backdrop className="arcsyn-select__backdrop" /><BaseSelect.Positioner className="arcsyn-select__positioner" sideOffset={4}><BaseSelect.Popup ref={ref} className={(state) => cx("arcsyn-select__popup", typeof className === "function" ? className(state) : className)} {...props}><BaseSelect.List>{children}</BaseSelect.List></BaseSelect.Popup></BaseSelect.Positioner></BaseSelect.Portal>;
});

export type SelectItemProps = ComponentPropsWithoutRef<typeof BaseSelect.Item>;
export const SelectItem = forwardRef<HTMLElement, SelectItemProps>(function SelectItem({ className, children, ...props }, ref) {
  return <BaseSelect.Item ref={ref} className={(state) => cx("arcsyn-select__item", typeof className === "function" ? className(state) : className)} {...props}><BaseSelect.ItemText>{children}</BaseSelect.ItemText><BaseSelect.ItemIndicator><CheckIcon aria-hidden size={16} /></BaseSelect.ItemIndicator></BaseSelect.Item>;
});

export type SelectGroupProps = ComponentPropsWithoutRef<typeof BaseSelect.Group>;
export const SelectGroup = BaseSelect.Group;
export type SelectGroupLabelProps = HTMLAttributes<HTMLDivElement>;
export const SelectGroupLabel = forwardRef<HTMLDivElement, SelectGroupLabelProps>(function SelectGroupLabel({ className, ...props }, ref) { return <BaseSelect.GroupLabel ref={ref} className={cx("arcsyn-select__group-label", className)} {...props} />; });

export const Select = { Root: SelectRoot, Trigger: SelectTrigger, Value: SelectValue, Content: SelectContent, Item: SelectItem, Group: SelectGroup, GroupLabel: SelectGroupLabel };
