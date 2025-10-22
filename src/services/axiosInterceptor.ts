import { API_BASE_URL } from "@/config/apiConfig";
import axios from "axios";
import { error } from "console";

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.withCredentials = true;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
