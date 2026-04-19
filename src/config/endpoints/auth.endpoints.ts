const AUTH_BASE = "/v1/auth";

export const AUTH_ENDPOINTS = {
  LOGIN: `${AUTH_BASE}/login`,
  REGISTER: `${AUTH_BASE}/register`,
  LOGOUT: `${AUTH_BASE}/logout`,
  REFRESH_TOKEN: `${AUTH_BASE}/refresh-token`,

  ME: `${AUTH_BASE}/me`,

  CHANGE_PASSWORD: `${AUTH_BASE}/change-password`,
  FORGOT_PASSWORD: `${AUTH_BASE}/forgot-password`,
  RESET_PASSWORD: `${AUTH_BASE}/reset-password`,

  SEND_VERIFICATION_EMAIL: `${AUTH_BASE}/send-verification-email`,
  VERIFY_EMAIL: `${AUTH_BASE}/verify-email`,

  CONFIG: `${AUTH_BASE}/config`,
  USER_PERMISSIONS: `${AUTH_BASE}/user-permissions`,

  EXTERNAL_LOGIN: (provider: string) => `${AUTH_BASE}/login/${provider}`,
  EXTERNAL_LOGIN_CALLBACK: `${AUTH_BASE}/external-login-callback`,
} as const;

export const {
  LOGIN,
  REGISTER,
  LOGOUT,
  REFRESH_TOKEN,
  ME,
  CHANGE_PASSWORD,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  SEND_VERIFICATION_EMAIL,
  VERIFY_EMAIL,
  CONFIG,
  USER_PERMISSIONS,
  EXTERNAL_LOGIN,
  EXTERNAL_LOGIN_CALLBACK,
} = AUTH_ENDPOINTS;
