import type { CompanyFilters } from "../types/company.types";

export const COMPANY_QUERY_KEYS = {
  all: ["companies"] as const,
  list: (params?: CompanyFilters) => ["companies", "list", params] as const,
  detail: (id: string) => ["companies", id] as const,
  suggest: (q: string) => ["companies", "suggest", q] as const,
  jobs: (id: string, params?: object) =>
    ["companies", id, "jobs", params] as const,
};
