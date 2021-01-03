import { GET_ALL_TEMPLATES } from '../consts/actionTypes.js';
import api from '../api/api.js';

const getAllTemplates = (items) => ({ type: GET_ALL_TEMPLATES, payload: items });

export const requestMyCv = () => async (dispatch) => {
  const result = await api.fetchTemplates();
  if (result.status === 200) {
    dispatch(getAllTemplates(result.data));
  }
};
