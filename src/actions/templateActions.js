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
import { catchError } from '../utills/actionsUtils.js';

const getAllTemplates = (items) => ({ type: UPDATE_MY_TEMPLATES, payload: items });
const updateTemplate = (item) => ({ type: UPDATE_MY_TEMPLATE, payload: item });
const addTemplate = (item) => ({ type: ADD_MY_TEMPLATE, payload: item });
const deleteTemplate = (id) => ({ type: DELETE_MY_TEMPLATE, payload: id });
const setError = (error) => ({ type: SET_ERROR_TEMPLATE, payload: error });
const setResponseSuccess = () => ({ type: TEMPLATE_RESPONSE_SUCCESS });
const setResponseFail = () => ({ type: TEMPLATE_RESPONSE_FAIL });

export const getAllMyTemplates = () => async (dispatch) => {
  dispatch(setLoadingOn);
  try {
    const response = await api.getAllTemplates();
    if (response.status === 200) {
      await dispatch(getAllTemplates(response.data.items));
      await dispatch(setResponseSuccess());
    }
  } catch (err) {
    catchError(err, dispatch, setError);
    dispatch(setResponseFail());
  }
  dispatch(setLoadingOff);
};

export const editMyTemplate = (data) => async (dispatch) => {
  dispatch(setLoadingOn);
  try {
    const response = await api.updateTemplate(data);
    if (response.status === 200) {
      await dispatch(updateTemplate(response.data.item));
      await dispatch(setResponseSuccess());
      dispatch(showErrorOff);
    }
    dispatch(setError(''));
  } catch (err) {
    catchError(err, dispatch, setError);
    dispatch(getAllMyTemplates());
    dispatch(setResponseFail());
    dispatch(showErrorOn);
  }
  dispatch(setLoadingOff);
};

export const addNewTemplate = (data) => async (dispatch) => {
  dispatch(setLoadingOn);
  try {
    const response = await api.addTemplate(data);
    if (response.status === 201) {
      await dispatch(addTemplate(response.data.item));
      await dispatch(setResponseSuccess());
      dispatch(showErrorOff);
    }
  } catch (err) {
    catchError(err, dispatch, setError);
    dispatch(getAllMyTemplates());
    dispatch(setResponseFail());
    dispatch(showErrorOn);
  }
  dispatch(setLoadingOff);
};

export const deleteMyTemplate = (id) => async (dispatch) => {
  dispatch(setLoadingOn);
  try {
    const response = await api.deleteTemplate(id);
    if (response.status === 200) {
      await dispatch(deleteTemplate(response.data.id));
      await dispatch(setResponseSuccess());
      dispatch(showErrorOff);
    }
  } catch (err) {
    catchError(err, dispatch, setError);
    dispatch(getAllMyTemplates());
    dispatch(setResponseFail());
    dispatch(showErrorOn);
  }
  dispatch(setLoadingOff);
};
