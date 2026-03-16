export * from "./endpoints/auth.endpoints.ts";

export const ROLES = {
  ADMIN: "admin",
  RECRUITER: "recruiter",
  CANDIDATE: "candidate",
} as const;

export const GENDER = {
  MALE: 0,
  FEMALE: 1,
  OTHER: 2,
} as const;

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const API_TIMEOUT = 10000;

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
} as const;
