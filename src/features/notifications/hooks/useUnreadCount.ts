import { useQuery } from "@tanstack/react-query";
import { notificationApi } from "../services/notificationApi";
import { NOTIFICATION_QUERY_KEYS } from "./notificationQueryKeys";

export const useUnreadCount = (enabled = true) => {
  return useQuery({
    queryKey: NOTIFICATION_QUERY_KEYS.unreadCount(),
    queryFn: () => notificationApi.getUnreadCount(),
    staleTime: 1000 * 60 * 1,
    refetchInterval: 60_000,
    enabled,
  });
};
