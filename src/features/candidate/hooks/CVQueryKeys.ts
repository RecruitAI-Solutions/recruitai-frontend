export const CV_QUERY_KEYS = {
  myCVs: ["cvs", "my"] as const,
  detail: (id: string) => ["cvs", id] as const,
};
