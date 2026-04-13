//ENUM
export const APPLICATION_STATUS = {
  PENDING: 1,
  REVIEWED: 2,
  ACCEPTED: 3,
  REJECTED: 4,
} as const;

export type ApplicationStatusValue =
  (typeof APPLICATION_STATUS)[keyof typeof APPLICATION_STATUS];

export type ApplicationStatusLabel =
  | "pending"
  | "reviewed"
  | "accepted"
  | "rejected";

export const statusToString = (
  status: ApplicationStatusValue,
): ApplicationStatusLabel => {
  const map: Record<ApplicationStatusValue, ApplicationStatusLabel> = {
    [APPLICATION_STATUS.PENDING]: "pending",
    [APPLICATION_STATUS.REVIEWED]: "reviewed",
    [APPLICATION_STATUS.ACCEPTED]: "accepted",
    [APPLICATION_STATUS.REJECTED]: "rejected",
  };
  return map[status];
};

export const stringToStatus = (
  str: ApplicationStatusLabel,
): ApplicationStatusValue => {
  const map: Record<ApplicationStatusLabel, ApplicationStatusValue> = {
    pending: APPLICATION_STATUS.PENDING,
    reviewed: APPLICATION_STATUS.REVIEWED,
    accepted: APPLICATION_STATUS.ACCEPTED,
    rejected: APPLICATION_STATUS.REJECTED,
  };
  return map[str];
};

export type MatchedSkill = {
  skillId: number;
  name: string;
  category: string;
};

//APPLY
export type ApplyJobRequest = {
  cvId: string;
};

export type ApplyJobResponse = {
  applicationId: string;
  jobId: string;
  jobTitle: string;
  cvId: string;
  cvName: string;
  matchPercentage: number;
  matchedSkillCount: number;
  requiredSkillCount: number;
  matchedSkills: MatchedSkill[];
  missingSkills: MatchedSkill[];
  status: ApplicationStatusLabel;
  appliedAt: string;
  aiAnalysis?: AIAnalysis;
};

export type AIAnalysis = {
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  suggestedCourses: SuggestedCourse[];
  estimatedCompetition: string;
  successProbability: string;
};

export type SuggestedCourse = {
  name: string;
  platform: string;
  url: string;
  price: number;
};

// GET MY APPLICATION CANDIDATE
export type MyApplicationItem = {
  applicationId: string;
  jobId: string;
  jobTitle: string;
  company: string;
  location: string;
  matchPercentage: number;
  status: ApplicationStatusValue;
  appliedAt: string;
  reviewedAt: string | null;
};

export type MyApplicationsResponse = {
  data: MyApplicationItem[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
};

export type MyApplicationsParams = {
  page?: number;
  pageSize?: number;
  status?: ApplicationStatusValue;
};

//GET APPLICATION BY JOB
export type JobApplicationItem = {
  applicationId: string;
  cvId: string;
  candidateName: string;
  candidateEmail: string;
  matchPercentage: number;
  matchedSkillCount: number;
  requiredSkillCount: number;
  matchedSkills: string[];
  missingSkills: string[];
  status: ApplicationStatusValue;
  appliedAt: string;
  cvDownloadUrl: string;
};

export type JobApplicationsResponse = {
  data: JobApplicationItem[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
};

export type JobApplicationsParams = {
  page?: number;
  pageSize?: number;
  status?: ApplicationStatusValue;
  minMatch?: number;
  sortBy?: "appliedAt" | "matchPercentage";
  sortOrder?: "asc" | "desc";
};

//UPDATE STATUS
export type UpdateStatusRequest = {
  status: ApplicationStatusLabel;
  notes?: string;
};

export type UpdateStatusResponse = {
  applicationId: string;
  status: ApplicationStatusLabel;
  notes: string | null;
  updatedAt: string;
};

//DETAILS RESPONSE
export type ApplicationDetailResponse = {
  id: string;
  jobId: string;
  jobTitle: string;
  jobDescription: string;
  jobRequirements: string;
  jobLocation: string;
  jobSalaryMin: number | null;
  jobSalaryMax: number | null;
  cvId: string;
  cvName: string;
  candidateId: string;
  candidateName: string;
  candidateEmail: string;
  candidatePhone: string;
  matchPercentage: number;
  matchedSkillCount: number;
  requiredSkillCount: number;
  matchedSkills: MatchedSkill[];
  missingSkills: MatchedSkill[];
  status: ApplicationStatusValue;
  appliedAt: string;
  reviewedAt: string | null;
  notes: string | null;
  cvDownloadUrl: string;
};
