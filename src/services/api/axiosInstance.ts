import axios from "axios";
import {
  clearAuthTokens,
  getRefreshToken,
  getToken,
  setToken,
} from "../storage/localStorage";
import { API_BASE_URL, AUTH_ENDPOINTS } from "@/config/api.config";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers["Accept-Language"] = "vi";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/login")
    ) {
      originalRequest._retry = true;
      try {
        const refreshToken = getRefreshToken();

        if (!refreshToken) {
          throw new Error("No refresh token available!");
        }

        const response = await axios.post(
          `${API_BASE_URL}${AUTH_ENDPOINTS.REFRESH_TOKEN}`,
          { refreshToken },
        );

        const newAccessToken = response.data.accessToken;

        if (!newAccessToken) {
          throw new Error("No access token in refresh response");
        }
        setToken(newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("RefreshToken failed", refreshError);
        clearAuthTokens();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
