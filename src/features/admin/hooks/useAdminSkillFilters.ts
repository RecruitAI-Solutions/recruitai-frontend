import { useAdminFilterBase } from "./useAdminFilterBase";
import type { SkillsParams } from "../types/admin.types";

const DEFAULT_FILTERS: SkillsParams = {
  page: 1,
  pageSize: 10,
  sortBy: "name",
  sortOrder: "asc",
};

export const useAdminSkillFilters = () => {
  return useAdminFilterBase<SkillsParams>(DEFAULT_FILTERS);
};
