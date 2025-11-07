export interface MemberRequest {
  name: string;
  role: string;
  status: "ACTIVE" | "INACTIVE";
  year: string;
  avatar?: File;
}

export interface  Member {
    id : string;
    name : string;
    role : string;
    status : "ACTIVE" | "INACTIVE"
    year : string;
    avatarUrl : string | null;
}