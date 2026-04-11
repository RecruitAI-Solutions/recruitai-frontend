import { useMutation, useQueryClient } from "@tanstack/react-query";
import { aiApi } from "../services/aiApi";
import type { AnalyzeCVResponse } from "../types/ai.types";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import { AI_QUERY_KEYS } from "./aiQueryKeys";

export const useAnalyzeCV = () => {
  const queryClient = useQueryClient();

  return useMutation<
    AnalyzeCVResponse,
    AxiosError<{ message: string }>,
    string
  >({
    mutationFn: (cvId: string) => aiApi.analyzeCV(cvId),
    onSuccess: (data, cvId) => {
      if (data.status === "completed") {
        toast.success(
          `Phân tích hoàn tất! Tìm thấy ${data.totalSkills} kỹ năng.`,
        );
        queryClient.invalidateQueries({
          queryKey: AI_QUERY_KEYS.analysis(cvId),
        });
        queryClient.invalidateQueries({ queryKey: ["my-cvs"] });
      } else {
        toast.success("CV đang được phân tích, vui lòng đợi...");
      }
    },
    onError: (error) => {
      const message = error.response?.data?.message || "Phân tích CV thất bại";
      toast.error(message);
    },
  });
};
