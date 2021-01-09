import * as axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000/api',
});

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

export const getAllCovers = async () => {
  return await axiosInstance.get('/cover');
};

export const addCover = async (data) => {
  return await axiosInstance.post('/cover', data);
};

export const deleteCover = async (name) => {
  return await axiosInstance.delete(`/cover/${name}`);
};
