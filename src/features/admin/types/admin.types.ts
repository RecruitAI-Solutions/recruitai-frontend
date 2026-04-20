export const USER_STATUS = {
  ACTIVE: 1,
  INACTIVE: 2,
  LOCKED: 3,
  PENDING_VERIFICATION: 4,
  DELETED: 5,
  BANNED: 6,
} as const;

export type UserStatusValue = (typeof USER_STATUS)[keyof typeof USER_STATUS];

export const USER_STATUS_LABEL: Record<UserStatusValue, string> = {
  [USER_STATUS.ACTIVE]: "Hoạt động",
  [USER_STATUS.INACTIVE]: "Chưa kích hoạt",
  [USER_STATUS.LOCKED]: "Tạm khóa",
  [USER_STATUS.PENDING_VERIFICATION]: "Chờ xác thực",
  [USER_STATUS.DELETED]: "Đã xóa",
  [USER_STATUS.BANNED]: "Bị cấm",
};

export const USER_ROLE = {
  CANDIDATE: 1,
  RECRUITER: 2,
  ADMIN: 3,
} as const;

export type UserRoleValue = (typeof USER_ROLE)[keyof typeof USER_ROLE];

export const USER_ROLE_LABEL: Record<UserRoleValue, string> = {
  [USER_ROLE.CANDIDATE]: "Ứng viên",
  [USER_ROLE.RECRUITER]: "Nhà tuyển dụng",
  [USER_ROLE.ADMIN]: "Quản trị viên",
};

export const GENDER = {
  UNKNOWN: 0,
  MALE: 1,
  FEMALE: 2,
  OTHER: 3,
} as const;

export type GenderValue = (typeof GENDER)[keyof typeof GENDER];

export const GENDER_LABEL: Record<GenderValue, string> = {
  [GENDER.UNKNOWN]: "Không xác định",
  [GENDER.MALE]: "Nam",
  [GENDER.FEMALE]: "Nữ",
  [GENDER.OTHER]: "Khác",
};

export const JOB_STATUS = {
  DRAFT: 1,
  PUBLISHED: 2,
  CLOSED: 3,
  EXPIRED: 4,
  PENDING: 5,
} as const;

export type JobStatusValue = (typeof JOB_STATUS)[keyof typeof JOB_STATUS];

export const JOB_STATUS_LABEL: Record<JobStatusValue, string> = {
  [JOB_STATUS.DRAFT]: "Nháp",
  [JOB_STATUS.PUBLISHED]: "Đã đăng",
  [JOB_STATUS.CLOSED]: "Đã đóng",
  [JOB_STATUS.EXPIRED]: "Hết hạn",
  [JOB_STATUS.PENDING]: "Chờ duyệt",
};

export type AdminJobSummary = {
  id: string;
  title: string;
  company: string;
  location: string;
  status: JobStatusValue;
  createdAt: string;
  applications: number;
};

export type AdminJobsParams = {
  page?: number;
  pageSize?: number;
  keyword?: string;
  status?: JobStatusValue;
  sortBy?: "createdAt" | "title";
  sortOrder?: "asc" | "desc";
};

export type Skill = {
  id: number;
  name: string;
  category: string;
  isActive: boolean;
  createdAt: string;
};

export type SkillsParams = {
  page?: number;
  pageSize?: number;
  keyword?: string;
  category?: string;
  isActive?: boolean;
  sortBy?: "name" | "createdAt";
  sortOrder?: "asc" | "desc";
};

export const AUDIT_ENTITY_TYPE = {
  USER: 1,
  CV: 2,
  JOB: 3,
  APPLICATION: 4,
} as const;

export type AuditEntityTypeValue =
  (typeof AUDIT_ENTITY_TYPE)[keyof typeof AUDIT_ENTITY_TYPE];

export const AUDIT_ENTITY_TYPE_LABEL: Record<AuditEntityTypeValue, string> = {
  [AUDIT_ENTITY_TYPE.USER]: "Người dùng",
  [AUDIT_ENTITY_TYPE.CV]: "Hồ sơ",
  [AUDIT_ENTITY_TYPE.JOB]: "Công việc",
  [AUDIT_ENTITY_TYPE.APPLICATION]: "Đơn ứng tuyển",
};

export const AUDIT_ACTION = {
  CREATE: 1,
  UPDATE: 2,
  DELETE: 3,
  LOGIN: 4,
  LOGOUT: 5,
  REFRESH_TOKEN: 6,
  CHANGE_PASSWORD: 7,
  CHANGE_STATUS: 8,
  CHANGE_ROLE: 9,
  UPLOAD: 10,
  ANALYZE: 11,
  CREATE_JOB: 12,
  UPDATE_JOB: 13,
  DELETE_JOB: 14,
  APPLY: 15,
  UPDATE_APPLICATION_STATUS: 16,
} as const;

export type AuditActionValue = (typeof AUDIT_ACTION)[keyof typeof AUDIT_ACTION];

