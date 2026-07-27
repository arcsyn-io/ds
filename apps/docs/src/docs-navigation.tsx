import type { ReactNode } from "react";
import { CheckIcon, CircleIcon } from "@arcsyn-io/react/icons";
import {
  Kbd,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarProvider,
  SidebarRail,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@arcsyn-io/react";

type ComponentNavItem = { id: string; title: string };

const componentGroups = [
  { label: "Base", ids: ["icons", "theme-switcher", "aspect-ratio", "avatar", "badge", "button", "card", "kbd", "scroll-area", "separator", "skeleton", "spinner"] },
  { label: "Formulários", ids: ["input", "input-group", "radio-group", "native-select", "select", "select-search", "textarea", "checkbox", "switch", "slider", "date-picker", "time"] },
  { label: "Navegação e menus", ids: ["accordion", "collapsible", "breadcrumb", "pagination", "tabs", "menubar", "command", "dropdown-menu", "context-menu"] },
  { label: "Overlays e layout", ids: ["dialog", "drawer", "popover", "tooltip", "sidebar", "carousel"] },
  { label: "Feedback e estados", ids: ["alert", "empty", "data-state", "status-indicator", "sonner"] },
  { label: "Dados e visualização", ids: ["data-table", "stat-card", "charts"] },
  { label: "Padrões de produto", ids: ["page-header", "search-input", "user-menu", "activity-feed", "chat", "notification-center", "attachment"] },
] as const;

function DocsSidebarLink({ active, children, href, icon }: { active: boolean; children: ReactNode; href: string; icon?: ReactNode }) {
  const { isMobile, setOpenMobile } = useSidebar();
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={active}>
        <a href={href} onClick={() => { if (isMobile) setOpenMobile(false); }}>
          {icon}
          <span>{children}</span>
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export function DocsNavigation({ route, currentPageTitle, componentPages, pageId, isTheming, isTypography, isPresentations, footer, children }: {
  route: string;
  currentPageTitle: string;
  componentPages: readonly ComponentNavItem[];
  pageId?: string;
  isTheming: boolean;
  isTypography: boolean;
  isPresentations: boolean;
  footer: ReactNode;
  children: ReactNode;
}) {
  return (
    <SidebarProvider className="docs-shell" style={{ "--arcsyn-sidebar-width": "16rem", "--arcsyn-sidebar-width-mobile": "18rem" }}>
      <Sidebar className="docs-app-sidebar" collapsible="offcanvas">
        <SidebarHeader><a className="docs-brand" href="#/" aria-label="ArcSyn Design System"><img src="/arcsyn-logo.svg" alt="" /></a></SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Fundação</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <DocsSidebarLink active={route === "/"} href="#/" icon={<CircleIcon aria-hidden size={15} />}>Visão geral</DocsSidebarLink>
                <DocsSidebarLink active={isTheming} href="#/theming" icon={<CheckIcon aria-hidden size={15} />}>Theming</DocsSidebarLink>
                <DocsSidebarLink active={isTypography} href="#/typography">Tipografia</DocsSidebarLink>
                <DocsSidebarLink active={isPresentations} href="#/presentations">Apresentações</DocsSidebarLink>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          {componentGroups.map((group) => (
            <SidebarGroup key={group.label}>
              <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.ids.map((id) => {
                    const item = componentPages.find((component) => component.id === id);
                    if (!item) return null;
                    return <DocsSidebarLink active={pageId === item.id} href={`#/components/${item.id}`} key={item.id}>{item.title}</DocsSidebarLink>;
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
        <SidebarFooter>{footer}<div className="docs-sidebar-footer"><span>v0.1.0</span><span>React</span></div></SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset className="docs-app-inset">
        <header className="docs-topbar"><SidebarTrigger /><span className="docs-topbar-title">{currentPageTitle}</span><Kbd className="docs-sidebar-shortcut">Ctrl B</Kbd></header>
        <div className="docs-main">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
