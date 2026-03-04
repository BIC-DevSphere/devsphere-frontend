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

export const createMember = async (memberData: MemberRequest): Promise<Member> => {
  try {
    const payload: Record<string, any> = {
      name: memberData.name,
      role: memberData.role,
      status: memberData.status,
      year: memberData.year,
    };

    if (memberData.avatar) payload.avatar = memberData.avatar;
    if (memberData.discordUrl) payload.discordUrl = memberData.discordUrl;
    if (memberData.instagramUrl) payload.instagramUrl = memberData.instagramUrl;
    if (memberData.linkedinUrl) payload.linkedinUrl = memberData.linkedinUrl;

    const res = await axiosInstance.postForm(API_ENDPOINTS.members, payload);
    return res.data.data;
  } catch (error) {
    console.error('Error creating member:', error);
    throw error;
  }
};

export const updateMember = async (memberId: string, memberData: Partial<MemberRequest>): Promise<Member> => {
  try {
    let res;
    

    if (memberData.avatar instanceof File) {
      res = await axiosInstance.patchForm(`${API_ENDPOINTS.members}/${memberId}`, memberData);
    } else {
      res = await axiosInstance.patch(`${API_ENDPOINTS.members}/${memberId}`, memberData);
    }

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