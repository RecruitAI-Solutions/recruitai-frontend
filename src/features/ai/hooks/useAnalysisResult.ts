import { useQuery } from "@tanstack/react-query";
import { aiApi } from "../services/aiApi";
import { AI_QUERY_KEYS } from "./aiQueryKeys";

export const useAnalysisResult = (cvId: string, enabled = true) => {
  return useQuery({
    queryKey: AI_QUERY_KEYS.analysis(cvId),
    queryFn: () => aiApi.getAnalysisResult(cvId),
    enabled: !!cvId && enabled,
    staleTime: 5 * 60 * 1000,
    refetchInterval: (query) => {
      const data = query.state.data;
      if (data?.status === "processing") {
        return 3000; // Poll mỗi 3 giây khi đang xử lý
      }
      return false;
    },
  });
};
