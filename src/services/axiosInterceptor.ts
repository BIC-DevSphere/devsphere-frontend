import { API_BASE_URL } from "@/config/apiConfig";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});
