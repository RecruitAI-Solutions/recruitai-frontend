import { useAdminFilterBase } from "./useAdminFilterBase";
import type { AuditLogsParams } from "../types/admin.types";

const DEFAULT_FILTERS: AuditLogsParams = {
  page: 1,
  pageSize: 20,
  sortBy: "changedAt",
  sortOrder: "desc",
};

export const useAuditLogFilters = () => {
  return useAdminFilterBase<AuditLogsParams>(DEFAULT_FILTERS);
};
