import { useAdminFilterBase } from "./useAdminFilterBase";
import type { AdminUsersParams } from "../types/admin.types";

const DEFAULT_FILTERS: AdminUsersParams = {
  page: 1,
  pageSize: 10,
  sortBy: "createdAt",
  sortOrder: "desc",
};

export const useUserFilters = () => {
  return useAdminFilterBase<AdminUsersParams>(DEFAULT_FILTERS);
};
