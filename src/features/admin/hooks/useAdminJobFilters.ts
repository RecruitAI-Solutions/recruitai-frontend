import { useAdminFilterBase } from "./useAdminFilterBase";
import type { JobFilters } from "@/features/jobs/types/job.types";

const DEFAULT_FILTERS: JobFilters = {
  page: 1,
  pageSize: 10,
  sortBy: "createdAt",
  sortOrder: "desc",
};

export const useAdminJobFilters = () => {
  return useAdminFilterBase<JobFilters>(DEFAULT_FILTERS);
};
