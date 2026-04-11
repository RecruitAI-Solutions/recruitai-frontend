import { useMutation, useQueryClient } from "@tanstack/react-query";
import { aiApi } from "../services/aiApi";
import type { MatchCVJobRequest, MatchCVJobResponse } from "../types/ai.types";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import { AI_QUERY_KEYS } from "./aiQueryKeys";

export const useMatchCVWithJob = () => {
  const queryClient = useQueryClient();

  return useMutation<
    MatchCVJobResponse,
    AxiosError<{ message: string }>,
    MatchCVJobRequest
  >({
    mutationFn: (payload) => aiApi.matchCVWithJob(payload),
    onSuccess: (data) => {
      toast.success(`Độ phù hợp: ${data.matchPercentage}%`);
      queryClient.invalidateQueries({
        queryKey: AI_QUERY_KEYS.match({ cvId: data.cvId, jobId: data.jobId }),
      });
      queryClient.invalidateQueries({
        queryKey: AI_QUERY_KEYS.matchingJobs(data.cvId),
      });
    },
    onError: (error) => {
      const message = error.response?.data?.message || "Match CV thất bại";
      toast.error(message);
    },
  });
};
