import { useSearchParams } from "react-router-dom";
import { useMemo, useCallback } from "react";

export type MatchingFilters = {
  page?: number;
  pageSize?: number;
  minMatch?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_SORT_BY = "matchPercentage";
const DEFAULT_SORT_ORDER = "desc";

export const useMatchingFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filter: MatchingFilters = useMemo(
    () => ({
      page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
      pageSize: searchParams.get("pageSize")
        ? Number(searchParams.get("pageSize"))
        : DEFAULT_PAGE_SIZE,
      minMatch: searchParams.get("minMatch")
        ? Number(searchParams.get("minMatch"))
        : undefined,
      sortBy: searchParams.get("sortBy") || DEFAULT_SORT_BY,
      sortOrder:
        (searchParams.get("sortOrder") as "asc" | "desc") || DEFAULT_SORT_ORDER,
    }),
    [searchParams],
  );

  const updateFilter = useCallback(
    (newValues: Partial<MatchingFilters>) => {
      setSearchParams((prev) => {
        const updated = new URLSearchParams(prev);
        Object.entries(newValues).forEach(([key, value]) => {
          if (value === undefined || value === null || value === "") {
            updated.delete(key);
          } else {
            updated.set(key, String(value));
          }
        });
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
