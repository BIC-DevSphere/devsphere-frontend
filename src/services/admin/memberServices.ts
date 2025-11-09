import { API_ENDPOINTS } from '@/config/apiConfig';
import { axiosInstance } from '../axiosInterceptor';
import { MemberRequest, Member } from '@/types/member.types';


export interface Pagination {
  total: number;
  page: number;
  totalPages: number;
  hasNext: boolean;
}



export const getAllMembers = async (): Promise<Member[]> => {
  try {
    const res = await axiosInstance.get(API_ENDPOINTS.members);
    if (!res || res.status !== 200) {
      throw new Error('Failed to fetch members')
    }
    return res.data.data;
  } catch (error) {
    console.error('Error fetching members:', error);
    throw error;
  }
};

// TODO: Implement multipart form data handling for avatar upload
export const createMember = async (memberData: MemberRequest): Promise<Member> => {
  try {
    console.log("Members : ", memberData)
    const res = await axiosInstance.postForm(API_ENDPOINTS.members, {
      name: memberData.name,
      role: memberData.role,
      avatar: memberData.avatar,
      status: memberData.status,
      year: memberData.year,
    })
    console.log(res)
    return res.data.data;
  } catch (error) {
    console.error('Error creating member:', error);
    throw error;
  }
};

export const updateMember = async (memberId: string, memberData: Partial<MemberRequest>): Promise<Member> => {
  try {
    const res = await axiosInstance.patchForm(`${API_ENDPOINTS.members}/${memberId}`, memberData);

    if (!res || !res.status) {
      throw new Error('Failed to update Member');
    }

    return res.data.data;
  } catch (error) {
    console.error('Error updating member:', error);
    throw error;
  }
};

export const getMemberById = async (memberId: string): Promise<Member> => {
  try {
    const res = await axiosInstance.get(`${API_ENDPOINTS.members}/{memberId}`)
    if (res || res.status !== 200) {
      throw new Error('Failed to fetch member')
    }
    return res.data.data

  } catch (error) {
    throw (error)
  }

}