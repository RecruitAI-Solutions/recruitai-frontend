import type { GetMatchParams, MatchCVJobsParams } from "../types/ai.types";

export const AI_QUERY_KEYS = {
  analysis: (cvId: string) => ["ai-analysis", cvId] as const,
  match: (params: GetMatchParams) => ["ai-match", params] as const,

  // Key cho đề xuất việc làm (JobSuggestPage)
  matchingJobs: (cvId: string, params?: MatchCVJobsParams) =>
    ["ai-matching-jobs", cvId, params] as const,

  // Key cho lịch sử ghép nối (MatchingJobsPage) - THÊM MỚI
  matchingJobsHistory: (cvId: string, params?: MatchCVJobsParams) =>
    ["ai-matching-jobs-history", cvId, params] as const,
};