const JOB_BASE = "/api/v1/jobs";

export const JOB_ENPOINTS = {
  LIST: JOB_BASE,
  CREATE: JOB_BASE,
  MY_JOBS: `${JOB_BASE}/my-jobs`,
  DELETED: `${JOB_BASE}/deleted`,
  DETAIL: (id: string) => `${JOB_BASE}/${id}`,
  UPDATE: (id: string) => `${JOB_BASE}/${id}`,
  DELETE: (id: string) => `${JOB_BASE}/${id}`,
} as const;
