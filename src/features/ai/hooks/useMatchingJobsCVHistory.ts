import { useQuery } from "@tanstack/react-query";
import { aiApi } from "../services/aiApi";
import type { MatchCVJobsParams } from "../types/ai.types";
import { AI_QUERY_KEYS } from "./aiQueryKeys";

export const useMatchingJobsCVHistory = (
  cvId: string,
  params?: MatchCVJobsParams,
  enabled = true,
) => {
  return useQuery({
    queryKey: AI_QUERY_KEYS.matchingJobsHistory(cvId, params), 
    queryFn: () => aiApi.useMatchingJobsCVHistory(cvId, params),
    enabled: !!cvId && enabled,
  });
};