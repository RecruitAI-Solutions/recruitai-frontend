import { useMutation, useQueryClient } from "@tanstack/react-query";
import { applicationApi } from "../services/applicationApi";
import type { ApplyJobResponse } from "../types/application.type";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import { APPLICATION_QUERY_KEYS } from "./applicationQueryKeys";

export const useApplyJob = (jobId: string) => {
  const queryClient = useQueryClient();

  return useMutation<ApplyJobResponse, AxiosError<{ message: string }>, string>(
    {
      mutationFn: (cvId: string) => applicationApi.apply(jobId, cvId),
      onSuccess: (data) => {
        toast.success(
          `Ứng tuyển thành công! Độ phù hợp: ${data.matchPercentage}%`,
        );
        queryClient.invalidateQueries({
          queryKey: APPLICATION_QUERY_KEYS.myApplications(),
        });
        queryClient.invalidateQueries({
          queryKey: APPLICATION_QUERY_KEYS.jobApplications(jobId),
        });
      },
      onError: (error) => {
        if (error.response?.status === 409) {
          toast.error("Bạn đã ứng tuyển công việc này rồi.");
        } else {
          const message = error.response?.data?.message || "Ứng tuyển thất bại";
          toast.error(message);
        }
      },
    },
  );
};
