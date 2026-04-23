import { useQuery } from "@tanstack/react-query";
import { adminApi } from "../services/adminApi";
import { ADMIN_QUERY_KEYS } from "./adminQueryKeys";
import type { AuditLogsParams } from "../types/admin.types";

export const useAuditLogs = (params?: AuditLogsParams) => {
  return useQuery({
    queryKey: ADMIN_QUERY_KEYS.auditLogs(params),
    queryFn: () => adminApi.getAuditLogs(params),
  });
};

export const useAuditLogDetail = (id: string) => {
  return useQuery({
    queryKey: ADMIN_QUERY_KEYS.auditLogDetail(id),
    queryFn: () => adminApi.getAuditLogDetail(id),
    enabled: !!id,
  });
};

export const useAuditLogsByEntity = (
  entityType: string,
  entityId: string,
  params?: { page?: number; pageSize?: number },
) => {
  return useQuery({
    queryKey: ADMIN_QUERY_KEYS.auditLogsByEntity(entityType, entityId, params),
    queryFn: () => adminApi.getAuditLogsByEntity(entityType, entityId, params),
    enabled: !!entityType && !!entityId,
  });
};
