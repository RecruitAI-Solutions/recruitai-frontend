import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationApi } from "../services/notificationApi";
import { NOTIFICATION_QUERY_KEYS } from "./notificationQueryKeys";
import toast from "react-hot-toast";

export const useMarkAllAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => notificationApi.markAllAsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      toast.success("Đã đọc tất cả");
    },
    onError: () => {
      toast.error("Có lỗi xảy ra");
    },
  });
};
