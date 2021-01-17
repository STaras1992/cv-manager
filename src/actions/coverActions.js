import { ADD_MY_COVER, UPDATE_MY_COVERS, DELETE_MY_COVER, UPDATE_MY_COVER } from '../consts/actionTypes.js';
import * as api from '../api/api.js';
import { setLoadingOn, setLoadingOff } from './optionsActions';

const updateCovers = (items) => ({ type: UPDATE_MY_COVERS, payload: items });
const addCover = (item) => ({ type: ADD_MY_COVER, payload: item });
const deleteCover = (id) => ({ type: DELETE_MY_COVER, payload: id });
const updateCover = (data) => ({ type: UPDATE_MY_COVER, payload: data });

export const getAllCovers = () => async (dispatch) => {
  dispatch(setLoadingOn);
  const response = await api.getAllCovers();
  if (response.status === 200) {
    await dispatch(updateCovers(response.data.items));
  }
  dispatch(setLoadingOff);
};

export const addNewCover = (data) => async (dispatch) => {
  dispatch(setLoadingOn);
  const response = await api.addCover(data);
  if (response.status === 200) {
    await dispatch(addCover(response.data.item));
  }
  dispatch(setLoadingOff);
};

export const editMyCover = (data) => async (dispatch) => {
  dispatch(setLoadingOn);
  const response = await api.updateCover(data);
  if (response.status === 200) {
    await dispatch(updateCover(response.data.item));
  }
  dispatch(setLoadingOff);
};

export const deleteMyCover = (id) => async (dispatch) => {
  dispatch(setLoadingOn);
  const response = await api.deleteCover(id);
  if (response.status === 200) {
    await dispatch(deleteCover(response.data.id));
  }
  dispatch(setLoadingOff);
};
