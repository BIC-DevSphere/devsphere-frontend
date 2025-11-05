export interface MemberRequest {
  name: string;
  role: string;
  status: "ACTIVE" | "INACTIVE";
  year: string;
  avatar?: File;
}

export interface memberResponse {
    name : string;
    role : string;
    status : "ACTIVE" | "INACTIVE"
    year : string;
    avatarUrl : string;
}