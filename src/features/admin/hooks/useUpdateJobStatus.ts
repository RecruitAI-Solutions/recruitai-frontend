import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "../services/adminApi";
import toast from "react-hot-toast";
import type { AdminJobStatusUpdateRequest } from "@/features/admin/types/admin.types";

export const useUpdateJobStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      jobId,
      data,
    }: {
      jobId: string;
      data: AdminJobStatusUpdateRequest;
    }) => adminApi.updateJobStatus(jobId, data),
    onSuccess: () => {
      toast.success("Cập nhật trạng thái thành công");
      queryClient.invalidateQueries({ queryKey: ["admin", "jobs"] });
      queryClient.invalidateQueries({ queryKey: ["jobs", "detail"] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Cập nhật thất bại");
    },
  });
};
