import { API_ENDPOINTS } from "@/config/apiConfig";
import { axiosInstance } from "../axiosInterceptor";

export const getAllEvents = async () => {
  try {
    const res = await axiosInstance.get(API_ENDPOINTS.events);
    return res.data.data;
  } catch (err) {
    throw err;
  }
};

export const getEventById = async (id) => {
  try {
    const res = await axiosInstance.get(`${API_ENDPOINTS.events}/${id}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};