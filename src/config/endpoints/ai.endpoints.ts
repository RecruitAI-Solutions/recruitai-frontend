const AI_BASE = "/v1/AI";

export const AI_ENDPOINTS = {
  ANALYZE_CV: `${AI_BASE}/analyze-cv`,
  ANALYSIS_RESULT: (cvId: string) => `${AI_BASE}/analysis/${cvId}`,
  MATCH_CV_JOB: `${AI_BASE}/match-cv-job`,
  MATCH: `${AI_BASE}/match`,
  MATCH_CV_JOBS: (cvId: string) => `${AI_BASE}/match/cv/${cvId}`,
} as const;
