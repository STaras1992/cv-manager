import { ADD_MY_COVER, UPDATE_MY_COVERS, DELETE_MY_COVER, UPDATE_MY_COVER } from '../consts/actionTypes.js';
import * as api from '../api/api.js';

const updateCovers = (items) => ({ type: UPDATE_MY_COVERS, payload: items });
const addCover = (item) => ({ type: ADD_MY_COVER, payload: item });
const deleteCover = (id) => ({ type: DELETE_MY_COVER, payload: id });
const updateCover = (data) => ({ type: UPDATE_MY_COVER, payload: data });

export const getAllCovers = () => async (dispatch) => {
  const response = await api.getAllCovers();
  if (response.status === 200) {
    await dispatch(updateCovers(response.data.items));
  }
};

export const addNewCover = (data) => async (dispatch) => {
  const response = await api.addCover(data);
  if (response.status === 200) {
    await dispatch(addCover(response.data.item));
  }
};

export const editMyCover = (data) => async (dispatch) => {
  const response = await api.updateCover(data);
  if (response.status === 200) {
    await dispatch(updateCover(response.data.item));
  }
};

export const deleteMyCover = (id) => async (dispatch) => {
  const response = await api.deleteCover(id);
  if (response.status === 200) {
    await dispatch(deleteCover(response.data.id));
  }
};
