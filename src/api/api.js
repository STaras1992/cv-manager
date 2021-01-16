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
export const getCvById = async (id) => {
  const response = await axiosInstance.get(`/cv/${id}`);
  if (response.status === 200) {
    return response.data.item;
  } else {
    throw new Error("Can't find cv");
  }
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
export const getCoverById = async (id) => {
  const response = await axiosInstance.get(`/cover/${id}`);
  if (response.status === 200) {
    return response.data.item;
  } else {
    throw new Error("Can't find cv");
  }
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

//mail
export const sendMailRequest = async (data) => {
  const response = await axiosInstance.post(`/email`, data);
  if (response.status === 200) {
    return true;
  } else {
    throw new Error('Failed to send email');
  }
};
