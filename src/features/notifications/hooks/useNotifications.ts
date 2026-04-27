import { useQuery } from "@tanstack/react-query";
import { notificationApi } from "../services/notificationApi";
import { NOTIFICATION_QUERY_KEYS } from "./notificationQueryKeys";
import type { GetNotificationsParams } from "../types/notification.types";

export const useNotifications = (params?: GetNotificationsParams) => {
  return useQuery({
    queryKey: NOTIFICATION_QUERY_KEYS.list(params),
    queryFn: () => notificationApi.getNotifications(params),
    staleTime: 1000 * 60 * 2,
  });
};
