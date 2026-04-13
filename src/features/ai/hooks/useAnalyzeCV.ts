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
      if (data.status === "completed") {
        toast.success(
          `Phân tích hoàn tất! Tìm thấy ${data.totalSkills} kỹ năng.`,
        );
        queryClient.invalidateQueries({
          queryKey: AI_QUERY_KEYS.analysis(cvId),
        });
        queryClient.invalidateQueries({ queryKey: CV_QUERY_KEYS.myCVs });
        queryClient.invalidateQueries({ queryKey: CV_QUERY_KEYS.detail(cvId) });
      } else {
        toast.success("CV đang được phân tích, vui lòng đợi...");
      }
    },

    onError: (error: AxiosError<{ message: string; errorCode?: number }>) => {
      const errorCode = error.response?.data?.errorCode;
      let message = "Phân tích CV thất bại. Vui lòng thử lại.";

      switch (errorCode) {
        case 7001: // CV not found
          message = "Không tìm thấy CV.";
          break;
        case 400: // Validation error
          message =
            error.response?.data?.message || "CV chưa sẵn sàng để phân tích.";
          break;
        case 5001: // AI service error
          message = "Dịch vụ AI đang bận, thử lại sau.";
          break;
        default:
          message = error.response?.data?.message || message;
      }

      toast.error(message);
    },
  });
};
