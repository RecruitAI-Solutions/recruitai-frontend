import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/vi";
import { Badge } from "@/shared/components/ui/Badge";
import { useMarkAsRead } from "../hooks/useMarkAsRead";
import type { NotificationItem as NotificationItemType } from "../types/notification.types";
import { NOTIFICATION_TYPE_LABEL } from "../types/notification.types";

type Props = { notification: NotificationItemType };

export const NotificationItem = ({ notification }: Props) => {
  const { mutate: markRead, isPending } = useMarkAsRead();
  dayjs.extend(relativeTime);
  dayjs.locale("vi");

  const handleClick = () => {
    if (!notification.isRead) {
      markRead(notification.id);
    }
    // Có thể điều hướng dựa trên type và data nếu cần
  };

  return (
    <div
      onClick={handleClick}
      className={`p-4 border-b border-border cursor-pointer transition-colors hover:bg-primary/5 ${
        !notification.isRead ? "bg-blue-50/50" : "bg-surface"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-text-primary">
            {notification.title}
          </h4>
          <p className="text-sm text-text-secondary mt-1 line-clamp-2">
            {notification.content}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="default" className="text-xs">
              {NOTIFICATION_TYPE_LABEL[notification.type]}
            </Badge>
            <span className="text-xs text-text-muted">
              {dayjs(notification.createdAt).fromNow()}
            </span>
          </div>
        </div>
        {!notification.isRead && (
          <span className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0" />
        )}
      </div>
    </div>
  );
};
