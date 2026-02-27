import axios from "axios";
import { getToken } from "../storage/localStorage";

export const axiosInstance = axios.create({
  baseURL: "http://mock-api",
  timeout: 1000,
});

axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
