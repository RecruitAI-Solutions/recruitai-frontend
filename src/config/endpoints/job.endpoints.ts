const JOB_BASE = "/v1/jobs";

export const JOB_ENDPOINTS = {
  LIST: JOB_BASE,
  CREATE: JOB_BASE,
  MY_JOBS: `${JOB_BASE}/my-jobs`,
  DELETED: `${JOB_BASE}/deleted`,
  FEATURED: `${JOB_BASE}/featured`,
  DETAIL: (id: string) => `${JOB_BASE}/${id}`,
  UPDATE: (id: string) => `${JOB_BASE}/${id}`,
  DELETE: (id: string) => `${JOB_BASE}/${id}`,
} as const;
