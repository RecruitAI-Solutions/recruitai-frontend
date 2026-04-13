import type {
  MyApplicationsParams,
  JobApplicationsParams,
} from "../types/application.type";

export const APPLICATION_QUERY_KEYS = {
  all: ["applications"] as const,
  myApplications: (params?: MyApplicationsParams) =>
    [...APPLICATION_QUERY_KEYS.all, "my", params] as const,
  jobApplications: (jobId: string, params?: JobApplicationsParams) =>
    [...APPLICATION_QUERY_KEYS.all, "job", jobId, params] as const,
  detail: (applicationId: string) =>
    [...APPLICATION_QUERY_KEYS.all, "detail", applicationId] as const,
};
