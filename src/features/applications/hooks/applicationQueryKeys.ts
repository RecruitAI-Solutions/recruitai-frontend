import type {
  JobApplicationsParams,
  GetMyApplicationsParams,
  AdminApplicationsParams,
  RecruiterApplicationsParams,
} from "../types/application.type";

export const APPLICATION_QUERY_KEYS = {
  all: ["applications"] as const,
  myApplications: (params?: GetMyApplicationsParams) =>
    [...APPLICATION_QUERY_KEYS.all, "my", params] as const,
  jobApplications: (jobId: string, params?: JobApplicationsParams) =>
    [...APPLICATION_QUERY_KEYS.all, "job", jobId, params] as const,
  detail: (applicationId: string) =>
    [...APPLICATION_QUERY_KEYS.all, "detail", applicationId] as const,

  adminApplications: (params?: AdminApplicationsParams) =>
    [...APPLICATION_QUERY_KEYS.all, "admin", params] as const,
  recruiterApplications: (params?: RecruiterApplicationsParams) =>
    [...APPLICATION_QUERY_KEYS.all, "recruiter", params] as const,
};
