import { API_ENDPOINTS } from '@/config/apiConfig';
import { axiosInstance } from '../axiosInterceptor';
import type { ProjectResponse, CreateProjectData } from '@/types/project.types';

export const getAllProjects = async (): Promise<ProjectResponse[]> => {
  try {
    const res = await axiosInstance.get(API_ENDPOINTS.projects);
    if (!res || res.status !== 200) {
      throw new Error('Failed to fetch projects');
    }
    return res.data.data;
  } catch (err) {
    throw err;
  }
};

export const deleteProject = async (projectId: string) => {
  try {
    const res = await axiosInstance.delete(`${API_ENDPOINTS.projects}/${projectId}`);
    if (!res || res.status !== 204) {
      throw new Error('Failed to delete project');
    }
    return res.data;
  } catch (error) {}
};

export const createProject = async (projectData: CreateProjectData): Promise<ProjectResponse> => {
  try {
    console.log('Creating project with data: ', projectData);
    const res = await axiosInstance.postForm(API_ENDPOINTS.projects, {
      name: projectData.name,
      description: projectData.description,
      githubLink: projectData.githubLink,
      demoLink: projectData.demoLink ? projectData.demoLink : null,
      thumbnail: projectData.thumbnail,
      techStacks: projectData.techStacks,
      tagIds: projectData.tags,
    });
    if (!res) {
      throw new Error('Failed to create project');
    }
    return res.data.data;
  } catch (error) {
    throw error;
  }
};

export const getProjectById = async (projectId: string): Promise<ProjectResponse> => {
  try {
    const res = await axiosInstance.get(`${API_ENDPOINTS.projects}/${projectId}`);
    if (!res || res.status !== 200) {
      throw new Error('Failed to fetch project');
    }
    return res.data.data;
  } catch (error) {
    throw error;
  }
};

export const updateProject = async (projectId: string, projectData: Partial<CreateProjectData>) => {
  try {
    const res = await axiosInstance.patchForm(`${API_ENDPOINTS.projects}/${projectId}`, projectData);
    if (!res || res.status !== 200) {
      throw new Error('Failed to update project');
    }
    return res.data.data;
  } catch (error) {
    throw error;
  }
};
