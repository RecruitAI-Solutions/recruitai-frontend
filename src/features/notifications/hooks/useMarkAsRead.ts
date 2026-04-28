import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationApi } from "../services/notificationApi";
import toast from "react-hot-toast";

export const useMarkAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => notificationApi.markAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: () => {
      toast.error("Không thể đánh dấu đã đọc");
    },
  });
};
