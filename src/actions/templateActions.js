import { UPDATE_MY_TEMPLATES, ADD_MY_TEMPLATE, DELETE_MY_TEMPLATE, UPDATE_MY_TEMPLATE } from '../consts/actionTypes.js';
import * as api from '../api/api.js';
import { setLoadingOn, setLoadingOff } from './optionsActions';

const getAllTemplates = (items) => ({ type: UPDATE_MY_TEMPLATES, payload: items });
const updateTemplate = (item) => ({ type: UPDATE_MY_TEMPLATE, payload: item });
const addTemplate = (item) => ({ type: ADD_MY_TEMPLATE, payload: item });
const deleteTemplate = (id) => ({ type: DELETE_MY_TEMPLATE, payload: id });

export const getAllMyTemplates = () => async (dispatch) => {
  dispatch(setLoadingOn);
  const response = await api.getAllTemplates();
  if (response.status === 200) {
    await dispatch(getAllTemplates(response.data.items));
  }
  dispatch(setLoadingOff);
};

export const editMyTemplate = (data) => async (dispatch) => {
  dispatch(setLoadingOn);
  const response = await api.updateTemplate(data);
  if (response.status === 200) {
    await dispatch(updateTemplate(response.data.item));
  }
  dispatch(setLoadingOff);
};

export const addNewTemplate = (data) => async (dispatch) => {
  dispatch(setLoadingOn);
  const response = await api.addTemplate(data);
  if (response.status === 200) {
    await dispatch(addTemplate(response.data.item));
  }
  dispatch(setLoadingOff);
};

export const deleteMyTemplate = (id) => async (dispatch) => {
  dispatch(setLoadingOn);
  const response = await api.deleteTemplate(id);
  if (response.status === 200) {
    await dispatch(deleteTemplate(response.data.id));
  }
  dispatch(setLoadingOff);
};
