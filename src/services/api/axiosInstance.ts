import axios from "axios";
import { getToken, setToken, removeToken } from "../storage/localStorage";

export const axiosInstance = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 5000,
  withCredentials: false,
});

axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshRes = await axios.post(
          "https://dummyjson.com/auth/refresh",
          {
            refreshToken: localStorage.getItem("refresh_token"),
          },
        );
        const newAccessToken = refreshRes.data.accessToken;
        setToken(newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        removeToken();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
