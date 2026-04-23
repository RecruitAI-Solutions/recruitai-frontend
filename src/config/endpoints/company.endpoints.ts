const COMPANY_BASE = "/v1/Companies";

export const COMPANY_ENDPOINTS = {
  LIST: COMPANY_BASE,
  DETAIL: (id: string) => `${COMPANY_BASE}/${id}`,
  SUGGEST: `${COMPANY_BASE}/suggest`,
  JOBS: (id: string) => `${COMPANY_BASE}/${id}/jobs`,
  UPDATE: (id: string) => `${COMPANY_BASE}/${id}`,
} as const;
