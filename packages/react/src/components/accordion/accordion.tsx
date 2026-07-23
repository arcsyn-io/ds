import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { cx } from "../../utilities/cx.js";

export type AccordionRootProps<Value = string> = ComponentPropsWithoutRef<typeof BaseAccordion.Root<Value>>;
export function AccordionRoot<Value = string>({ className, ...props }: AccordionRootProps<Value>) { return <BaseAccordion.Root className={(state) => cx("arcsyn-accordion", typeof className === "function" ? className(state) : className)} {...props} />; }
export type AccordionItemProps = ComponentPropsWithoutRef<typeof BaseAccordion.Item>;
export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(function AccordionItem({ className, ...props }, ref) { return <BaseAccordion.Item ref={ref} className={(state) => cx("arcsyn-accordion__item", typeof className === "function" ? className(state) : className)} {...props} />; });
export type AccordionHeaderProps = ComponentPropsWithoutRef<typeof BaseAccordion.Header>;
export const AccordionHeader = forwardRef<HTMLHeadingElement, AccordionHeaderProps>(function AccordionHeader({ className, ...props }, ref) { return <BaseAccordion.Header ref={ref} className={(state) => cx("arcsyn-accordion__header", typeof className === "function" ? className(state) : className)} {...props} />; });
export type AccordionTriggerProps = ComponentPropsWithoutRef<typeof BaseAccordion.Trigger>;
export const AccordionTrigger = forwardRef<HTMLElement, AccordionTriggerProps>(function AccordionTrigger({ className, children, ...props }, ref) { return <BaseAccordion.Trigger ref={ref} className={(state) => cx("arcsyn-accordion__trigger", typeof className === "function" ? className(state) : className)} {...props}>{children}<span aria-hidden className="arcsyn-accordion__icon">+</span></BaseAccordion.Trigger>; });
export type AccordionPanelProps = ComponentPropsWithoutRef<typeof BaseAccordion.Panel>;
export const AccordionPanel = forwardRef<HTMLDivElement, AccordionPanelProps>(function AccordionPanel({ className, children, ...props }, ref) { return <BaseAccordion.Panel ref={ref} className={(state) => cx("arcsyn-accordion__panel", typeof className === "function" ? className(state) : className)} {...props}><div className="arcsyn-accordion__content">{children}</div></BaseAccordion.Panel>; });
export const Accordion = { Root: AccordionRoot, Item: AccordionItem, Header: AccordionHeader, Trigger: AccordionTrigger, Panel: AccordionPanel };
