import { UPDATE_MY_TEMPLATES } from '../consts/actionTypes.js';
import api from '../api/api.js';

const getAllTemplates = (items) => ({ type: UPDATE_MY_TEMPLATES, payload: items });

export const updateMyCv = () => async (dispatch) => {
  const result = await api.addTemplate();
  if (result.status === 200) {
    dispatch(getAllTemplates(result.data));
  }
};
