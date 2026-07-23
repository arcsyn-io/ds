import { forwardRef, type AnchorHTMLAttributes, type HTMLAttributes, type LiHTMLAttributes } from "react";
import { cx } from "../../utilities/cx.js";

export type PaginationProps = HTMLAttributes<HTMLElement>;
export const Pagination = forwardRef<HTMLElement, PaginationProps>(function Pagination({ className, ...props }, ref) {
  return <nav ref={ref} aria-label="Paginação" className={cx("arcsyn-pagination", className)} {...props} />;
});

export const PaginationContent = forwardRef<HTMLUListElement, HTMLAttributes<HTMLUListElement>>(function PaginationContent({ className, ...props }, ref) {
  return <ul ref={ref} className={cx("arcsyn-pagination__content", className)} {...props} />;
});
export const PaginationItem = forwardRef<HTMLLIElement, LiHTMLAttributes<HTMLLIElement>>(function PaginationItem({ className, ...props }, ref) {
  return <li ref={ref} className={cx("arcsyn-pagination__item", className)} {...props} />;
});

export interface PaginationLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> { active?: boolean; }
export const PaginationLink = forwardRef<HTMLAnchorElement, PaginationLinkProps>(function PaginationLink({ className, active = false, ...props }, ref) {
  return <a ref={ref} className={cx("arcsyn-pagination__link", className)} aria-current={active ? "page" : undefined} data-active={active || undefined} {...props} />;
});

export const PaginationPrevious = forwardRef<HTMLAnchorElement, PaginationLinkProps>(function PaginationPrevious({ children = "Anterior", className, ...props }, ref) {
  return <PaginationLink ref={ref} className={cx("arcsyn-pagination__link--wide", className)} aria-label="Ir para a página anterior" {...props}><span aria-hidden>←</span>{children}</PaginationLink>;
});
export const PaginationNext = forwardRef<HTMLAnchorElement, PaginationLinkProps>(function PaginationNext({ children = "Próxima", className, ...props }, ref) {
  return <PaginationLink ref={ref} className={cx("arcsyn-pagination__link--wide", className)} aria-label="Ir para a próxima página" {...props}>{children}<span aria-hidden>→</span></PaginationLink>;
});
export const PaginationEllipsis = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(function PaginationEllipsis({ className, ...props }, ref) {
  return <span ref={ref} className={cx("arcsyn-pagination__ellipsis", className)} aria-hidden="true" {...props}>…</span>;
});
