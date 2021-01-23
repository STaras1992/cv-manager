import {
  ADD_MY_COVER,
  UPDATE_MY_COVERS,
  DELETE_MY_COVER,
  UPDATE_MY_COVER,
  SET_ERROR_COVER,
} from '../consts/actionTypes.js';
import * as api from '../api/api.js';
import { setLoadingOn, setLoadingOff } from './optionsActions';

const updateCovers = (items) => ({ type: UPDATE_MY_COVERS, payload: items });
const addCover = (item) => ({ type: ADD_MY_COVER, payload: item });
const deleteCover = (id) => ({ type: DELETE_MY_COVER, payload: id });
const updateCover = (data) => ({ type: UPDATE_MY_COVER, payload: data });
const setError = (error) => ({ type: SET_ERROR_COVER, payload: error });

export const getAllCovers = () => async (dispatch) => {
  dispatch(setLoadingOn);
  const response = await api.getAllCovers();
  if (response.status === 200) {
    await dispatch(updateCovers(response.data.items));
  }
  dispatch(setLoadingOff);
};

export const addNewCover = (data) => async (dispatch) => {
  try {
    dispatch(setLoadingOn);
    const response = await api.addCover(data);

    if (response.status === 201) {
      await dispatch(addCover(response.data.item));
    }
    dispatch(setError(''));
  } catch (err) {
    if (err.response.status === 409) {
      dispatch(setError(err.response.data.message));
    } else {
      console.log(`unexpected error (${err.response.status})`);
      dispatch(setError('Failed to create cover. Try again'));
    }
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
