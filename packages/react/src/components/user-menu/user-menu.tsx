import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { ChevronDownIcon, LogoutIcon } from "../../icons/index.js";
import { cx } from "../../utilities/cx.js";
import { Avatar } from "../avatar/avatar.js";
import { DropdownMenu, type DropdownMenuContentProps, type DropdownMenuRootProps } from "../dropdown-menu/dropdown-menu.js";
import { Tooltip } from "../tooltip/tooltip.js";

export interface UserMenuUser {
  id: string;
  name: string;
  description?: string;
  image?: string;
}
export type UserMenuItem =
  | { type?: "item"; id: string; label: ReactNode; icon?: ReactNode; tone?: "default" | "danger"; disabled?: boolean; onSelect?: () => void }
  | { type: "separator"; id: string }
  | { type: "label"; id: string; label: ReactNode };
export interface UserMenuProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  user: UserMenuUser;
  items: readonly UserMenuItem[];
  variant?: "default" | "compact" | "sidebar";
  collapsed?: boolean;
  open?: DropdownMenuRootProps["open"];
  defaultOpen?: DropdownMenuRootProps["defaultOpen"];
  onOpenChange?: DropdownMenuRootProps["onOpenChange"];
  align?: DropdownMenuContentProps["align"];
  side?: DropdownMenuContentProps["side"];
  menuLabel?: string;
}

export const UserMenu = forwardRef<HTMLDivElement, UserMenuProps>(function UserMenu(
  { user, items, variant = "default", collapsed = false, open, defaultOpen, onOpenChange, align = "end", side = "bottom", menuLabel, className, ...props },
  ref,
) {
  const trigger = (
    <DropdownMenu.Trigger className="arcsyn-user-menu__trigger" aria-label={menuLabel ?? `Abrir menu de ${user.name}`} variant="ghost">
      <Avatar id={user.id} name={user.name} image={user.image} size={variant === "compact" ? "sm" : "md"} />
      {!collapsed ? <span className="arcsyn-user-menu__identity"><strong>{user.name}</strong>{user.description ? <span>{user.description}</span> : null}</span> : null}
      {!collapsed ? <ChevronDownIcon className="arcsyn-user-menu__chevron" aria-hidden size={14} /> : null}
    </DropdownMenu.Trigger>
  );
  return (
    <div ref={ref} className={cx("arcsyn-user-menu", className)} data-variant={variant} data-collapsed={collapsed || undefined} {...props}>
      <DropdownMenu.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
        {collapsed ? <Tooltip.Root><Tooltip.Trigger render={trigger} /><Tooltip.Content side="right">{user.name}</Tooltip.Content></Tooltip.Root> : trigger}
        <DropdownMenu.Content align={align} side={side} className="arcsyn-user-menu__content">
          <DropdownMenu.Group>
            <DropdownMenu.Label><span className="arcsyn-user-menu__menu-name">{user.name}</span>{user.description ? <span className="arcsyn-user-menu__menu-description">{user.description}</span> : null}</DropdownMenu.Label>
            <DropdownMenu.Separator />
            {items.map((item) => {
              if (item.type === "separator") return <DropdownMenu.Separator key={item.id} />;
              if (item.type === "label") return <DropdownMenu.Label key={item.id}>{item.label}</DropdownMenu.Label>;
              return <DropdownMenu.Item key={item.id} variant={item.tone === "danger" ? "danger" : "default"} disabled={item.disabled} onClick={item.onSelect}>{item.icon ?? (item.tone === "danger" ? <LogoutIcon aria-hidden size={15} /> : null)}<span>{item.label}</span>{item.tone === "danger" ? <span className="arcsyn-user-menu__danger-hint">Ação destrutiva</span> : null}</DropdownMenu.Item>;
            })}
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
});
