// config/endpoints/user.endpoints.ts
const USER_BASE = "/v1/users";

export const USER_ENDPOINTS = {
  DASHBOARD: `${USER_BASE}/dashboard`,
  AVATAR: `${USER_BASE}/avatar`,
  PROFILE: `${USER_BASE}/profile`,
} as const;