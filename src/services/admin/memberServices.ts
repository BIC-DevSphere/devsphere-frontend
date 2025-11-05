import { API_ENDPOINTS } from '@/config/apiConfig';
import { axiosInstance } from '../axiosInterceptor';
import { MemberRequest } from '@/types/member.types';
import { file, string } from 'better-auth/*';

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
    // console.log(res.data);
    return res.data;
  } catch (error) {
    console.error('Error fetching members:', error);
    throw error;
  }
};

// TODO: Implement multipart form data handling for avatar upload
export const createMember = async (memberData: MemberRequest): Promise<Member> => {
  try {
    console.log("Members : ",memberData)
    const res = await axiosInstance.postForm(API_ENDPOINTS.members ,{
      name : memberData.name,
      role : memberData.role,
      avatar : memberData.avatar,
      status : memberData.status,
      year : memberData.year,
    })
    console.log(res)
    return res.data.data;
  } catch (error) {
    console.error('Error creating member:', error);
    throw error;
  }
};

export const updateMember = async (formData : MemberRequest): Promise<Member> =>{
  try {
    const res = await axiosInstance.patch(`${API_ENDPOINTS.members}/:${id}`,formData)
    return res.data.data
  } catch (error) {
    
  }
}
