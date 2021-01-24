import {
  UPDATE_MY_TEMPLATES,
  ADD_MY_TEMPLATE,
  DELETE_MY_TEMPLATE,
  UPDATE_MY_TEMPLATE,
  SET_ERROR_TEMPLATE,
  TEMPLATE_RESPONSE_SUCCESS,
  TEMPLATE_RESPONSE_FAIL,
} from '../consts/actionTypes.js';
import * as api from '../api/api.js';
import { setLoadingOn, setLoadingOff, showErrorOn, showErrorOff } from './optionsActions';

const getAllTemplates = (items) => ({ type: UPDATE_MY_TEMPLATES, payload: items });
const updateTemplate = (item) => ({ type: UPDATE_MY_TEMPLATE, payload: item });
const addTemplate = (item) => ({ type: ADD_MY_TEMPLATE, payload: item });
const deleteTemplate = (id) => ({ type: DELETE_MY_TEMPLATE, payload: id });
const setError = (error) => ({ type: SET_ERROR_TEMPLATE, payload: error });
const setResponseSuccess = () => ({ type: TEMPLATE_RESPONSE_SUCCESS });
const setResponseFail = () => ({ type: TEMPLATE_RESPONSE_FAIL });

export const getAllMyTemplates = () => async (dispatch) => {
  dispatch(showErrorOff);
  dispatch(setLoadingOn);
  try {
    const response = await api.getAllTemplates();
    if (response.status === 200) {
      await dispatch(getAllTemplates(response.data.items));
      await dispatch(setResponseSuccess());
    }
  } catch (err) {
    if (err.response.status === 400 || err.response.status === 404 || err.response.status === 409) {
      dispatch(setError(err.response.data.message));
    } else {
      dispatch(setError('Failed to load templates data'));
    }
    dispatch(setResponseFail());
  }
  dispatch(setLoadingOff);
  dispatch(showErrorOn);
};

export const editMyTemplate = (data) => async (dispatch) => {
  dispatch(showErrorOff);
  dispatch(setLoadingOn);
  try {
    const response = await api.updateTemplate(data);
    if (response.status === 200) {
      await dispatch(updateTemplate(response.data.item));
      await dispatch(setResponseSuccess());
    }
    dispatch(setError(''));
  } catch (err) {
    if (err.response.status === 400 || err.response.status === 404 || err.response.status === 409) {
      dispatch(setError(err.response.data.message));
    } else {
      dispatch(setError('Failed to edit template.Try again'));
    }
    dispatch(setResponseFail());
  }
  dispatch(setLoadingOff);
  dispatch(showErrorOn);
};

export const addNewTemplate = (data) => async (dispatch) => {
  dispatch(showErrorOff);
  dispatch(setLoadingOn);
  try {
    const response = await api.addTemplate(data);
    if (response.status === 201) {
      await dispatch(addTemplate(response.data.item));
      await dispatch(setResponseSuccess());
    }
  } catch (err) {
    if (err.response.status === 400 || err.response.status === 404 || err.response.status === 409) {
      dispatch(setError(err.response.data.message));
    } else {
      dispatch(setError('Failed to create template.Try again'));
    }
    dispatch(setResponseFail());
  }
  dispatch(setLoadingOff);
  dispatch(showErrorOn);
};

export const deleteMyTemplate = (id) => async (dispatch) => {
  dispatch(showErrorOff);
  dispatch(setLoadingOn);
  try {
    const response = await api.deleteTemplate(id);
    if (response.status === 200) {
      await dispatch(deleteTemplate(response.data.id));
      await dispatch(setResponseSuccess());
    }
  } catch (err) {
    if (err.response.status === 400 || err.response.status === 404 || err.response.status === 409) {
      dispatch(setError(err.response.data.message));
    } else {
      dispatch(setError('Failed to delete template.Try again'));
    }
    dispatch(setResponseFail());
  }
  dispatch(setLoadingOff);
  dispatch(showErrorOn);
};
