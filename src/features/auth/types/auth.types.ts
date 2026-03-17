import type { UserRole } from "@/routes/RoleBasedRoute";

export const UserRoleValue = {
  CANDIDATE: "Candidate",
  RECRUITER: "Recruiter",
  ADMIN: "Admin",
} as const;

export const UserRoleNumber = {
  CANDIDATE: 1,
  RECRUITER: 2,
  ADMIN: 3,
} as const;

export const Gender = {
  UNSPECIFIED: 0,
  MALE: 1,
  FEMALE: 2,
  OTHER: 3,
} as const;

export const UserStatus = {
  ACTIVE: 1,
  INACTIVE: 2,
  LOKCED: 3,
  PENDING_VERIFICATION: 4,
  DELETED: 5,
} as const;

export type UserRoleType = (typeof UserRoleNumber)[keyof typeof UserRoleNumber];
export type GenderType = (typeof Gender)[keyof typeof Gender];
export type UserStatusType = (typeof UserStatus)[keyof typeof UserStatus];

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  role: number;
  email: string;
  password: string;
  fullName: string;
  gender: GenderType;
  phoneNumber: string;
  dateOfBirth: string;
};

export type LogoutRequest = {
  refreshToken: string;
};

export type RefreshTokenRequest = {
  refreshToken: string;
};

export type ChangePasswordRequest = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export type ForgotPasswordRequest = {
  email: string;
};

export type ResetPasswordRequest = {
  email: string;
  token: string;
  newPassword: string;
  confirmNewPassword: string;
};

export type SendVerificationEmailRequest = {
  email: string;
};

export type VerifyEmailRequest = {
  email: string;
  token: string;
};

// RESPONSE

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  userId: string;
  email: string;
  fullName: string;
  expiresIn: number;
  tokenType: string;
  role: number;
  roleName: string;
  permissions: string[];
};

export type UserMeResponse = {
  userId: string;
  email: string;
  fullName: string;
  role: number;
  roleName: string;
  gender: GenderType;
  phoneNumber: string;
  dateOfBirth: string;
  status: UserStatusType;
  permissions: string[];
  createdAt: string;
  lastLoginAt: string;
};

export type UserPermissionsResponse = {
  roles: string[];
  permissions: string[];
  groupedPermissions: {
    [groupedName: string]: Array<{
      code: string;
      name: string;
      group: string;
      description: string;
    }>;
  };
};

export type SuccessResponse = {
  success: boolean;
  message: string;
  timestamp: string;
};

export type RefreshTokenResponse = {
  accessToken: string;
  refreshToken: string;
  userId: string;
  email: string;
  fullName: string;
  role: number;
  roleName: string;
  permissions: string[];
  expiresIn: number;
};

//TRANSFORM TYPE

export type User = {
  id: string;
  email: string;
  fullName: string;
  role: "candidate" | "recruiter" | "admin";
  roleNumber: number;
  roleName: string;
  permissions: string[];

  phoneNumber?: string;
  gender?: GenderType;
  dateOfBirth?: string;
  status?: UserStatusType;
  avatar?: string;
  createdAt?: string;
  lastLoginAt?: string;
};

export type LoginResponse = {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
};

export type RegisterResponse = LoginResponse;

// MAP ROLES

export const mapRoleNumberToString = (
  roleNumber: number,
): "candidate" | "recruiter" | "admin" => {
  switch (roleNumber) {
    case 1:
      return "candidate";
    case 2:
      return "recruiter";
    case 3:
      return "admin";
    default:
      return "candidate";
  }
};

export const mapRoleStringToNumber = (roleString: string): 1 | 2 | 3 => {
  switch (roleString) {
    case "candidate":
      return 1;
    case "recruiter":
      return 2;
    case "admin":
      return 3;
    default:
      return 1;
  }
};

export type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  role: UserRole | null;
  loading: boolean;
  error: string | null;
};
