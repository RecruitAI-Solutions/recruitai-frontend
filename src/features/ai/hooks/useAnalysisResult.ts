import { useQuery } from "@tanstack/react-query";
import { aiApi } from "../services/aiApi";
import { AI_QUERY_KEYS } from "./aiQueryKeys";

export const useAnalysisResult = (cvId: string, enabled = true) => {
  const query = useQuery({
    queryKey: AI_QUERY_KEYS.analysis(cvId),
    queryFn: () => aiApi.getAnalysisResult(cvId),
    enabled: !!cvId && enabled,
    staleTime: 5 * 60 * 1000,
  });
  return query;
};