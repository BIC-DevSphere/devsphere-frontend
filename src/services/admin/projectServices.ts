import { API_ENDPOINTS } from "@/config/apiConfig";
import { axiosInstance } from "../axiosInterceptor";

export const getAllProjects = async () => {
  try {
    const res = await axiosInstance.get(API_ENDPOINTS.projects);
    return res.data.data.data;
  } catch (err) {
    throw err;
  }
};
