// src/features/notifications/components/NotificationPopover.tsx
import * as Popover from "@radix-ui/react-popover";
import { AlertCircle, Award, Bell, BellOff, Briefcase, CheckCheck, Heart, MessageSquare, UserPlus } from "lucide-react";
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
    const handler = () => {
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

  const getNotificationIcon = (type: string) => {
    const icons: Record<string, React.ReactNode> = {
      job: <Briefcase className="w-4 h-4 text-primary" />,
      saved: <Heart className="w-4 h-4 text-red-500" />,
      application: <CheckCheck className="w-4 h-4 text-green-500" />,
      follow: <UserPlus className="w-4 h-4 text-blue-500" />,
      message: <MessageSquare className="w-4 h-4 text-purple-500" />,
      achievement: <Award className="w-4 h-4 text-yellow-500" />,
      warning: <AlertCircle className="w-4 h-4 text-orange-500" />,
    };

    return icons[type] || <Bell className="w-4 h-4 text-text-muted" />;
  };

  if (!isAuthenticated) return null;

  const notifications = notificationsData?.data ?? [];

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button className="cursor-pointer relative p-2 rounded-full hover:bg-primary/5 transition-colors">
          <Bell className="w-5 h-5 text-text-secondary hover:text-primary transition-colors" />
          {liveCount > 0 && (
            <>
              {/* Badge số */}
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-medium rounded-full min-w-[18px] h-[18px] px-1 flex items-center justify-center z-10 shadow-sm">
                {liveCount > 99 ? "99+" : liveCount}
              </span>
              {/* Hiệu ứng ping */}
              <span className="absolute -top-1 -right-1 animate-ping bg-red-400 rounded-full min-w-[18px] h-[18px] opacity-60" />
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
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <h3 className="font-semibold text-sm text-text-primary">Thông báo</h3>

            <div className="flex items-center gap-2">
              {/* Icon Đọc tất cả với tooltip - màu xanh primary */}
              <div className="relative group">
                <button
                  onClick={() => {
                    markAllRead();
                    setLiveCount(0);
                  }}
                  className="p-1 !text-primary hover:text-primary/80 transition-colors rounded-md hover:bg-primary/10"
                  aria-label="Đánh dấu tất cả đã đọc"
                >
                  <CheckCheck className="w-4 h-4" />
                </button>
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                  Đánh dấu tất cả đã đọc
                </div>
              </div>

              <span className="text-xs text-border">•</span>

              <Link
                to="/notifications"
                onClick={() => setOpen(false)}
                className="text-xs text-primary hover:text-primary/80 hover:underline transition-all"
              >
                Xem tất cả
              </Link>
            </div>
          </div>

          {/* List */}
          <div className="overflow-y-auto flex-1 max-h-[400px] divide-y divide-border">
            {!notifications || notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                <BellOff className="w-12 h-12 text-text-muted mb-3" />
                <p className="text-sm font-medium text-text-primary">Chưa có thông báo</p>
                <p className="text-xs text-text-secondary mt-1">
                  Khi có thông báo mới, chúng sẽ xuất hiện tại đây
                </p>
              </div>
            ) : (
              notifications.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleNotificationClick(item)}
                  className={cn(
                    "group relative p-4 cursor-pointer transition-all duration-300 ease-out",
                    "hover:bg-gray-50 hover:pl-5",
                    !item.isRead
                      ? "bg-white border-l-4 border-l-primary shadow-sm"
                      : "bg-white border-l-4 border-l-transparent"
                  )}
                >
                  <div className="flex items-start gap-3">
                    {/* Icon theo loại thông báo */}
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-200",
                      !item.isRead
                        ? "bg-primary/10"
                        : "bg-gray-100"
                    )}>
                      {getNotificationIcon(item.type)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className={cn(
                          "text-sm font-medium truncate transition-colors duration-200",
                          !item.isRead ? "text-primary" : "text-text-primary"
                        )}>
                          {item.title || "Thông báo"}
                        </p>
                        {!item.isRead && (
                          <div className="w-2 h-2 mt-1.5 rounded-full bg-primary flex-shrink-0" />
                        )}
                      </div>

                      <p className="text-xs text-text-secondary mt-1 line-clamp-2">
                        {item.content || "Không có nội dung"}
                      </p>

                      <div className="flex items-center gap-2 mt-2">
                        <Badge
                          variant={!item.isRead ? "purple" : "gray"}
                          className="text-xs px-2 py-0 h-5"
                        >
                          {NOTIFICATION_TYPE_LABEL[item.type] || "Chung"}
                        </Badge>
                        <span className="text-xs text-text-muted">
                          {item.createdAt
                            ? dayjs.utc(item.createdAt).local().fromNow()
                            : "Vừa xong"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Hiệu ứng ripple khi click */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
                    <div className="absolute inset-0 opacity-0 group-active:opacity-100 group-active:animate-[ripple_0.4s_ease-out] bg-primary/5" />
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
