import { useSearchParams } from "react-router-dom";
import { useMemo, useCallback } from "react";
import type { JobApplicationsParams } from "../types/application.type";

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_SORT_BY = "appliedAt";
const DEFAULT_SORT_ORDER = "desc";

export const useApplicationFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filter: JobApplicationsParams = useMemo(
    () => ({
      page: searchParams.get("page")
        ? Number(searchParams.get("page"))
        : DEFAULT_PAGE,
      pageSize: searchParams.get("pageSize")
        ? Number(searchParams.get("pageSize"))
        : DEFAULT_PAGE_SIZE,
      status: searchParams.get("status")
        ? (Number(
            searchParams.get("status"),
          ) as JobApplicationsParams["status"])
        : undefined,
      minMatch: searchParams.get("minMatch")
        ? Number(searchParams.get("minMatch"))
        : undefined,
      sortBy:
        (searchParams.get("sortBy") as JobApplicationsParams["sortBy"]) ||
        DEFAULT_SORT_BY,
      sortOrder:
        (searchParams.get("sortOrder") as JobApplicationsParams["sortOrder"]) ||
        DEFAULT_SORT_ORDER,
    }),
    [searchParams],
  );

  const updateFilter = useCallback(
    (newValues: Partial<JobApplicationsParams>) => {
      setSearchParams((prev) => {
        const updated = new URLSearchParams(prev);
        Object.entries(newValues).forEach(([key, value]) => {
          if (
            value === undefined ||
            value === null ||
            (typeof value === "string" && value.trim() === "")
          ) {
            updated.delete(key);
          } else {
            updated.set(key, String(value));
          }
        });
        // Reset page về 1 khi thay đổi filter (trừ khi đang cập nhật page)
        if (!("page" in newValues)) {
          updated.delete("page");
        }
        return updated;
      });
    },
    [setSearchParams],
  );

  return { filter, updateFilter };
};
