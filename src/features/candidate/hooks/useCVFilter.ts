import { useSearchParams } from "react-router-dom";
import { useMemo, useCallback } from "react";
import { useDebounce } from "@/lib/useDebounce";

export type CVFilters = {
  page?: number;
  pageSize?: number;
  status?: number;
  fileName?: string;
  fromDate?: string;
  toDate?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

export type CVFiltersJobsView = {
  page?: number;
  pageSize?: number;
  status?: number[];
  fileName?: string;
  fromDate?: string;
  toDate?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};


const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_SORT_BY = "uploadedAt";
const DEFAULT_SORT_ORDER = "desc";

export const useCVFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const rawFilter: CVFilters = useMemo(() => {
    const statusParam = searchParams.get("status");
    return {
      page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
      pageSize: searchParams.get("pageSize")
        ? Number(searchParams.get("pageSize"))
        : DEFAULT_PAGE_SIZE,
      status: statusParam ? Number(statusParam) : undefined,
      fileName: searchParams.get("fileName") || undefined,
      fromDate: searchParams.get("fromDate") || undefined,
      toDate: searchParams.get("toDate") || undefined,
      sortBy: searchParams.get("sortBy") || DEFAULT_SORT_BY,
      sortOrder:
        (searchParams.get("sortOrder") as "asc" | "desc") || DEFAULT_SORT_ORDER,
    };
  }, [searchParams]);

  // Debounce text fields
  const debouncedFileName = useDebounce(rawFilter.fileName, 300);
  const debouncedFromDate = useDebounce(rawFilter.fromDate, 300);
  const debouncedToDate = useDebounce(rawFilter.toDate, 300);

  const filter: CVFilters = useMemo(
    () => ({
      ...rawFilter,
      fileName: debouncedFileName,
      fromDate: debouncedFromDate,
      toDate: debouncedToDate,
    }),
    [rawFilter, debouncedFileName, debouncedFromDate, debouncedToDate],
  );

  const updateFilter = useCallback(
    (newValues: Partial<CVFilters>) => {
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

  const resetFilter = useCallback(() => {
    setSearchParams(new URLSearchParams());
  }, [setSearchParams]);

  return { filter, updateFilter, resetFilter };
};
