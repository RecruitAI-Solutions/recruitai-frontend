export const JOB_QUERY_KEYS = {
  list: ["jobs"] as const,
  myJobs: ["jobs", "mine"] as const,
  detail: (id: string) => ["jobs", id] as const,
};
