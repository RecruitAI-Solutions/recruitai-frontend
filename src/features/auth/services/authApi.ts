import { axiosInstance } from "@/services/api/axiosInstance";

export type LoginCredentials = {
  username: string;
  password: string;
};

export type AuthResponse = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
  refreshToken: string;
};

export type User = {
  id: string;
  email: string;
  role: "candidate" | "recruiter" | "admin";
  fullName: string;
};

const transformUser = (data: AuthResponse): User => {
  return {
    id: String(data.id),
    email: data.email,
    fullName: `${data.firstName} ${data.lastName}`,
    role: "candidate",
  };
};

//api functions
export const authApi = {
  login: async (
    credentials: LoginCredentials,
  ): Promise<{
    user: User;
    accessToken: string;
    refreshToken: string;
  }> => {
    const response = await axiosInstance.post<AuthResponse>(
      "/auth/login",
      credentials,
    );

    return {
      user: transformUser(response.data),
      accessToken: response.data.token,
      refreshToken: response.data.refreshToken,
    };
  },

  getMe: async (): Promise<User> => {
    const response = await axiosInstance.get<AuthResponse>("/auth/me");
    return transformUser(response.data);
  },

  logout: async (): Promise<void> => {
    return Promise.resolve();
  },
};
