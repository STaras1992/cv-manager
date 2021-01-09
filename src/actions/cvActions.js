import { ADD_MY_CV, UPDATE_MY_CV, DELETE_MY_CV, UPDATE_SELECTED_CV } from '../consts/actionTypes.js';
import * as api from '../api/api.js';

const updateCv = (items) => ({ type: UPDATE_MY_CV, payload: items });
const updateSelectedCv = (item) => ({ type: UPDATE_SELECTED_CV, payload: item });
const addCv = (item) => ({ type: ADD_MY_CV, payload: item });
const deleteCv = (id) => ({ type: DELETE_MY_CV, payload: id });

export const updateMyCv = () => async (dispatch) => {
  const response = await api.getAllCv();
  if (response.status === 200) {
    await dispatch(updateCv(response.data.items));
  }
};

export const addNewCv = (data) => async (dispatch) => {
  let formData = new FormData();
  formData.append('file', data.file);
  formData.append('name', data.name);
  formData.append('description', data.description);
  const response = await api.addCv(formData);
  if (response.status === 200) {
    await dispatch(
      addCv({
        id: response.data.data.id,
        name: response.data.data.name,
        description: response.data.data.description,
        file: response.data.data.file,
        type: response.data.data.type,
      })
    );
  }
};

export const deleteMyCv = (id) => async (dispatch) => {
  const response = await api.deleteCv(id);
  if (response.status === 200) {
    console.log('delete response 200 ');
    await dispatch(deleteCv(response.data.id));
  }
};

export const getSelectedCv = (id) => async (dispatch) => {
  const response = await api.getCv(id);
  if (response.status === 200) {
    await dispatch(updateSelectedCv(response.data.item));
  }
};
