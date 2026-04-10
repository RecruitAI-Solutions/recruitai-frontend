import { useSearchParams } from "react-router-dom";
import { useMemo, useCallback } from "react";
import type { JobFilters } from "../types/job.types";

export const useFilter = () => {
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
      sortBy: searchParams.get("sortBy") || "createdAt",
      sortOrder: (searchParams.get("sortOrder") as "asc" | "desc") || "desc",
      page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
      limit: searchParams.get("limit") ? Number(searchParams.get("limit")) : 10,
    }),
    [searchParams],
  );

  const updateFilter = useCallback(
    (newValues: Partial<JobFilters>) => {
      const updated = new URLSearchParams(searchParams);

      Object.entries(newValues).forEach(([key, value]) => {
        if (value === undefined || value === null || value === "") {
          updated.delete(key);
        } else {
          updated.set(key, String(value));
        }
      });

      if (!("page" in newValues)) {
        updated.set("page", "1");
      }

      setSearchParams(updated);
    },
    [searchParams, setSearchParams],
  );

  const resetFilter = useCallback(() => {
    setSearchParams(new URLSearchParams());
  }, [setSearchParams]);

  return {
    filter,
    updateFilter,
    resetFilter,
  };
};
