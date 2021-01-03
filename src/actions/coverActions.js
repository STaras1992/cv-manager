import { GET_ALL_COVERS } from '../consts/actionTypes.js';
import api from '../api/api.js';

const getAllCovers = (items) => ({ type: GET_ALL_COVERS, payload: items });

export const requestMyCv = () => async (dispatch) => {
  const result = await api.fetchCovers();
  if (result.status === 200) {
    dispatch(getAllCovers(result.data));
  }
};
