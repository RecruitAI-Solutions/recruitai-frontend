import type { JobFilters } from "@/features/jobs/types/job.types";
import type {
  AdminUsersParams,
  AuditLogsParams,
  AdminStatsParams,
  ReportParams,
  SkillsParams,
} from "../types/admin.types";

export const ADMIN_QUERY_KEYS = {
  all: ["admin"] as const,
  users: (params?: AdminUsersParams) => ["admin", "users", params] as const,
  userDetail: (id: string) => ["admin", "user", id] as const,
  stats: (params?: AdminStatsParams) => ["admin", "stats", params] as const,
  auditLogs: (params?: AuditLogsParams) =>
    ["admin", "audit-logs", params] as const,
  auditLogDetail: (id: string) => ["admin", "audit-log", id] as const,
  auditLogsByEntity: (
    entityType: string,
    entityId: string,
    params?: { page?: number; pageSize?: number },
  ) => ["admin", "audit-logs", entityType, entityId, params] as const,
  jobsReport: (params?: ReportParams) =>
    ["admin", "report", "jobs-by-month", params] as const,
  applicationsReport: (params?: ReportParams) =>
    ["admin", "report", "applications-by-month", params] as const,
  jobs: (filters?: JobFilters) => ["admin", "jobs", filters] as const,
  skills: (params?: SkillsParams) => ["admin", "skills", params] as const,
};
