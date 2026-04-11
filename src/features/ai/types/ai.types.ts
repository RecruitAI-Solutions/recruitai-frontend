//CV ANALYZE
export type AnalyzeCVRequest = {
  cvId: string;
};

export type MatchedSkill = {
  skillId: number;
  name: string;
  category: string;
  confidence: number;
};

export type AIAnalysisInfo = {
  isAvailable: boolean;
  usedCache: boolean;
  skills: MatchedSkill[];
};

export type AnalyzeCVSuccessResponse = {
  cvId: string;
  status: "completed";
  skills: MatchedSkill[];
  totalSkills: number;
  processedAt: string;
  aiAnalysis?: AIAnalysisInfo;
};

export type AnalyzeCVProcessingResponse = {
  cvId: string;
  status: "processing";
  message: string;
  estimatedTime: number;
};

export type AnalyzeCVResponse =
  | AnalyzeCVSuccessResponse
  | AnalyzeCVProcessingResponse;

export type AnalysisResultResponse = {
  cvId: string;
  fileName: string;
  status: "pending" | "processing" | "analyzed" | "failed";
  message?: string;
  uploadedAt?: string;
  analyzedAt?: string;
  skills: MatchedSkill[];
  totalSkills: number;
  downloadUrl?: string;
  aiAnalysis?: AIAnalysisInfo;
};

//MATCH CV JOBS
export type MatchCVJobRequest = {
  cvId: string;
  jobId: string;
};

export type MatchedSkillItem = {
  skillId: number;
  name: string;
  category: string;
};

export type MatchCVJobResponse = {
  cvId: string;
  jobId: string;
  matchPercentage: number;
  requiredSkillCount: number;
  matchedSkillCount: number;
  matchedSkills: MatchedSkillItem[];
  missingSkills: MatchedSkillItem[];
  aiReason?: string;
  usedAI: boolean;
  calculatedAt: string;
};

//GET MATCH PARAMS
export type GetMatchParams = {
  cvId: string;
  jobId: string;
};

export type GetMatchResponse = MatchCVJobResponse;

// MATCH CV
export type MatchCVJobsParams = {
  page?: number;
  pageSize?: number;
  minMatch?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

export type MatchedJobItem = {
  jobId: string;
  jobTitle: string;
  company: string;
  matchPercentage: number;
  calculatedAt: string;
};

export type MatchCVJobsResponse = {
  data: MatchedJobItem[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
};
