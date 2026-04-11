import { useQuery } from "@tanstack/react-query";
import { aiApi } from "../services/aiApi";
import type { MatchCVJobsParams } from "../types/ai.types";
import { AI_QUERY_KEYS } from "./aiQueryKeys";

export const useMatchingJobsForCV = (
  cvId: string,
  params?: MatchCVJobsParams,
  enabled = true,
) => {
  return useQuery({
    queryKey: AI_QUERY_KEYS.matchingJobs(cvId, params),
    queryFn: () => aiApi.getMatchingJobsForCV(cvId, params),
    enabled: !!cvId && enabled,
  });
};
