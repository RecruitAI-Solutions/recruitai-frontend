import type { GetNotificationsParams } from "../types/notification.types";

export const NOTIFICATION_QUERY_KEYS = {
  all: ["notifications"] as const,
  list: (params?: GetNotificationsParams) =>
    ["notifications", "list", params] as const,
  unreadCount: () => ["notifications", "unread-count"] as const,
};
