import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationApi } from "../services/notificationApi";
import toast from "react-hot-toast";
import { NOTIFICATION_QUERY_KEYS } from "./notificationQueryKeys";

export const useMarkAllAsRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => notificationApi.markAllAsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({
        queryKey: NOTIFICATION_QUERY_KEYS.unreadCount(),
      });
      toast.success("Đã đọc tất cả");
    },
    onError: () => toast.error("Có lỗi xảy ra"),
  });
};
