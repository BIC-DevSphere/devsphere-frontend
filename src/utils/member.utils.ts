import { MemberRequest, Member } from '../types/member.types';


export const normalizeMemberData = (data: any): MemberRequest | null => {
  try {
    const normalizedData = {
      name: data.name,
      role: data.role,
      status: data.status || 'ACTIVE',
      year: new Date(data.year).toISOString(),
      avatar: data.avatar ?? null,
    };
    return normalizedData;
  } catch (error) {
    console.error('Error normalizing member data:', error);
    return null;
  }
};

export const extractUpdatedMemberFields = (
  memberDataSnapshot: Member | null,
  memberUploadData: Partial<MemberRequest>
): Partial<MemberRequest> | null => {

  if (!memberDataSnapshot) return null;

  try {
    const data = Object.entries(memberUploadData)
      .map(([key, val]) => {
        const dataFromSnapshot = memberDataSnapshot[key];

        if (key === 'avatar' && val === null ){
          console.log("Key", key + "Value", val)
          return null
        
        }


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

