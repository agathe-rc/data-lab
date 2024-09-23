import axios from "axios";

// TODO: This should be in a .env file
const API_URL = "http://localhost:8000/v1/projects";

// TODO: Add error handling
export const getProjects = async () => {
    const response = await axios.get(`${API_URL}/`);
    return response.data;
};

export const getProjectById = async (projectId) => {
    const response = await axios.get(`${API_URL}/${projectId}`);
    return response.data;
};

export const createProject = async (project) => {
    const response = await axios.post(`${API_URL}/`, project);
    return response.data;
};

export const deleteProject = async (projectId) => {
    const response = await axios.delete(`${API_URL}/${projectId}`);
    return response.data;
};
