import { API_ENDPOINTS } from '@/config/apiConfig';
import { axiosInstance } from '../axiosInterceptor';

export interface Member {
  id: string;
  name: string;
  avatarUrl: string | null;
  role: string;
  year: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface Pagination {
  total: number;
  page: number;
  totalPages: number;
  hasNext: boolean;
}

export interface MembersResponse {
  success: boolean;
  message: string;
  code: number;
  data: Member[];
  pagination: Pagination;
}

export const getAllMembers = async (): Promise<MembersResponse> => {
  try {
    const res = await axiosInstance.get(API_ENDPOINTS.members);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error('Error fetching members:', error);
    throw error;
  }
};

// TODO: Implement multipart form data handling for avatar upload
export const createMember = async (memberData: Omit<Member, 'id'>): Promise<Member> => {
  try {
    const res = await axiosInstance.post(API_ENDPOINTS.members, memberData);
    return res.data;
  } catch (error) {
    console.error('Error creating member:', error);
    throw error;
  }
};
