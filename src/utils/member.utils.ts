import { MemberRequest, memberResponse } from '../types/member.types';

interface MemberValidationErrors {
  name: string;
  role: string;
  status: string;
  year: string;
  avatar: string;
}

interface MemberFieldChanges {
  isNew: boolean;
  changes: string[];
  hasChanges?: boolean;
}

export const normalizeMemberData = (data: any): MemberRequest | null => {
  try {
    const normalizedData = {
      name: data.name,
      role: data.role,
      status: data.status || 'ACTIVE',
      year: data.year,
      avatar: null,
    };
    return normalizedData;
  } catch (error) {
    console.error('Error normalizing member data:', error);
    return null;
  }
};

export const validateMemberData = (data: Partial<MemberRequest>): MemberValidationErrors => {
  const errors = {
    name: '',
    role: '',
    status: '',
    year: '',
    avatar: '',
  };

  if (!data.name?.trim()) {
    errors.name = 'Member name is required';
  }
  if (!data.role?.trim()) {
    errors.role = 'Member role is required';
  }
  if (!data.status || !['ACTIVE', 'INACTIVE'].includes(data.status)) {
    errors.status = 'Valid status (ACTIVE/INACTIVE) is required';
  }
  if (!data.year?.trim()) {
    errors.year = 'Member year is required';
  }
  
  return errors;
};

export const extractUpdatedMemberFields = (
  memberDataSnapshot: memberResponse | null, 
  memberUploadData: Partial<MemberRequest>
): Partial<MemberRequest> | null => {
  console.log('Member data snapshot:', memberDataSnapshot);
  
  if (!memberDataSnapshot) return null;
  
  try {
    const data = Object.entries(memberUploadData)
      .map(([key, val]) => {
        const dataFromSnapshot = memberDataSnapshot[key];
        
        if (val instanceof File) {
          return [key, val];
        } else {
          if (dataFromSnapshot !== val) {
            return [key, val];
          }
          return null;
        }
      })
      .filter((entry) => entry !== null);

    console.log('Updated member fields:', data);
    return Object.fromEntries(data);
  } catch (error) {
    console.error('Error in extractUpdatedMemberFields:', error);
    return {};
  }
};

