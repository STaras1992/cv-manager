import { GET_ALL_CV } from '../consts/actionTypes.js';
import api from '../api/api.js';

const getAllCv = (items) => ({ type: GET_ALL_CV, payload: items });

export const requestMyCv = () => async (dispatch) => {
  const result = await api.fetchCv();
  if (result.status === 200) {
    dispatch(getAllCv(result.data));
  }
};
