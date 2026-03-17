import { axiosInstance } from "@/services/api/axiosInstance";
import {
  mapRoleNumberToString,
  type AuthResponse,
  type ChangePasswordRequest,
  type ForgotPasswordRequest,
  type LoginRequest,
  type LoginResponse,
  type LogoutRequest,
  type RefreshTokenRequest,
  type RefreshTokenResponse,
  type RegisterRequest,
  type ResetPasswordRequest,
  type RegisterResponse,
  type SendVerificationEmailRequest,
  type SuccessResponse,
  type User,
  type UserMeResponse,
  type UserPermissionsResponse,
  type VerifyEmailRequest,
} from "../types/auth.types";
import { AUTH_ENDPOINTS } from "@/config/api.config";

const transformAuthResponse = (data: AuthResponse): LoginResponse => {
  const user: User = {
    id: data.userId,
    email: data.email,
    fullName: data.fullName,
    role: mapRoleNumberToString(data.role),
    roleNumber: data.role,
    roleName: data.roleName,
    permissions: data.permissions,
  };

  return {
    user,
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
    expiresIn: data.expiresIn,
    tokenType: data.tokenType,
  };
};

const transformUserMeResponse = (data: UserMeResponse): User => {
  return {
    id: data.userId,
    email: data.email,
    fullName: data.fullName,
    role: mapRoleNumberToString(data.role),
    roleNumber: data.role,
    roleName: data.roleName,
    permissions: data.permissions,
    phoneNumber: data.phoneNumber,
    gender: data.gender,
    dateOfBirth: data.dateOfBirth,
    status: data.status,
    createdAt: data.createdAt,
    lastLoginAt: data.lastLoginAt,
  };
};

//api functions
export const authApi = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await axiosInstance.post<AuthResponse>(
      AUTH_ENDPOINTS.LOGIN,
      credentials,
    );

    console.log("response: ", response);
    console.log("authAPI: ", transformAuthResponse(response.data));

    return transformAuthResponse(response.data);
  },

  register: async (credentials: RegisterRequest): Promise<RegisterResponse> => {
    const response = await axiosInstance.post<AuthResponse>(
      AUTH_ENDPOINTS.REGISTER,
      credentials,
    );

    return transformAuthResponse(response.data);
  },

  getMe: async (): Promise<User> => {
    const response = await axiosInstance.get<UserMeResponse>(AUTH_ENDPOINTS.ME);
    return transformUserMeResponse(response.data);
  },

  logout: async (credentials: LogoutRequest): Promise<SuccessResponse> => {
    const response = await axiosInstance.post<SuccessResponse>(
      AUTH_ENDPOINTS.LOGOUT,
      credentials,
    );
    return response.data;
  },

  refreshToken: async (
    credentials: RefreshTokenRequest,
  ): Promise<RefreshTokenResponse> => {
    const response = await axiosInstance.post<RefreshTokenResponse>(
      AUTH_ENDPOINTS.REFRESH_TOKEN,
      credentials,
    );
    return response.data;
  },

  getUserPermissions: async (
    language: "vi" | "en" = "vi",
  ): Promise<UserPermissionsResponse> => {
    const response = await axiosInstance.get<UserPermissionsResponse>(
      AUTH_ENDPOINTS.USER_PERMISSIONS,
      {
        params: { language },
      },
    );
    return response.data;
  },

  changePassword: async (
    credentials: ChangePasswordRequest,
  ): Promise<SuccessResponse> => {
    const response = await axiosInstance.post<SuccessResponse>(
      AUTH_ENDPOINTS.CHANGE_PASSWORD,
      credentials,
    );
    return response.data;
  },

  forgotPassword: async (
    credentials: ForgotPasswordRequest,
  ): Promise<SuccessResponse> => {
    const response = await axiosInstance.post<SuccessResponse>(
      AUTH_ENDPOINTS.FORGOT_PASSWORD,
      credentials,
    );

    return response.data;
  },

  resetPassword: async (
    credentials: ResetPasswordRequest,
  ): Promise<SuccessResponse> => {
    const response = await axiosInstance.post<SuccessResponse>(
      AUTH_ENDPOINTS.RESET_PASSWORD,
      credentials,
    );
    return response.data;
  },

  sendVerificationEmail: async (
    credentials: SendVerificationEmailRequest,
  ): Promise<SuccessResponse> => {
    const response = await axiosInstance.post<SuccessResponse>(
      AUTH_ENDPOINTS.SEND_VERIFICATION_EMAIL,
      credentials,
    );
    return response.data;
  },

  verifyEmail: async (
    credentials: VerifyEmailRequest,
  ): Promise<SuccessResponse> => {
    const response = await axiosInstance.post<SuccessResponse>(
      AUTH_ENDPOINTS.VERIFY_EMAIL,
      credentials,
    );
    return response.data;
  },
};

export type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  User,
};
