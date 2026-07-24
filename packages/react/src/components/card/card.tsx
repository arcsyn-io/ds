import { createElement, forwardRef, type ElementType, type HTMLAttributes } from "react";
import { cx } from "../../utilities/cx.js";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
  padding?: "none" | "compact" | "default";
}

const CardRoot = forwardRef<HTMLDivElement, CardProps>(function CardRoot(
  { className, interactive = false, padding = "default", ...props },
  ref,
) {
  return <div ref={ref} className={cx("arcsyn-card", className)} data-interactive={interactive || undefined} data-padding={padding} {...props} />;
});

export type CardSectionProps = HTMLAttributes<HTMLDivElement> & { separated?: boolean };
function cardSection(name: string) {
  return forwardRef<HTMLDivElement, CardSectionProps>(function CardSection({ className, separated = false, ...props }, ref) {
    return <div ref={ref} className={cx(`arcsyn-card__${name}`, className)} data-separated={separated || undefined} {...props} />;
  });
}

export const CardHeader = cardSection("header");
export const CardHeading = cardSection("heading");
export const CardActions = cardSection("actions");
export const CardContent = cardSection("content");
export const CardFooter = cardSection("footer");

export const CardEyebrow = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(function CardEyebrow({ className, ...props }, ref) {
  return <p ref={ref} className={cx("arcsyn-card__eyebrow", className)} {...props} />;
});

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: ElementType;
}
export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(function CardTitle({ as = "h3", className, ...props }, ref) {
  return createElement(as, { ref, className: cx("arcsyn-card__title", className), ...props });
});

export const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(function CardDescription({ className, ...props }, ref) {
  return <p ref={ref} className={cx("arcsyn-card__description", className)} {...props} />;
});

export const Card = Object.assign(CardRoot, {
  Root: CardRoot,
  Header: CardHeader,
  Heading: CardHeading,
  Eyebrow: CardEyebrow,
  Title: CardTitle,
  Description: CardDescription,
  Actions: CardActions,
  Content: CardContent,
  Footer: CardFooter,
});
