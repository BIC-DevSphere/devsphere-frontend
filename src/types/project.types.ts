export interface Contributor {
  id: string;
  name: string;
  githubUsername: string;
  avatarUrl: string;
}

export interface ProjectResponse {
  id: string;
  name: string;
  description: string;
  githubLink: string;
  demoLink: string | null;
  thumbnailUrl: string;
  techStacks: string[];
  tags: Tag[] | string[];
  contributors: Contributor[];
  createdAt: string;
  updatedAt: string;
}

export interface Tag {
  id: string;
  name: string;
}

export interface CreateProjectData {
  name: string;
  description: string;
  githubLink: string;
  demoLink?: string;
  thumbnail: File | null;
  techStacks: string[];
  tags: string[];
}
