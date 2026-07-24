import { forwardRef, useState, type ReactNode } from "react";
import { BellIcon } from "../../icons/index.js";
import { cx } from "../../utilities/cx.js";
import { Button } from "../button/button.js";
import { Popover, type PopoverRootProps } from "../popover/popover.js";
import { Skeleton } from "../skeleton/skeleton.js";
import { StatusIndicator, type StatusIndicatorStatus } from "../status-indicator/status-indicator.js";

export type NotificationTone = "neutral" | "info" | "success" | "warning" | "danger";

export interface NotificationCenterItem {
  id: string;
  title: ReactNode;
  description?: ReactNode;
  timestamp?: ReactNode;
  dateTime?: string;
  actor?: ReactNode;
  icon?: ReactNode;
  unread?: boolean;
  tone?: NotificationTone;
  href?: string;
  onSelect?: () => void;
}

export interface NotificationCenterProps extends Omit<PopoverRootProps, "children"> {
  items: readonly NotificationCenterItem[];
  maxVisible?: number;
  unreadCount?: number;
  loading?: boolean;
  empty?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  triggerLabel?: string;
  seeAllLabel?: ReactNode;
  seeAllHref?: string;
  onSeeAll?: () => void;
  className?: string;
}

const toneStatus: Record<NotificationTone, StatusIndicatorStatus> = {
  neutral: "neutral",
  info: "info",
  success: "success",
  warning: "warning",
  danger: "danger",
};

function NotificationMarker({ item }: { item: NotificationCenterItem }) {
  if (item.actor) return <span className="arcsyn-notification-center__actor">{item.actor}</span>;
  if (item.icon) return <span className="arcsyn-notification-center__icon">{item.icon}</span>;
  const tone = item.tone ?? "neutral";
  return <span className="arcsyn-notification-center__icon"><StatusIndicator status={toneStatus[tone]} indicator="icon" iconOnly accessibleLabel={`Notificação ${tone}`} /></span>;
}

function NotificationContent({ item }: { item: NotificationCenterItem }) {
  return (
    <>
      <NotificationMarker item={item} />
      <span className="arcsyn-notification-center__item-body">
        <strong>{item.title}</strong>
        {item.description ? <span className="arcsyn-notification-center__item-description">{item.description}</span> : null}
        {item.timestamp ? <time dateTime={item.dateTime}>{item.timestamp}</time> : null}
      </span>
      {item.unread ? <span className="arcsyn-notification-center__unread" aria-label="Não lida" /> : null}
    </>
  );
}

const NotificationCenter = forwardRef<HTMLButtonElement, NotificationCenterProps>(function NotificationCenter(
  {
    items,
    maxVisible = 5,
    unreadCount,
    loading = false,
    empty = "Nenhuma notificação recente.",
    title = "Notificações",
    description,
    triggerLabel = "Abrir notificações",
    seeAllLabel = "Ver todas",
    seeAllHref,
    onSeeAll,
    className,
    open,
    defaultOpen = false,
    onOpenChange,
    ...rootProps
  },
  ref,
) {
  const [localOpen, setLocalOpen] = useState(defaultOpen);
  const isOpen = open ?? localOpen;
  const visibleItems = items.slice(0, Math.max(0, maxVisible));
  const resolvedUnreadCount = unreadCount ?? items.filter((item) => item.unread).length;
  const accessibleTriggerLabel = resolvedUnreadCount > 0 ? `${triggerLabel}, ${resolvedUnreadCount} não lidas` : triggerLabel;

  function setOpen(nextOpen: boolean) {
    if (open === undefined) setLocalOpen(nextOpen);
    (onOpenChange as ((nextOpen: boolean) => void) | undefined)?.(nextOpen);
  }

  return (
    <Popover.Root open={isOpen} onOpenChange={setOpen} {...rootProps}>
      <Popover.Trigger ref={ref} className={cx("arcsyn-notification-center__trigger", className)} size="md" variant="ghost" aria-label={accessibleTriggerLabel}>
        <BellIcon aria-hidden size={18} />
        {resolvedUnreadCount > 0 ? <span className="arcsyn-notification-center__count" aria-hidden>{resolvedUnreadCount > 99 ? "99+" : resolvedUnreadCount}</span> : null}
      </Popover.Trigger>
      <Popover.Content
        className="arcsyn-notification-center"
        align="end"
        side="bottom"
        collisionAvoidance={{ side: "shift", align: "shift", fallbackAxisSide: "none" }}
        collisionPadding={8}
      >
        <div className="arcsyn-notification-center__header">
          <div>
            <Popover.Title>{title}</Popover.Title>
            {description ? <Popover.Description>{description}</Popover.Description> : null}
          </div>
          {resolvedUnreadCount > 0 ? <span className="arcsyn-notification-center__summary">{resolvedUnreadCount} não lidas</span> : null}
        </div>
        <ol className="arcsyn-notification-center__list" aria-busy={loading || undefined}>
          {loading
            ? Array.from({ length: Math.min(maxVisible, 5) }, (_, index) => (
                <li className="arcsyn-notification-center__skeleton" key={index}>
                  <Skeleton variant="circular" width="2rem" height="2rem" />
                  <span><Skeleton width="58%" height=".75rem" /><Skeleton width="88%" height=".75rem" /></span>
                </li>
              ))
            : visibleItems.length
              ? visibleItems.map((item) => (
                  <li key={item.id} className="arcsyn-notification-center__item" data-unread={item.unread || undefined} data-tone={item.tone ?? "neutral"}>
                    {item.href ? (
                      <a href={item.href} onClick={() => { item.onSelect?.(); setOpen(false); }} className="arcsyn-notification-center__item-control">
                        <NotificationContent item={item} />
                      </a>
                    ) : item.onSelect ? (
                      <button type="button" onClick={() => { item.onSelect?.(); setOpen(false); }} className="arcsyn-notification-center__item-control">
                        <NotificationContent item={item} />
                      </button>
                    ) : (
                      <div className="arcsyn-notification-center__item-control">
                        <NotificationContent item={item} />
                      </div>
                    )}
                  </li>
                ))
              : <li className="arcsyn-notification-center__empty">{empty}</li>}
        </ol>
        <div className="arcsyn-notification-center__footer">
          {seeAllHref ? (
            <a className="arcsyn-notification-center__see-all" href={seeAllHref} onClick={() => { onSeeAll?.(); setOpen(false); }}>{seeAllLabel}</a>
          ) : (
            <Button className="arcsyn-notification-center__see-all" variant="ghost" size="sm" onClick={() => { onSeeAll?.(); setOpen(false); }}>{seeAllLabel}</Button>
          )}
        </div>
      </Popover.Content>
    </Popover.Root>
  );
});

export { NotificationCenter };
