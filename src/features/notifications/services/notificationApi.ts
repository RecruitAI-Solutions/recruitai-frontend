import { axiosInstance } from "@/services/api/axiosInstance";
import type {
  NotificationListResponse,
  GetNotificationsParams,
  UnreadCountResponse,
  MarkAsReadResponse,
  MarkAllReadResponse,
} from "../types/notification.types";

const BASE = "/v1/notifications";

export const notificationApi = {
  getNotifications: async (
    params?: GetNotificationsParams,
  ): Promise<NotificationListResponse> => {
    const response = await axiosInstance.get<NotificationListResponse>(BASE, {
      params,
    });
    return response.data;
  },

  getUnreadCount: async (): Promise<UnreadCountResponse> => {
    const response = await axiosInstance.get<UnreadCountResponse>(
      `${BASE}/unread-count`,
    );
    return response.data;
  },

  markAsRead: async (id: string): Promise<MarkAsReadResponse> => {
    const response = await axiosInstance.patch<MarkAsReadResponse>(
      `${BASE}/${id}/read`,
    );
    return response.data;
  },

  markAllAsRead: async (): Promise<MarkAllReadResponse> => {
    const response = await axiosInstance.patch<MarkAllReadResponse>(
      `${BASE}/read-all`,
    );
    return response.data;
  },
};
