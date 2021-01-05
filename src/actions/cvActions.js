import { ADD_MY_CV, UPDATE_MY_CV, DELETE_MY_CV } from '../consts/actionTypes.js';
import * as api from '../api/api.js';

const updateCv = (items) => ({ type: UPDATE_MY_CV, payload: items });
const addCv = (item) => ({ type: ADD_MY_CV, payload: item });
const deleteCv = (item) => ({ type: DELETE_MY_CV, payload: item });

export const updateMyCv = () => async (dispatch) => {
  const response = await api.getAllCv();
  if (response.status === 200) {
    await dispatch(updateCv(response.data.items));
  }
};

export const addNewCv = (data) => async (dispatch) => {
  const response = await api.addCv(data);
  if (response.status === 200) {
    //updateMyCv(dispatch);
    await dispatch(addCv(response.data.item));
  }
};

export const deleteMyCv = (data) => async (dispatch) => {
  const response = await api.deleteCv(data);
  //console.log(JSON.stringify(response));
  if (response.status === 200) {
    //updateMyCv(dispatch);
    await dispatch(deleteCv(response.data.name));
  }
};
