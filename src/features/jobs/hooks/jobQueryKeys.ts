import type { JobFilters } from "../types/job.types";

export const JOB_QUERY_KEYS = {
  all: ["jobs"] as const,
  lists: () => [...JOB_QUERY_KEYS.all, "list"] as const,
  list: (filters?: JobFilters) => {
    // Nếu không có filters, trả về mảng không chứa undefined
    return filters !== undefined
      ? [...JOB_QUERY_KEYS.lists(), filters]
      : [...JOB_QUERY_KEYS.lists()];
  },
  myJobs: ["jobs", "my-jobs"] as const, // <-- Sửa thành array trực tiếp, không cần hàm
  detail: (id: string) => [...JOB_QUERY_KEYS.all, "detail", id] as const,
  featured: () => [...JOB_QUERY_KEYS.all, "featured"] as const,
  similar: (id: string) => [...JOB_QUERY_KEYS.all, "similar", id] as const,
};
