import { axiosInstance } from "@/services/api/axiosInstance";
import type {
  PaginatedResponse,
  AdminUserSummary,
  AdminUsersParams,
  AdminUserDetail,
  AdminUserUpdateRequest,
  AdminUserUpdateResponse,
  AdminUserDeleteResponse,
  AdminUserStatusUpdateRequest,
  AdminUserStatusUpdateResponse,
  AdminUserRoleUpdateRequest,
  AdminUserRoleUpdateResponse,
  AdminStatsParams,
  AdminStatsResponse,
  AuditLog,
  AuditLogsParams,
  ExportUsersParams,
  ExportJobsParams,
  ExportApplicationsParams,
  JobsByMonthReportResponse,
  ApplicationsByMonthReportResponse,
  ReportParams,
  AdminJobStatusUpdateRequest,
  AdminJobStatusUpdateResponse,
} from "../types/admin.types";
import { ADMIN_ENDPOINTS } from "@/config/endpoints/admin.enpoints";

export const adminApi = {
  getUsers: (params?: AdminUsersParams) =>
    axiosInstance
      .get<
        PaginatedResponse<AdminUserSummary>
      >(ADMIN_ENDPOINTS.USERS, { params })
      .then((res) => res.data),

  getUserDetail: (id: string) =>
    axiosInstance
      .get<AdminUserDetail>(ADMIN_ENDPOINTS.USER_DETAIL(id))
      .then((res) => res.data),

  updateUser: (id: string, data: AdminUserUpdateRequest) =>
    axiosInstance
      .put<AdminUserUpdateResponse>(ADMIN_ENDPOINTS.USER_UPDATE(id), data)
      .then((res) => res.data),

  deleteUser: (id: string) =>
    axiosInstance
      .delete<AdminUserDeleteResponse>(ADMIN_ENDPOINTS.USER_DELETE(id))
      .then((res) => res.data),

  updateUserStatus: (id: string, data: AdminUserStatusUpdateRequest) =>
    axiosInstance
      .patch<AdminUserStatusUpdateResponse>(
        ADMIN_ENDPOINTS.USER_STATUS(id),
        data,
      )
      .then((res) => res.data),

  updateUserRole: (id: string, data: AdminUserRoleUpdateRequest) =>
    axiosInstance
      .patch<AdminUserRoleUpdateResponse>(ADMIN_ENDPOINTS.USER_ROLE(id), data)
      .then((res) => res.data),

  getStats: (params?: AdminStatsParams) =>
    axiosInstance
      .get<AdminStatsResponse>(ADMIN_ENDPOINTS.STATS, { params })
      .then((res) => res.data),

  getAuditLogs: (params?: AuditLogsParams) =>
    axiosInstance
      .get<PaginatedResponse<AuditLog>>(ADMIN_ENDPOINTS.AUDIT_LOGS, { params })
      .then((res) => res.data),

  getAuditLogDetail: (id: string) =>
    axiosInstance
      .get<AuditLog>(ADMIN_ENDPOINTS.AUDIT_LOG_DETAIL(id))
      .then((res) => res.data),

  getAuditLogsByEntity: (
    entityType: string,
    entityId: string,
    params?: { page?: number; pageSize?: number },
  ) =>
    axiosInstance
      .get<
        PaginatedResponse<AuditLog>
      >(ADMIN_ENDPOINTS.AUDIT_LOGS_BY_ENTITY(entityType, entityId), { params })
      .then((res) => res.data),

  exportUsers: (params?: ExportUsersParams) =>
    axiosInstance
      .get(ADMIN_ENDPOINTS.EXPORT_USERS, { params, responseType: "blob" })
      .then((res) => res.data),

  exportJobs: (params?: ExportJobsParams) =>
    axiosInstance
      .get(ADMIN_ENDPOINTS.EXPORT_JOBS, { params, responseType: "blob" })
      .then((res) => res.data),

  exportApplications: (params?: ExportApplicationsParams) =>
    axiosInstance
      .get(ADMIN_ENDPOINTS.EXPORT_APPLICATIONS, {
        params,
        responseType: "blob",
      })
      .then((res) => res.data),

  getJobsByMonthReport: (params?: ReportParams) =>
    axiosInstance
      .get<JobsByMonthReportResponse>(ADMIN_ENDPOINTS.REPORT_JOBS_BY_MONTH, {
        params,
      })
      .then((res) => res.data),

  getApplicationsByMonthReport: (params?: ReportParams) =>
    axiosInstance
      .get<ApplicationsByMonthReportResponse>(
        ADMIN_ENDPOINTS.REPORT_APPLICATIONS_BY_MONTH,
        { params },
      )
      .then((res) => res.data),

  updateJobStatus: (jobId: string, data: AdminJobStatusUpdateRequest) =>
    axiosInstance
      .patch<AdminJobStatusUpdateResponse>(
        ADMIN_ENDPOINTS.JOB_STATUS(jobId),
        data,
      )
      .then((res) => res.data),
};
