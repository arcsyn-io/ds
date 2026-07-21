import { forwardRef, type HTMLAttributes, type LabelHTMLAttributes } from "react";
import { cx } from "../../utilities/cx.js";

export type FieldRootProps = HTMLAttributes<HTMLDivElement>;

export const FieldRoot = forwardRef<HTMLDivElement, FieldRootProps>(function FieldRoot({ className, ...props }, ref) {
  return <div ref={ref} className={cx("arcsyn-field", className)} {...props} />;
});

export type FieldLabelProps = LabelHTMLAttributes<HTMLLabelElement>;

export const FieldLabel = forwardRef<HTMLLabelElement, FieldLabelProps>(function FieldLabel({ className, ...props }, ref) {
  return <label ref={ref} className={cx("arcsyn-field__label", className)} {...props} />;
});

export type FieldDescriptionProps = HTMLAttributes<HTMLParagraphElement>;

export const FieldDescription = forwardRef<HTMLParagraphElement, FieldDescriptionProps>(function FieldDescription({ className, ...props }, ref) {
  return <p ref={ref} className={cx("arcsyn-field__description", className)} {...props} />;
});

export type FieldErrorProps = HTMLAttributes<HTMLParagraphElement>;

export const FieldError = forwardRef<HTMLParagraphElement, FieldErrorProps>(function FieldError({ className, ...props }, ref) {
  return <p ref={ref} role="alert" className={cx("arcsyn-field__error", className)} {...props} />;
});

export const Field = {
  Root: FieldRoot,
  Label: FieldLabel,
  Description: FieldDescription,
  Error: FieldError,
};
