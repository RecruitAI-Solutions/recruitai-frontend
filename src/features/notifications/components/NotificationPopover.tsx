// src/features/notifications/components/NotificationPopover.tsx
import * as Popover from "@radix-ui/react-popover";
import { Bell } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNotifications } from "../hooks/useNotifications";
import { useMarkAsRead } from "../hooks/useMarkAsRead";
import { useMarkAllAsRead } from "../hooks/useMarkAllAsRead";
import { useUnreadCount } from "../hooks/useUnreadCount";
import { useAppSelector } from "@/app/hooks";
import { selectIsAuthenticated } from "@/features/auth/slices/authSlice";
import {
  NOTIFICATION_TYPE_LABEL,
  type NotificationItem,
} from "../types/notification.types";
import { Badge } from "@/shared/components/ui/Badge";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/vi";
import { cn } from "@/lib/utils";

dayjs.extend(relativeTime);
dayjs.locale("vi");
dayjs.extend(utc);

export const NotificationPopover = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const [open, setOpen] = useState(false);

  const { data: unreadCount } = useUnreadCount(isAuthenticated);
  const { data: notificationsData } = useNotifications({
    page: 1,
    pageSize: 5,
  });
  const { mutate: markRead } = useMarkAsRead();
  const { mutate: markAllRead } = useMarkAllAsRead();

  const [liveCount, setLiveCount] = useState<number>(unreadCount ?? 0);

  useEffect(() => {
    if (unreadCount !== undefined) setLiveCount(unreadCount);
  }, [unreadCount]);

  // Lắng nghe sự kiện realtime
  useEffect(() => {
    const handler = (event: CustomEvent) => {
      setLiveCount((prev) => prev + 1);
    };
    window.addEventListener("new-notification", handler as EventListener);
    return () =>
      window.removeEventListener("new-notification", handler as EventListener);
  }, []);

  const handleNotificationClick = (notification: NotificationItem) => {
    if (!notification.isRead) {
      markRead(notification.id);
      setLiveCount((prev) => Math.max(0, prev - 1));
    }
  };

  if (!isAuthenticated) return null;

  const notifications = notificationsData?.data ?? [];

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button className="relative p-2 rounded-full hover:bg-primary/5 transition-colors">
          <Bell className="w-5 h-5 text-text-secondary hover:text-primary transition-colors" />
          {liveCount > 0 && (
            <>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                {liveCount > 99 ? "99+" : liveCount}
              </span>
              <span className="absolute -top-1 -right-1 animate-ping bg-red-400 text-white text-xs rounded-full h-5 w-5 opacity-75" />
            </>
          )}
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          align="end"
          sideOffset={8}
          className="w-[400px] max-h-[500px] bg-white rounded-xl shadow-xl border border-border z-50 flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h3 className="font-semibold text-lg">Thông báo</h3>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  markAllRead();
                  setLiveCount(0);
                }}
                className="text-xs text-primary hover:text-secondary hover:font-medium cursor-pointer"
              >
                Đánh dấu tất cả đã đọc
              </button>
              <Link
                to="/notifications"
                onClick={() => setOpen(false)}
                className="text-xs text-primary hover:underline"
              >
                Xem tất cả
              </Link>
            </div>
          </div>

          {/* List */}
          <div className="overflow-y-auto flex-1 max-h-[400px]">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-sm text-text-secondary">
                Bạn chưa có thông báo nào
              </div>
            ) : (
              notifications.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleNotificationClick(item)}
                  className={cn(
                    "p-4 border-b border-border cursor-pointer transition-colors hover:bg-primary/5",
                    !item.isRead ? "bg-blue-50/50" : "bg-white",
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <p
                        className={cn(
                          "text-sm font-semibold truncate",
                          !item.isRead ? "text-primary" : "text-text-primary",
                        )}
                      >
                        {item.title}
                      </p>
                      <p className="text-xs text-text-secondary mt-1 line-clamp-2">
                        {item.content}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="default" className="text-xs">
                          {NOTIFICATION_TYPE_LABEL[item.type]}
                        </Badge>
                        <span className="text-xs text-text-muted">
                          {dayjs.utc(item.createdAt).local().fromNow()}
                        </span>
                      </div>
                    </div>
                    {!item.isRead && (
                      <div className="w-2 h-2 mt-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};
