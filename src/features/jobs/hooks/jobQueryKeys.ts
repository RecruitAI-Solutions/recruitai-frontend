import type { JobFilters } from "../types/job.types";

export const JOB_QUERY_KEYS = {
  all: ["jobs"] as const,
  lists: () => [...JOB_QUERY_KEYS.all, "list"] as const,
  list: (filters?: JobFilters) => [...JOB_QUERY_KEYS.lists(), filters] as const,
  //     ↑ Include filters in key for proper caching

  myJobs: () => [...JOB_QUERY_KEYS.all, "my-jobs"] as const,
  detail: (id: string) => [...JOB_QUERY_KEYS.all, "detail", id] as const,
};
