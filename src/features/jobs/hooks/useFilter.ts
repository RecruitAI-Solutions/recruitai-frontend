import { useSearchParams } from "react-router-dom";
import { useMemo, useCallback } from "react";
import type { JobFilters } from "../types/job.types";

const DEFAULT_SORT_BY = "createdAt";
const DEFAULT_SORT_ORDER = "desc";
const DEFAULT_PAGE_SIZE = 6;

export const useFilter = (): {
  filter: JobFilters;
  updateFilter: (newValues: Partial<JobFilters>) => void;
  resetFilter: () => void;
} => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filter: JobFilters = useMemo(
    () => ({
      title: searchParams.get("title") || undefined,
      location: searchParams.get("location") || undefined,
      minSalary: searchParams.get("minSalary")
        ? Number(searchParams.get("minSalary"))
        : undefined,
      maxSalary: searchParams.get("maxSalary")
        ? Number(searchParams.get("maxSalary"))
        : undefined,
      employmentType: searchParams.get("employmentType") || undefined,
      experienceLevel: searchParams.get("experienceLevel") || undefined,
      skill: searchParams.get("skill") || undefined,
      sortBy: searchParams.get("sortBy") || DEFAULT_SORT_BY,
      sortOrder:
        (searchParams.get("sortOrder") as "asc" | "desc") || DEFAULT_SORT_ORDER,
      page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
      pageSize: searchParams.get("pageSize")
        ? Number(searchParams.get("pageSize"))
        : DEFAULT_PAGE_SIZE,
    }),
    [searchParams],
  );

  const updateFilter = useCallback(
    (newValues: Partial<JobFilters>) => {
      setSearchParams((prevParams) => {
        const updated = new URLSearchParams(prevParams);

        Object.entries(newValues).forEach(([key, value]) => {
          if (value === undefined || value === null || value === "") {
            updated.delete(key);
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
          "skill",
        ];
        const isCriteriaChanging = Object.keys(newValues).some((key) =>
          filterKeys.includes(key),
        );

        if (isCriteriaChanging && !("page" in newValues)) {
          updated.delete("page");
        }

        return updated;
      });
    },
    [setSearchParams],
  );

  const resetFilter = useCallback(() => {
    setSearchParams({}, { replace: true });
  }, [setSearchParams]);

  return {
    filter,
    updateFilter,
    resetFilter,
  };
};
