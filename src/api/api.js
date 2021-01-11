import * as axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000/api',
});

//cv methods:
export const getAllCv = async () => {
  return await axiosInstance.get('/cv');
};
export const addCv = async (data) => {
  return await axiosInstance.post('/cv', data, { headers: { 'Content-Type': 'multipart/form-data' } });
};
export const deleteCv = async (id) => {
  return await axiosInstance.delete(`/cv/${id}`);
};
export const getCv = async (id) => {
  return await axiosInstance.get(`/cv/${id}`);
};
export const updateCv = async (data) => {
  return await axiosInstance.patch(`/cv`, data);
};

//cover methods:
export const getAllCovers = async () => {
  return await axiosInstance.get('/cover');
};
export const addCover = async (data) => {
  return await axiosInstance.post('/cover', data);
};
export const deleteCover = async (name) => {
  return await axiosInstance.delete(`/cover/${name}`);
};
export const updateCover = async (data) => {
  return await axiosInstance.patch(`/cover`, data);
};

//template methods
export const getAllTemplates = async () => {
  return await axiosInstance.get('/template');
};
export const addTemplate = async (data) => {
  return await axiosInstance.post('/template', data);
};
export const deleteTemplate = async (name) => {
  return await axiosInstance.delete(`/template/${name}`);
};
export const updateTemplate = async (data) => {
  return await axiosInstance.patch('/template', data);
};
