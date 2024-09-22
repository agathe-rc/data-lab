import axios from "axios";

const API_URL = "http://localhost:8000/v1/projects";

export const getProjects = async () => {
    const response = await axios.get(`${API_URL}/`);
    return response.data;
};

export const getProjectById = async (projectId) => {
    const response = await axios.get(`${API_URL}/${projectId}`);
    return response.data;
};

export const createProject = async () => {
    const response = await axios.post(`${API_URL}/`);
    return response.data;
};

export const deleteProject = async (projectId) => {
    const response = await axios.delete(`${API_URL}/${projectId}`);
    return response.data;
};
