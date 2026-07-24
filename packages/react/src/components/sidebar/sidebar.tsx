import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import {
  Children,
  cloneElement,
  createContext,
  forwardRef,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ButtonHTMLAttributes,
  type CSSProperties,
  type Dispatch,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type LiHTMLAttributes,
  type ReactElement,
  type ReactNode,
  type SetStateAction,
} from "react";
import { PanelLeftIcon } from "../../icons/index.js";
import { cx } from "../../utilities/cx.js";
import { Skeleton } from "../skeleton/index.js";

export type SidebarState = "expanded" | "collapsed";
export type SidebarSide = "left" | "right";
export type SidebarVariant = "sidebar" | "floating" | "inset";
export type SidebarCollapsible = "offcanvas" | "icon" | "none";
export type SidebarMenuButtonSize = "sm" | "md" | "lg";

type OpenUpdater = boolean | ((current: boolean) => boolean);

export interface SidebarContextValue {
  state: SidebarState;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  openMobile: boolean;
  setOpenMobile: Dispatch<SetStateAction<boolean>>;
  isMobile: boolean;
  toggleSidebar: () => void;
  sidebarVariables: SidebarCSSVariables;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) throw new Error("useSidebar deve ser usado dentro de SidebarProvider.");
  return context;
}

export type SidebarCSSVariables = CSSProperties & {
  "--arcsyn-sidebar-width"?: string | number;
  "--arcsyn-sidebar-width-mobile"?: string | number;
  "--arcsyn-sidebar-width-icon"?: string | number;
};

export interface SidebarProviderProps extends Omit<HTMLAttributes<HTMLDivElement>, "style"> {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpenMobile?: boolean;
  keyboardShortcut?: string | false;
  mobileBreakpoint?: number;
  style?: SidebarCSSVariables;
}

