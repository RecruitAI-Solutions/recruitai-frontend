import { useSearchParams } from "react-router-dom";
import { useMemo, useCallback } from "react";

export interface BaseFilterParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  keyword?: string;
}

export const useAdminFilterBase = <T extends BaseFilterParams>(
  defaultParams: T,
) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filter = useMemo(() => {
    const params: T = { ...defaultParams };

    (Object.keys(defaultParams) as (keyof T)[]).forEach((key) => {
      const value = searchParams.get(String(key));

      if (value !== null) {
        if (key === "page" || key === "pageSize") {
          params[key] = Number(value) as T[keyof T];
        } else {
          params[key] = value as T[keyof T];
        }
      }
    });

    return params;
  }, [searchParams, defaultParams]);

  const updateFilter = useCallback(
    (newValues: Partial<T>) => {
      setSearchParams(
        (prev) => {
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
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  return { filter, updateFilter };
};
