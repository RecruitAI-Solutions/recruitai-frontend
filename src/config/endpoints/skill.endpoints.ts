const SKILL_BASE = "/v1/skills";

export const SKILL_ENDPOINTS = {
  LIST: SKILL_BASE,
  CREATE: SKILL_BASE,
  CATEGORIES: `${SKILL_BASE}/categories`,
  SUGGEST: `${SKILL_BASE}/suggest`,
  DETAIL: (id: number) => `${SKILL_BASE}/${id}`,
  UPDATE: (id: number) => `${SKILL_BASE}/${id}`,
  DELETE: (id: number) => `${SKILL_BASE}/${id}`,
} as const;
