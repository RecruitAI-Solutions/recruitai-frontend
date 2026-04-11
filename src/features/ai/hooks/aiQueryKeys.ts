import type { GetMatchParams, MatchCVJobsParams } from "../types/ai.types";

export const AI_QUERY_KEYS = {
  analysis: (cvId: string) => ["ai-analysis", cvId] as const,
  match: (params: GetMatchParams) => ["ai-match", params] as const,
  matchingJobs: (cvId: string, params?: MatchCVJobsParams) =>
    ["ai-matching-jobs", cvId, params] as const,
};
