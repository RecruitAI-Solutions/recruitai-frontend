export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  AUTH_CALLBACK: "/auth/callback",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  VERIFY_EMAIL: "/verify-email",
  ABOUT: "/about",
  CONTACT: "/contact",
  JOB: "/jobs",
  JOB_DETAILS: (id: string) => `/jobs/${id}`,

  CANDIDATE: {
    DASHBOARD: "/candidate/dashboard",
    PROFILE: "/candidate/profile",
    JOBS: "/candidate/jobs",
    JOB_DETAIL: (id: string) => `/candidate/jobs/${id}`,
    APPLICATION: "/candidate/application",
    APPLICATION_DETAIL: (id: string) => `/candidate/application/${id}`,
    CV_MANAGEMENT: "/candidate/cv",
    SETTINGS: "/candidate/settings",
  },

  RECRUITER: {
    DASHBOARD: "/recruiter/dashboard",
    PROFILE: "/recruiter/profile",
    JOBS: "/recruiter/jobs",
    JOB_CREATE: "/recruiter/jobs/create",
    JOB_EDIT: (id: string) => `/recruiter/jobs/${id}/edit`,
    JOB_DETAIL: (id: string) => `/recruiter/jobs/${id}`,
    APPLICANTS: (jobId: string) => `/recruiter/jobs/${jobId}/applicants`,
    APPLICANT_DETAIL: (jobId: string, applicantId: string) =>
      `/recruiter/jobs/${jobId}/applicants/${applicantId}`,
    COMPANY_PROFILE: "/recruiter/company",
    SETTINGS: "/recruiter/settings",
  },

  ADMIN: {
    DASHBOARD: "/admin/dashboard",
    USERS: "/admin/users",
    USER_DETAIL: (id: string) => `/admin/users/${id}`,
    JOBS: "/admin/jobs",
    CATEGORIES: "/admin/categories",
    REPORTS: "/admin/reports",
    SETTINGS: "/admin/settings",
    ANALYTICS: "/admin/analytics",
  },

  NOTFOUND: "/404",
  UNAUTHORIZED: "/401",
  SERVER_ERROR: "/500",
} as const;

export const PUBLIC_ROUTES = [
  ROUTES.HOME,
  ROUTES.LOGIN,
  ROUTES.REGISTER,
  ROUTES.AUTH_CALLBACK,
  ROUTES.FORGOT_PASSWORD,
  ROUTES.RESET_PASSWORD,
  ROUTES.VERIFY_EMAIL,
  ROUTES.ABOUT,
  ROUTES.CONTACT,
] as const;

export const CANDIDATE_ROUTES = Object.values(ROUTES.CANDIDATE);
export const RECRUITER_ROUTES = Object.values(ROUTES.RECRUITER);
export const ADMIN_ROUTES = Object.values(ROUTES.ADMIN);