export const SidebarProvider = forwardRef<HTMLDivElement, SidebarProviderProps>(function SidebarProvider(
  {
    defaultOpen = true,
    open: controlledOpen,
    onOpenChange,
    defaultOpenMobile = false,
    keyboardShortcut = "b",
    mobileBreakpoint = 768,
    className,
    children,
    style,
    ...props
  },
  ref,
) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const [openMobile, setOpenMobile] = useState(defaultOpenMobile);
  const [isMobile, setIsMobile] = useState(false);
  const open = controlledOpen ?? uncontrolledOpen;

  const setOpen = useCallback<Dispatch<SetStateAction<boolean>>>(
    (next: OpenUpdater) => {
      const nextOpen = typeof next === "function" ? next(open) : next;
      if (controlledOpen === undefined) setUncontrolledOpen(nextOpen);
      onOpenChange?.(nextOpen);
    },
    [controlledOpen, onOpenChange, open],
  );

  const toggleSidebar = useCallback(() => {
    if (isMobile) setOpenMobile((current) => !current);
    else setOpen((current) => !current);
  }, [isMobile, setOpen]);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${mobileBreakpoint - 0.02}px)`);
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [mobileBreakpoint]);

  useEffect(() => {
    if (!keyboardShortcut) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === keyboardShortcut.toLowerCase() && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [keyboardShortcut, toggleSidebar]);

  useEffect(() => {
    if (!isMobile) setOpenMobile(false);
  }, [isMobile]);

  const context = useMemo<SidebarContextValue>(
    () => ({
      state: open ? "expanded" : "collapsed",
      open,
      setOpen,
      openMobile,
      setOpenMobile,
      isMobile,
      toggleSidebar,
      sidebarVariables: {
        "--arcsyn-sidebar-width": style?.["--arcsyn-sidebar-width"],
        "--arcsyn-sidebar-width-mobile": style?.["--arcsyn-sidebar-width-mobile"],
        "--arcsyn-sidebar-width-icon": style?.["--arcsyn-sidebar-width-icon"],
      },
    }),
    [isMobile, open, openMobile, setOpen, style, toggleSidebar],
  );

  return (
    <SidebarContext.Provider value={context}>
      <div
        ref={ref}
        className={cx("arcsyn-sidebar-provider", className)}
        data-state={context.state}
        data-mobile={isMobile || undefined}
        style={style}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
});

export interface SidebarProps extends HTMLAttributes<HTMLElement> {
  side?: SidebarSide;
  variant?: SidebarVariant;
  collapsible?: SidebarCollapsible;
  label?: string;
}

export const Sidebar = forwardRef<HTMLElement, SidebarProps>(function Sidebar(
  {
    side = "left",
    variant = "sidebar",
    collapsible = "offcanvas",
    label = "Navegação principal",
    className,
    children,
    style,
    ...props
  },
  ref,
) {
  const { isMobile, openMobile, setOpenMobile, sidebarVariables, state } = useSidebar();
  const shared = {
    "data-side": side,
    "data-variant": variant,
    "data-collapsible": collapsible,
    "data-state": isMobile ? "expanded" : state,
  } as const;

  if (isMobile) {
    return (
      <BaseDialog.Root open={openMobile} onOpenChange={setOpenMobile}>
        <BaseDialog.Portal>
          <BaseDialog.Backdrop className="arcsyn-sidebar__backdrop" />
          <BaseDialog.Viewport className="arcsyn-sidebar__viewport">
            <BaseDialog.Popup
              ref={ref as React.ForwardedRef<HTMLDivElement>}
              aria-label={label}
              className={cx("arcsyn-sidebar", "arcsyn-sidebar--mobile", className)}
              style={{ ...sidebarVariables, ...style }}
              {...shared}
              {...props}
            >
              {children}
            </BaseDialog.Popup>
          </BaseDialog.Viewport>
        </BaseDialog.Portal>
      </BaseDialog.Root>
    );
  }

  return (
    <aside ref={ref} aria-label={label} className={cx("arcsyn-sidebar", className)} style={style} {...shared} {...props}>
      <div className="arcsyn-sidebar__panel">{children}</div>
    </aside>
  );
});

export const SidebarTrigger = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(function SidebarTrigger(
  { className, children, onClick, "aria-label": ariaLabel = "Alternar barra lateral", type = "button", ...props },
  ref,
) {
  const { open, openMobile, isMobile, toggleSidebar } = useSidebar();
  return (
    <button
      ref={ref}
      type={type}
      className={cx("arcsyn-sidebar__trigger", className)}
      aria-label={ariaLabel}
      aria-expanded={isMobile ? openMobile : open}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) toggleSidebar();
      }}
      {...props}
    >
      {children ?? <PanelLeftIcon aria-hidden size={16} />}
    </button>
  );
});

export const SidebarRail = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(function SidebarRail(
  { className, onClick, "aria-label": ariaLabel = "Alternar barra lateral", type = "button", ...props },
  ref,
) {
  const { toggleSidebar } = useSidebar();
  return (
    <button
      ref={ref}
      type={type}
      tabIndex={-1}
      className={cx("arcsyn-sidebar__rail", className)}
      aria-label={ariaLabel}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) toggleSidebar();
      }}
      {...props}
    />
  );
});

export const SidebarInset = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(function SidebarInset({ className, ...props }, ref) {
  return <main ref={ref} className={cx("arcsyn-sidebar__inset", className)} {...props} />;
});

export const SidebarHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function SidebarHeader({ className, ...props }, ref) {
  return <div ref={ref} className={cx("arcsyn-sidebar__header", className)} {...props} />;
});

export const SidebarFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function SidebarFooter({ className, ...props }, ref) {
  return <div ref={ref} className={cx("arcsyn-sidebar__footer", className)} {...props} />;
});

export const SidebarContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function SidebarContent({ className, ...props }, ref) {
  return <div ref={ref} className={cx("arcsyn-sidebar__content", className)} {...props} />;
});

export const SidebarSeparator = forwardRef<HTMLHRElement, HTMLAttributes<HTMLHRElement>>(function SidebarSeparator({ className, ...props }, ref) {
  return <hr ref={ref} className={cx("arcsyn-sidebar__separator", className)} {...props} />;
});

export const SidebarInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(function SidebarInput({ className, ...props }, ref) {
  return <input ref={ref} className={cx("arcsyn-sidebar__input", className)} {...props} />;
});

export const SidebarGroup = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function SidebarGroup({ className, ...props }, ref) {
  return <div ref={ref} className={cx("arcsyn-sidebar__group", className)} {...props} />;
});

type SlottableProps = HTMLAttributes<HTMLElement> & { asChild?: boolean };

function renderSlottable(
  element: ReactElement,
  children: ReactNode,
  asChild: boolean,
  injectedProps: Record<string, unknown>,
) {
  if (!asChild) return cloneElement(element, injectedProps);
  const child = Children.only(children);
  if (!isValidElement(child)) throw new Error("asChild exige um único elemento React válido.");
  const childProps = child.props as Record<string, unknown> & { className?: string };
  return cloneElement(child as ReactElement<Record<string, unknown>>, {
    ...injectedProps,
    ...childProps,
    className: cx(injectedProps.className as string | undefined, childProps.className),
  });
}

export interface SidebarGroupLabelProps extends SlottableProps {}
export const SidebarGroupLabel = forwardRef<HTMLElement, SidebarGroupLabelProps>(function SidebarGroupLabel(
  { className, asChild = false, children, ...props },
  ref,
) {
  return renderSlottable(<div>{children}</div>, children, asChild, {
    ref,
    className: cx("arcsyn-sidebar__group-label", className),
    ...props,
  });
});

export const SidebarGroupAction = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(function SidebarGroupAction(
  { className, type = "button", ...props },
  ref,
) {
  return <button ref={ref} type={type} className={cx("arcsyn-sidebar__group-action", className)} {...props} />;
});

export const SidebarGroupContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function SidebarGroupContent({ className, ...props }, ref) {
  return <div ref={ref} className={cx("arcsyn-sidebar__group-content", className)} {...props} />;
});

export const SidebarMenu = forwardRef<HTMLUListElement, HTMLAttributes<HTMLUListElement>>(function SidebarMenu({ className, ...props }, ref) {
  return <ul ref={ref} className={cx("arcsyn-sidebar__menu", className)} {...props} />;
});

export const SidebarMenuItem = forwardRef<HTMLLIElement, LiHTMLAttributes<HTMLLIElement>>(function SidebarMenuItem({ className, ...props }, ref) {
  return <li ref={ref} className={cx("arcsyn-sidebar__menu-item", className)} {...props} />;
});

export interface SidebarMenuButtonProps extends SlottableProps {
  isActive?: boolean;
  size?: SidebarMenuButtonSize;
  tooltip?: string;
  disabled?: boolean;
}

export const SidebarMenuButton = forwardRef<HTMLElement, SidebarMenuButtonProps>(function SidebarMenuButton(
  { className, children, asChild = false, isActive = false, size = "md", tooltip, disabled = false, ...props },
  ref,
) {
  const { state, isMobile } = useSidebar();
  const title = tooltip && state === "collapsed" && !isMobile ? tooltip : undefined;
  return renderSlottable(<button type="button">{children}</button>, children, asChild, {
    ref,
    className: cx("arcsyn-sidebar__menu-button", className),
    "data-active": isActive || undefined,
    "data-size": size,
    "aria-current": isActive ? "page" : undefined,
    "aria-disabled": disabled || undefined,
    disabled: asChild ? undefined : disabled,
    tabIndex: disabled && asChild ? -1 : undefined,
    title,
    ...props,
  });
});

export interface SidebarMenuActionProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  showOnHover?: boolean;
}

export const SidebarMenuAction = forwardRef<HTMLButtonElement, SidebarMenuActionProps>(function SidebarMenuAction(
  { className, showOnHover = false, type = "button", ...props },
  ref,
) {
  return <button ref={ref} type={type} className={cx("arcsyn-sidebar__menu-action", className)} data-show-on-hover={showOnHover || undefined} {...props} />;
});

export const SidebarMenuBadge = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(function SidebarMenuBadge({ className, ...props }, ref) {
  return <span ref={ref} className={cx("arcsyn-sidebar__menu-badge", className)} {...props} />;
});

export interface SidebarMenuSkeletonProps extends HTMLAttributes<HTMLDivElement> {
  showIcon?: boolean;
  width?: CSSProperties["width"];
}

export const SidebarMenuSkeleton = forwardRef<HTMLDivElement, SidebarMenuSkeletonProps>(function SidebarMenuSkeleton(
  { className, showIcon = false, width = "62%", style, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cx("arcsyn-sidebar__menu-skeleton", className)} style={style} {...props}>
      {showIcon ? <Skeleton width="1rem" height="1rem" /> : null}
      <Skeleton variant="text" width={width} />
    </div>
  );
});

export const SidebarMenuSub = forwardRef<HTMLUListElement, HTMLAttributes<HTMLUListElement>>(function SidebarMenuSub({ className, ...props }, ref) {
  return <ul ref={ref} className={cx("arcsyn-sidebar__menu-sub", className)} {...props} />;
});

export const SidebarMenuSubItem = forwardRef<HTMLLIElement, LiHTMLAttributes<HTMLLIElement>>(function SidebarMenuSubItem({ className, ...props }, ref) {
  return <li ref={ref} className={cx("arcsyn-sidebar__menu-sub-item", className)} {...props} />;
});

export interface SidebarMenuSubButtonProps extends SlottableProps {
  isActive?: boolean;
  size?: "sm" | "md";
}

export const SidebarMenuSubButton = forwardRef<HTMLElement, SidebarMenuSubButtonProps>(function SidebarMenuSubButton(
  { className, children, asChild = false, isActive = false, size = "md", ...props },
  ref,
) {
  return renderSlottable(<button type="button">{children}</button>, children, asChild, {
    ref,
    className: cx("arcsyn-sidebar__menu-sub-button", className),
    "data-active": isActive || undefined,
    "data-size": size,
    "aria-current": isActive ? "page" : undefined,
    ...props,
  });
});
