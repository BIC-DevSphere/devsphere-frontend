import axios from "axios";

const BASE_URL = "http://localhost:3000/api";

const BASE_ENDPOINTS = {
  createMember: `${BASE_URL}/members`,
  addProject: `${BASE_URL}/projects/add`,
  getAllProjects: `${BASE_URL}/projects`,
};

export const getAllProjects = async () => {
  try {
    const res = await axios.get(BASE_ENDPOINTS.getAllProjects);
    return res.data.data.data;
  } catch (err) {
    throw err;
  }
};
