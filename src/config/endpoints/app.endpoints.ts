const APP_BASE = "/v1/Applications";

export const APPLICATION_ENDPOINTS = {
  APPLY: (jobId: string) => `${APP_BASE}/jobs/${jobId}/apply`,
  MY_APPLICATIONS: `${APP_BASE}/me`,
  APPLICATIONS_BY_JOB: (jobId: string) =>
    `${APP_BASE}/jobs/${jobId}/applications`,
  UPDATE_STATUS: (applicationId: string) =>
    `${APP_BASE}/${applicationId}/status`,
  DETAIL: (applicationId: string) => `${APP_BASE}/${applicationId}`,
} as const;
