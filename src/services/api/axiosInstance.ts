import axios from "axios";
import { getToken, setToken } from "../storage/localStorage";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 5000,
  withCredentials: true,
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
    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true;
      const refresh = await axiosInstance.post("/refresh");

      setToken(refresh.data.accessToken);

      error.config.headers.Authorization = `Bearer ${refresh.data.accessToken}`;

      return axiosInstance(error.config);
    }
    return Promise.reject(error);
  },
);
