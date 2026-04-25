export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  AUTH_CALLBACK: "/auth/callback",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  CHANGE_PASSWORD: "/change-password",
  VERIFY_EMAIL: "/verify-email",
  ABOUT: "/about",
  CONTACT: "/contact",
  JOB: "/jobs",
  JOB_DETAILS: (id: string) => `/jobs/${id}`,
  PROFILE: "/profile",
  COMPANY_DETAILS: (id: string) => `/companies/${id}`,

  CANDIDATE: {
    DASHBOARD: "/candidate/dashboard",
    PROFILE: "/candidate/profile",
    JOBS: "/candidate/jobs",
    JOB_DETAIL: (id: string) => `/candidate/jobs/${id}`,
    APPLICATIONS: "/candidate/applications",
    APPLICATION_DETAIL: (id: string) => `/candidate/applications/${id}`,
    CV_MANAGEMENT: "/candidate/cv",
    CV_DETAIL: (id: string) => `/candidate/cv/${id}`,
    CV_MATCHING_JOBS: (cvId: string) => `/candidate/cv/${cvId}/matching-jobs`,
    SETTINGS: "/candidate/settings",
    SAVED_JOBS: "",
  },

  RECRUITER: {
    DASHBOARD: "/recruiter/dashboard",
    PROFILE: "/recruiter/profile",
    JOBS: "/recruiter/jobs",
    JOB_CREATE: "/recruiter/jobs/create",
    JOB_EDIT: (id: string) => `/recruiter/jobs/${id}/edit`,
    JOB_DETAIL: (id: string) => `/recruiter/jobs/${id}`,
    APPLICANTS: (jobId: string) => `/recruiter/jobs/${jobId}/applicants`,
    APPLICATION_DETAIL: (applicationId: string) =>
      `/recruiter/applications/${applicationId}`,
    COMPANY_PROFILE: "/recruiter/company",
    SETTINGS: "/recruiter/settings",
  },

  ADMIN: {
    DASHBOARD: "/admin/dashboard",
    USERS: "/admin/users",
    USER_DETAIL: (id: string) => `/admin/users/${id}`,
    JOBS: "/admin/jobs",
    APPLICATIONS: "/admin/applications",
    SKILLS: "/admin/skills",
    AUDIT_LOGS: "/admin/audit-logs",
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
