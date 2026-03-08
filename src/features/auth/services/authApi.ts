import { axiosInstance } from "@/services/api/axiosInstance";

export type LoginCredentials = {
  username: string;
  password: string;
};

export type RegisterCredentials = {
  username: string;
  password: string;
  email: string;
};

export type AuthResponse = {
  id: number;
  username: string;
  email: string;
  accessToken: string;
};

export type User = {
  id: string;
  email: string;
  role: "candidate" | "recruiter" | "admin";
  username: string;
};

const transformUser = (data: AuthResponse): User => {
  return {
    id: String(data.id),
    email: data.email,
    username: data.username,
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
  }> => {
    const response = await axiosInstance.post<AuthResponse>(
      "/auth/login",
      credentials,
    );

    return {
      user: transformUser(response.data),
      accessToken: response.data.accessToken,
    };
  },

  register: async (
    credentials: RegisterCredentials,
  ): Promise<{ user: User }> => {
    const response = await axiosInstance.post("/auth/register", credentials);

    const data = response.data;

    return {
      user: {
        id: data.user.id,
        email: data.user.email,
        username: data.user.username,
        role: "candidate",
      },
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
