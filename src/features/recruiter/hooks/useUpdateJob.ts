import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import type { UpdateJobRequest } from "../types/job.types";
import { jobApi } from "../services/jobApi";
import { JOB_QUERY_KEYS } from "./jobQueryKeys";
import toast from "react-hot-toast";
import { ROUTES } from "@/config/routes.config";
import type { AxiosError } from "axios";

export const useUpdateJob = (id: string) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: UpdateJobRequest) => jobApi.updateJob(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: JOB_QUERY_KEYS.myJobs });
      queryClient.invalidateQueries({ queryKey: JOB_QUERY_KEYS.detail(id) });
      toast.success("Cập nhật công việc thành công");
      navigate(ROUTES.RECRUITER.JOBS);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const message = error.response?.data?.message || "Đăng việc thất bại";
      toast.error(message);
    },
  });
};