export const AUDIT_ACTION_LABEL: Record<AuditActionValue, string> = {
  [AUDIT_ACTION.CREATE]: "Tạo mới",
  [AUDIT_ACTION.UPDATE]: "Cập nhật",
  [AUDIT_ACTION.DELETE]: "Xóa",
  [AUDIT_ACTION.LOGIN]: "Đăng nhập",
  [AUDIT_ACTION.LOGOUT]: "Đăng xuất",
  [AUDIT_ACTION.REFRESH_TOKEN]: "Làm mới token",
  [AUDIT_ACTION.CHANGE_PASSWORD]: "Đổi mật khẩu",
  [AUDIT_ACTION.CHANGE_STATUS]: "Thay đổi trạng thái",
  [AUDIT_ACTION.CHANGE_ROLE]: "Thay đổi vai trò",
  [AUDIT_ACTION.UPLOAD]: "Tải lên",
  [AUDIT_ACTION.ANALYZE]: "Phân tích",
  [AUDIT_ACTION.CREATE_JOB]: "Tạo công việc",
  [AUDIT_ACTION.UPDATE_JOB]: "Cập nhật công việc",
  [AUDIT_ACTION.DELETE_JOB]: "Xóa công việc",
  [AUDIT_ACTION.APPLY]: "Ứng tuyển",
  [AUDIT_ACTION.UPDATE_APPLICATION_STATUS]: "Cập nhật trạng thái đơn",
};

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
};

export type AdminUserSummary = {
  id: string;
  email: string;
  fullName: string;
  role: UserRoleValue;
  status: UserStatusValue;
  emailVerified: boolean;
  createdAt: string;
  lastLoginAt: string | null;
  phoneNumber: string | null;
};

export type AdminUsersParams = {
  page?: number;
  pageSize?: number;
  role?: string;
  status?: UserStatusValue;
  keyword?: string;
  sortBy?: "createdAt" | "fullName" | "email";
  sortOrder?: "asc" | "desc";
};

export type AdminUserDetail = {
  id: string;
  email: string;
  fullName: string;
  role: UserRoleValue;
  status: UserStatusValue;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string | null;
  lastLoginAt: string | null;
  gender: GenderValue | null;
  dateOfBirth: string | null;
  phoneNumber: string | null;
  avatarUrl: string | null;
  permissions: string[];
};

export type AdminUserUpdateRequest = {
  fullName?: string;
  phoneNumber?: string;
  gender?: GenderValue;
  dateOfBirth?: string;
};

export type AdminUserUpdateResponse = {
  id: string;
  email: string;
  fullName: string;
  role: UserRoleValue;
  status: UserStatusValue;
  updatedAt: string;
};

export type AdminUserDeleteResponse = {
  id: string;
  deleted: boolean;
  deletedAt: string;
};

export type AdminUserStatusUpdateRequest = {
  status: UserStatusValue;
  reason?: string;
};

export type AdminUserStatusUpdateResponse = {
  id: string;
  status: UserStatusValue;
  reason: string | null;
  updatedAt: string;
};

export type AdminUserRoleUpdateRequest = {
  role: UserRoleValue;
};

export type AdminUserRoleUpdateResponse = {
  id: string;
  role: UserRoleValue;
  permissions: string[];
  updatedAt: string;
};

export type AdminStatsParams = {
  fromDate?: string;
  toDate?: string;
};

export type AdminStatsResponse = {
  summary: {
    totalCVs: number;
    totalJobs: number;
    totalUsers: number;
    totalApplications: number;
  };
  usersByRole: Record<string, number>;
  cvsByStatus: Record<string, number>;
  jobsByStatus: Record<string, number>;
  applicationsByStatus: Record<string, number>;
  recentTrend: {
    cvsLast7Days: number[];
    jobsLast7Days: number[];
    applicationsLast7Days: number[];
  };
  filter: {
    fromDate: string;
    toDate: string;
  } | null;
};

export type AuditLog = {
  id: string;
  entityType: string;
  action: string;
  entityId: string;
  entityName: string;
  oldValue: string | null;
  newValue: string | null;
  reason: string | null;
  changedBy: string;
  changedByIp: string | null;
  changedAt: string;
};

export type AuditLogsParams = {
  page?: number;
  pageSize?: number;
  entityType?: string;
  action?: string;
  userId?: string;
  fromDate?: string;
  toDate?: string;
  keyword?: string;
  sortBy?: "changedAt";
  sortOrder?: "asc" | "desc";
};

export type ExportUsersParams = {
  format?: "excel" | "csv";
  role?: string;
  status?: UserStatusValue;
  fromDate?: string;
  toDate?: string;
  keyword?: string;
};

export type ExportJobsParams = {
  format?: "excel" | "csv";
  status?: number;
  fromDate?: string;
  toDate?: string;
  keyword?: string;
};

export type ExportApplicationsParams = {
  format?: "excel" | "csv";
  status?: number;
  fromDate?: string;
  toDate?: string;
  minMatch?: number;
};

export type MonthlyJobReportItem = {
  month: number;
  monthName: string;
  total: number;
};

export type JobsByMonthReportResponse = {
  year: number;
  data: MonthlyJobReportItem[];
  total: number;
  average: number;
};

export type MonthlyApplicationReportItem = {
  month: number;
  monthName: string;
  total: number;
  pending: number;
  reviewed: number;
  accepted: number;
  rejected: number;
};

export type ApplicationsByMonthReportResponse = {
  year: number;
  data: MonthlyApplicationReportItem[];
  total: number;
  average: number;
};

export type ReportParams = {
  year?: number;
  status?: number;
};
