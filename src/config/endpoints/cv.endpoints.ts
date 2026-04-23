const CV_BASE = "/v1/CV";

export const CV_ENDPOINTS = {
  UPLOAD: `${CV_BASE}/upload`,
  MY_CVS: `${CV_BASE}/my-cvs`,
  DETAIL: (id: string) => `${CV_BASE}/${id}`,
  DOWNLOAD: (id: string) => `${CV_BASE}/${id}/download`,
} as const;
