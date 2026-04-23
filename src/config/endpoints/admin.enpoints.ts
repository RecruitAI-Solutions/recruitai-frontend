const ADMIN_BASE = "/v1/admin";

export const ADMIN_ENDPOINTS = {
  USERS: `${ADMIN_BASE}/users`,
  USER_DETAIL: (id: string) => `${ADMIN_BASE}/users/${id}`,
  USER_UPDATE: (id: string) => `${ADMIN_BASE}/users/${id}`,
  USER_DELETE: (id: string) => `${ADMIN_BASE}/users/${id}`,
  USER_STATUS: (id: string) => `${ADMIN_BASE}/users/${id}/status`,
  USER_ROLE: (id: string) => `${ADMIN_BASE}/users/${id}/role`,

  STATS: `${ADMIN_BASE}/stats`,

  AUDIT_LOGS: `${ADMIN_BASE}/audit-logs`,
  AUDIT_LOG_DETAIL: (id: string) => `${ADMIN_BASE}/audit-logs/${id}`,
  AUDIT_LOGS_BY_ENTITY: (entityType: string, entityId: string) =>
    `${ADMIN_BASE}/audit-logs/entity/${entityType}/${entityId}`,

  EXPORT_USERS: `${ADMIN_BASE}/export/users`,
  EXPORT_JOBS: `${ADMIN_BASE}/export/jobs`,
  EXPORT_APPLICATIONS: `${ADMIN_BASE}/export/applications`,

  REPORT_JOBS_BY_MONTH: `${ADMIN_BASE}/reports/jobs-by-month`,
  REPORT_APPLICATIONS_BY_MONTH: `${ADMIN_BASE}/reports/applications-by-month`,
} as const;
