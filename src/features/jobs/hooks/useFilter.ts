import { useSearchParams } from "react-router-dom";
import { useMemo, useCallback } from "react";
import type { JobFilters } from "../types/job.types";

const DEFAULT_SORT_BY = "createdAt";
const DEFAULT_SORT_ORDER = "desc";
const DEFAULT_PAGE_SIZE = 6;
const DEFAULT_MATCH_ALL = true;

export const useFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filter: JobFilters = useMemo(() => {
    const params = Object.fromEntries(searchParams.entries());

    return {
      title: params.title || undefined,
      location: params.location || undefined,
      minSalary: params.minSalary ? Number(params.minSalary) : undefined,
      maxSalary: params.maxSalary ? Number(params.maxSalary) : undefined,
      employmentType: searchParams.getAll("employmentType").map(Number),
      experienceLevel: searchParams.getAll("experienceLevel").map(Number),
      skills: searchParams.getAll("skills"),
      matchAllSkills:
        params.matchAllSkills === "false" ? false : DEFAULT_MATCH_ALL,
      sortBy: params.sortBy || DEFAULT_SORT_BY,
      sortOrder: (params.sortOrder as "asc" | "desc") || DEFAULT_SORT_ORDER,
      page: params.page ? Number(params.page) : 1,
      pageSize: params.pageSize ? Number(params.pageSize) : DEFAULT_PAGE_SIZE,
    };
  }, [searchParams]);

  const updateFilter = useCallback(
    (newValues: Partial<JobFilters>) => {
      setSearchParams(
        (prev) => {
          const updated = new URLSearchParams(prev);
          Object.entries(newValues).forEach(([key, value]) => {
            updated.delete(key);
            if (value === undefined || value === null) return;
            if (Array.isArray(value)) {
              value.forEach((v) => updated.append(key, String(v)));
            } else {
              updated.set(key, String(value));
            }
          });

          const filterKeys = [
            "title",
            "location",
            "minSalary",
            "maxSalary",
            "employmentType",
            "experienceLevel",
            "skills",
            "matchAllSkills",
          ];
          const isCriteriaChanged = Object.keys(newValues).some((k) =>
            filterKeys.includes(k),
          );
          if (isCriteriaChanged && !("page" in newValues)) {
            updated.delete("page");
          }

          return updated;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  const resetFilter = useCallback(() => {
    setSearchParams({}, { replace: true });
  }, [setSearchParams]);

  return { filter, updateFilter, resetFilter };
};
