const GEO_BASE = "/v1/geocoding";

export const GEO_ENDPOINTS = {
  SEARCH: `${GEO_BASE}/search`,
  DETAIL: (refId: string) => `${GEO_BASE}/place/${refId}`,
  REVERSE: `${GEO_BASE}/reverse`,
} as const;
