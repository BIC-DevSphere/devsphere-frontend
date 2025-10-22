import { API_ENDPOINTS } from "@/config/apiConfig";
import { axiosInstance } from "./axiosInterceptor";

export const getAllTags = async () => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.tags);
    // console.log("Tags response:", response);
    if (!response.data) {
      throw new Error("No data found");
    }
    return response.data.data;
  } catch (error) {
    console.error("Error fetching tags:", error);
    throw error;
  }
};
