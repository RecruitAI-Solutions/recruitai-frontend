const APP_BASE = "/v1/Applications";

export const APPLICATION_ENDPOINTS = {
  APPLY: (jobId: string) => `${APP_BASE}/jobs/${jobId}/apply`,
  MY_APPLICATIONS: `${APP_BASE}/me`,
  APPLICATIONS_BY_JOB: (jobId: string) =>
    `${APP_BASE}/jobs/${jobId}/applications`,
  UPDATE_STATUS: (applicationId: string) =>
    `${APP_BASE}/${applicationId}/status`,
  DETAIL: (applicationId: string) => `${APP_BASE}/${applicationId}`,
  ADMIN_ALL: `/v1/admin/admin/all`,
  RECRUITER_ALL: `${APP_BASE}/recruiter/applications`,
} as const;
