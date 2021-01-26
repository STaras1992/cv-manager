import {
  ADD_MY_COVER,
  UPDATE_MY_COVERS,
  DELETE_MY_COVER,
  UPDATE_MY_COVER,
  SET_ERROR_COVER,
  COVER_RESPONSE_SUCCESS,
  COVER_RESPONSE_FAIL,
} from '../consts/actionTypes.js';
import * as api from '../api/api.js';
import { setLoadingOn, setLoadingOff, showErrorOn, showErrorOff } from './optionsActions.js';

const updateCovers = (items) => ({ type: UPDATE_MY_COVERS, payload: items });
const addCover = (item) => ({ type: ADD_MY_COVER, payload: item });
const deleteCover = (id) => ({ type: DELETE_MY_COVER, payload: id });
const updateCover = (data) => ({ type: UPDATE_MY_COVER, payload: data });
const setError = (error) => ({ type: SET_ERROR_COVER, payload: error });
const setResponseSuccess = () => ({ type: COVER_RESPONSE_SUCCESS });
const setResponseFail = () => ({ type: COVER_RESPONSE_FAIL });

export const getAllCovers = () => async (dispatch) => {
  // dispatch(showErrorOff);
  dispatch(setLoadingOn);
  try {
    const response = await api.getAllCovers();
    if (response.status === 200) {
      await dispatch(updateCovers(response.data.items));
      // await dispatch(setResponseSuccess());
    }
  } catch (err) {
    if (err.response.status === 400 || err.response.status === 404 || err.response.status === 409) {
      dispatch(setError(err.response.data.message));
    } else {
      dispatch(setError('Failed to load covers data'));
    }
    // dispatch(setResponseFail());
  }
  dispatch(setLoadingOff);
  // dispatch(showErrorOn);
};

export const addNewCover = (data) => async (dispatch) => {
  // dispatch(showErrorOff);
  dispatch(setLoadingOn);
  try {
    const response = await api.addCover(data);

    if (response.status === 201) {
      await dispatch(addCover(response.data.item));
      dispatch(setResponseSuccess());
      dispatch(showErrorOff);
    }
  } catch (err) {
    if (err.response.status === 400 || err.response.status === 404 || err.response.status === 409) {
      dispatch(setError(err.response.data.message));
    } else {
      console.log(`unexpected error (${err.response.status})`);
      dispatch(setError('Failed to create cover. Try again'));
    }
    //update list if error occured
    dispatch(getAllCovers());
    dispatch(setResponseFail());
    dispatch(showErrorOn);
  }
  dispatch(setLoadingOff);
  // dispatch(showErrorOn);
};

export const editMyCover = (data) => async (dispatch) => {
  // dispatch(showErrorOff);
  dispatch(setLoadingOn);
  try {
    const response = await api.updateCover(data);
    if (response.status === 200) {
      await dispatch(updateCover(response.data.item));
      dispatch(setResponseSuccess());
      dispatch(showErrorOff);
    }
    dispatch(setError(''));
  } catch (err) {
    if (err.response.status === 400 || err.response.status === 404 || err.response.status === 409) {
      dispatch(setError(err.response.data.message));
    } else {
      dispatch(setError('Failed to edit cover.Try again'));
    }
    //update list if error occured
    dispatch(getAllCovers());
    dispatch(setResponseFail());
    dispatch(showErrorOn);
  }
  dispatch(setLoadingOff);
  // dispatch(showErrorOn);
};

export const deleteMyCover = (id) => async (dispatch) => {
  // dispatch(showErrorOff);
  dispatch(setLoadingOn);
  try {
    const response = await api.deleteCover(id);
    if (response.status === 200) {
      await dispatch(deleteCover(response.data.id));
      dispatch(setResponseSuccess());
      dispatch(showErrorOff);
    }
  } catch (err) {
    if (err.response.status === 400 || err.response.status === 404 || err.response.status === 409) {
      dispatch(setError(err.response.data.message));
    } else {
      dispatch(setError('Failed to delete cover.Try again'));
    }
    //update list if error occured
    dispatch(getAllCovers());
    dispatch(setResponseFail());
    dispatch(showErrorOn);
  }
  dispatch(setLoadingOff);
  // dispatch(showErrorOn);
};
