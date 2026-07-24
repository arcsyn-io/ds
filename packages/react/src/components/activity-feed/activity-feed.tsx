import { forwardRef, type HTMLAttributes, type ReactNode, type TimeHTMLAttributes } from "react";
import { cx } from "../../utilities/cx.js";
import { Button, type ButtonProps } from "../button/button.js";
import { Skeleton } from "../skeleton/skeleton.js";
import { StatusIndicator, type StatusIndicatorStatus } from "../status-indicator/status-indicator.js";

export interface ActivityFeedRootProps extends HTMLAttributes<HTMLOListElement> {
  mode?: "feed" | "timeline";
  compact?: boolean;
  loading?: boolean;
  loadingCount?: number;
  empty?: ReactNode;
}
const ActivityFeedRoot = forwardRef<HTMLOListElement, ActivityFeedRootProps>(function ActivityFeedRoot(
  { className, mode = "feed", compact = false, loading = false, loadingCount = 3, empty, children, ...props },
  ref,
) {
  return (
    <ol ref={ref} className={cx("arcsyn-activity-feed", className)} data-mode={mode} data-compact={compact || undefined} aria-busy={loading || undefined} {...props}>
      {loading ? Array.from({ length: loadingCount }, (_, index) => <li className="arcsyn-activity-feed__skeleton" key={index}><Skeleton variant="circular" width="2rem" height="2rem" /><div><Skeleton height=".875rem" width="55%" /><Skeleton height=".75rem" width="80%" /></div></li>) : children ?? (empty ? <li className="arcsyn-activity-feed__empty">{empty}</li> : null)}
    </ol>
  );
});

export interface ActivityFeedItemProps extends Omit<HTMLAttributes<HTMLLIElement>, "title"> {
  avatar?: ReactNode;
  icon?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  timestamp?: ReactNode;
  dateTime?: string;
  status?: StatusIndicatorStatus;
  actions?: ReactNode;
}
const ActivityFeedItem = forwardRef<HTMLLIElement, ActivityFeedItemProps>(function ActivityFeedItem(
  { className, avatar, icon, title, description, timestamp, dateTime, status, actions, children, ...props },
  ref,
) {
  const marker = icon ?? (status ? <StatusIndicator status={status} indicator="dot" iconOnly accessibleLabel={`Status: ${status}`} /> : null);
  return (
    <li ref={ref} className={cx("arcsyn-activity-feed__item", className)} {...props}>
      {marker ? <ActivityFeedIcon>{marker}</ActivityFeedIcon> : null}
      {avatar ? <ActivityFeedActor>{avatar}</ActivityFeedActor> : null}
      <div className="arcsyn-activity-feed__body">
        {title ? <ActivityFeedTitle>{title}</ActivityFeedTitle> : null}
        {description ? <ActivityFeedDescription>{description}</ActivityFeedDescription> : null}
        {children}
      </div>
      {timestamp ? <ActivityFeedTimestamp dateTime={dateTime}>{timestamp}</ActivityFeedTimestamp> : null}
      {actions ? <ActivityFeedActions>{actions}</ActivityFeedActions> : null}
    </li>
  );
});
function divPart(name: string) {
  return forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function ActivityPart({ className, ...props }, ref) {
    return <div ref={ref} className={cx(`arcsyn-activity-feed__${name}`, className)} {...props} />;
  });
}
export const ActivityFeedActor = divPart("actor");
export const ActivityFeedTitle = divPart("title");
export const ActivityFeedDescription = divPart("description");
export const ActivityFeedIcon = divPart("icon");
export const ActivityFeedActions = divPart("actions");
export const ActivityFeedTimestamp = forwardRef<HTMLTimeElement, TimeHTMLAttributes<HTMLTimeElement>>(function ActivityFeedTimestamp({ className, ...props }, ref) {
  return <time ref={ref} className={cx("arcsyn-activity-feed__timestamp", className)} {...props} />;
});
export const ActivityFeedLoadMore = forwardRef<HTMLButtonElement, ButtonProps>(function ActivityFeedLoadMore({ className, children = "Carregar mais", ...props }, ref) {
  return <li className="arcsyn-activity-feed__load-more"><Button ref={ref} className={className} variant="ghost" size="sm" {...props}>{children}</Button></li>;
});
export const ActivityFeed = Object.assign(ActivityFeedRoot, {
  Root: ActivityFeedRoot,
  Item: ActivityFeedItem,
  Actor: ActivityFeedActor,
  Title: ActivityFeedTitle,
  Description: ActivityFeedDescription,
  Timestamp: ActivityFeedTimestamp,
  Icon: ActivityFeedIcon,
  Actions: ActivityFeedActions,
  LoadMore: ActivityFeedLoadMore,
});
