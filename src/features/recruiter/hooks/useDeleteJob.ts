import { useMutation, useQueryClient } from "@tanstack/react-query";
import { jobApi } from "../services/jobApi";
import { JOB_QUERY_KEYS } from "./jobQueryKeys";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";

export const useDeleteJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => jobApi.deleteJob(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: JOB_QUERY_KEYS.myJobs });
      queryClient.invalidateQueries({ queryKey: JOB_QUERY_KEYS.detail(id) });
      toast.success("Xóa việc làm thành công");
    },

    onError: (error: AxiosError<{ message: string }>) => {
      const message = error.response?.data?.message || "Xóa việc thất bại";
      toast.error(message);
    },
  });
};
