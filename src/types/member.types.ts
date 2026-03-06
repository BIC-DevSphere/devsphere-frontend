export interface MemberRequest {
  name: string;
  role: string;
  status: "ACTIVE" | "INACTIVE";
  year: string;
  avatar?: File | null;
  discordUrl?: string | null;
  instagramUrl?: string | null;
  linkedinUrl?: string | null;
}

export interface  Member {
    id : string;
    name : string;
    role : string;
    status : "ACTIVE" | "INACTIVE"
    year : string;
    avatarUrl : string | null;
    discordUrl?: string | null;
    instagramUrl?: string | null;
    linkedinUrl?: string | null;
}