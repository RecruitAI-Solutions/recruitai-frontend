import { useQuery } from "@tanstack/react-query";
import type { MatchCVJobsParams } from "../types/ai.types";
import { AI_QUERY_KEYS } from "./aiQueryKeys";
import { jobApi } from "@/features/jobs/services/jobApi";

export const useMatchingJobsForCV = (
  cvId: string,
  params?: MatchCVJobsParams,
  enabled = true,
) => {
  return useQuery({
    queryKey: AI_QUERY_KEYS.matchingJobs(cvId, params),
    queryFn: () => jobApi.getMatchingJobsForCV(cvId, params),
    enabled: !!cvId && enabled,
  });
};
