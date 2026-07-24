import { createElement, forwardRef, type ElementType, type HTMLAttributes } from "react";
import { cx } from "../../utilities/cx.js";

export interface PageHeaderRootProps extends HTMLAttributes<HTMLElement> {
  density?: "compact" | "default";
  sticky?: boolean;
}
const PageHeaderRoot = forwardRef<HTMLElement, PageHeaderRootProps>(function PageHeaderRoot({ className, density = "default", sticky = false, ...props }, ref) {
  return <header ref={ref} className={cx("arcsyn-page-header", className)} data-density={density} data-sticky={sticky || undefined} {...props} />;
});
function section(name: string) {
  return forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function PageHeaderSection({ className, ...props }, ref) {
    return <div ref={ref} className={cx(`arcsyn-page-header__${name}`, className)} {...props} />;
  });
}
export const PageHeaderBreadcrumb = section("breadcrumb");
export const PageHeaderContent = section("content");
export const PageHeaderMetadata = section("metadata");
export const PageHeaderActions = section("actions");
export const PageHeaderEyebrow = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(function PageHeaderEyebrow({ className, ...props }, ref) {
  return <p ref={ref} className={cx("arcsyn-page-header__eyebrow", className)} {...props} />;
});
export interface PageHeaderTitleProps extends HTMLAttributes<HTMLHeadingElement> { as?: ElementType; }
export const PageHeaderTitle = forwardRef<HTMLHeadingElement, PageHeaderTitleProps>(function PageHeaderTitle({ as = "h1", className, ...props }, ref) {
  return createElement(as, { ref, className: cx("arcsyn-page-header__title", className), ...props });
});
export const PageHeaderDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(function PageHeaderDescription({ className, ...props }, ref) {
  return <p ref={ref} className={cx("arcsyn-page-header__description", className)} {...props} />;
});
export const PageHeader = Object.assign(PageHeaderRoot, {
  Root: PageHeaderRoot,
  Breadcrumb: PageHeaderBreadcrumb,
  Content: PageHeaderContent,
  Eyebrow: PageHeaderEyebrow,
  Title: PageHeaderTitle,
  Description: PageHeaderDescription,
  Metadata: PageHeaderMetadata,
  Actions: PageHeaderActions,
});
