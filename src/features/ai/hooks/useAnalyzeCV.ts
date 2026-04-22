import { useMutation, useQueryClient } from "@tanstack/react-query";
import { aiApi } from "../services/aiApi";
import type { AnalyzeCVResponse } from "../types/ai.types";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import { AI_QUERY_KEYS } from "./aiQueryKeys";
import { CV_QUERY_KEYS } from "@/features/candidate/hooks/CVQueryKeys";

export const useAnalyzeCV = () => {
  const queryClient = useQueryClient();

  return useMutation<
    AnalyzeCVResponse,
    AxiosError<{ message: string }>,
    string
  >({
    mutationFn: (cvId: string) => aiApi.analyzeCV(cvId),
    onSuccess: (data, cvId) => {
      console.log("Analyze CV response:", data);
      if (data.statusName?.toLowerCase() === "analyzed" || data.status === 5) {
        toast.success(
          `Phân tích hoàn tất! Tìm thấy ${data.totalSkills} kỹ năng.`,
          { id: `analyze-${cvId}` }
        );
      }

      queryClient.invalidateQueries({
        queryKey: AI_QUERY_KEYS.analysis(cvId),
      });
      queryClient.invalidateQueries({ queryKey: CV_QUERY_KEYS.myCVs });
      queryClient.invalidateQueries({ queryKey: CV_QUERY_KEYS.detail(cvId) });
    },

    onError: (error: AxiosError<{ message: string; errorCode?: number }>, cvId) => {
      const errorCode = error.response?.data?.errorCode;
      let message = "Phân tích CV thất bại. Vui lòng thử lại.";

      switch (errorCode) {
        case 7001:
          message = "Không tìm thấy CV.";
          break;
        case 400:
          message = error.response?.data?.message || "CV chưa sẵn sàng để phân tích.";
          break;
        case 5001:
          message = "Dịch vụ AI đang bận, thử lại sau.";
          break;
        default:
          message = error.response?.data?.message || message;
      }

      toast.error(message, { id: `analyze-${cvId}` });
    },
  });
};