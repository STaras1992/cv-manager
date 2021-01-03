import * as axios from 'axios';

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:4000/api',
});

export const fetchCv = () => {
  return axiosInstance.get();
};

export const fetchCovers = () => {
  return axiosInstance.get();
};

export const fetchTemplates = () => {
  return axiosInstance.get();
};
