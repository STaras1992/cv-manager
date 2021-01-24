import {
  ADD_MY_CV,
  UPDATE_MY_CVS,
  DELETE_MY_CV,
  UPDATE_MY_CV,
  SET_ERROR_CV,
  ENABLE_SHOW_ERROR_CV,
  DISABLE_SHOW_ERROR_CV,
  CV_RESPONSE_SUCCESS,
  CV_RESPONSE_FAIL,
} from '../consts/actionTypes.js';
import * as api from '../api/api.js';
import { setLoadingOn, setLoadingOff, showErrorOn, showErrorOff } from './optionsActions';

const updateCvs = (items) => ({ type: UPDATE_MY_CVS, payload: items });
const updateEditedCv = (item) => ({ type: UPDATE_MY_CV, payload: item });
const addCv = (item) => ({ type: ADD_MY_CV, payload: item });
const deleteCv = (id) => ({ type: DELETE_MY_CV, payload: id });
const setError = (error) => ({ type: SET_ERROR_CV, payload: error });
// const showErrorOn = () => ({ type: ENABLE_SHOW_ERROR_CV });
// export const showErrorOff = () => ({ type: DISABLE_SHOW_ERROR_CV });
const setResponseSuccess = () => ({ type: CV_RESPONSE_SUCCESS });
const setResponseFail = () => ({ type: CV_RESPONSE_FAIL });

export const getAllCvs = () => async (dispatch) => {
  dispatch(showErrorOff);
  dispatch(setLoadingOn);
  try {
    const response = await api.getAllCv();
    if (response.status === 200) {
      await dispatch(updateCvs(response.data.items));
      // dispatch(setResponseSuccess());
    }
  } catch (err) {
    if (err.response.status === 400 || err.response.status === 409) {
      dispatch(setError(err.response.message));
    } else {
      dispatch(setError('Failed to load cv data'));
    }
    // dispatch(setResponseFail());
  }
  dispatch(setLoadingOff);
  dispatch(showErrorOn);
};

export const addNewCv = (data) => async (dispatch) => {
  dispatch(showErrorOff);
  dispatch(setLoadingOn);
  let formData = new FormData();
  formData.append('file', data.file);
  formData.append('name', data.name);
  formData.append('description', data.description);
  try {
    const response = await api.addCv(formData);
    if (response.status === 201) {
      await dispatch(
        addCv({
          id: response.data.data.id,
          name: response.data.data.name,
          description: response.data.data.description,
          file: response.data.data.file,
          type: response.data.data.type,
        })
      );
      dispatch(setResponseSuccess());
    }
  } catch (err) {
    //switch for different handling in future
    switch (err.response.status) {
      case 400:
        dispatch(setError(err.response.data.message));
        break;
      case 404:
        dispatch(setError(err.response.data.message));
        break;
      case 409:
        dispatch(setError(err.response.data.message));
        break;
      default:
        console.log(`unexpected error (${err.response.status})`);
        dispatch(setError('Failed to save cv. Try again'));
        break;
    }
    //update list if error occured
    dispatch(getAllCvs());
    dispatch(setResponseFail());
  }
  dispatch(setLoadingOff);
  dispatch(showErrorOn);
};

export const deleteMyCv = (id) => async (dispatch) => {
  dispatch(showErrorOff);
  dispatch(setLoadingOn);
  try {
    const response = await api.deleteCv(id);
    if (response.status === 200) {
      await dispatch(deleteCv(response.data.id));
      dispatch(setResponseSuccess());
    }
  } catch (err) {
    if (err.response.status === 404 || err.response.status === 400) {
      dispatch(setError(err.response.data.message));
    } else {
      dispatch(setError('Failed to delete cv.Try again'));
    }
    //update list if error occured
    dispatch(getAllCvs());
    dispatch(setResponseFail());
  }
  dispatch(setLoadingOff);
  dispatch(showErrorOn);
};

export const editMyCv = (data) => async (dispatch) => {
  dispatch(showErrorOff);
  dispatch(setLoadingOn);
  try {
    let dataToSend = {};
    //file was not changed.File already in db and data.file is link to file.
    if (typeof data.file === 'string') {
      dataToSend = data;
    }
    //new file selected.data.file is File object.
    else if (typeof data.file === 'object') {
      dataToSend = new FormData();
      dataToSend.append('file', data.file);
      dataToSend.append('id', data.id);
      dataToSend.append('name', data.name);
      dataToSend.append('description', data.description);
    }
    //Ther was some error in process.
    else {
      console.log('Bad selected file!'); //DEV
    }

    const response = await api.updateCv(dataToSend);

    if (response.status === 200) {
      await dispatch(updateEditedCv(response.data.item));
      dispatch(setResponseSuccess());
    }
    dispatch(setError(''));
  } catch (err) {
    if (err.response.status === 404 || err.response.status === 400 || err.response.status === 409) {
      dispatch(setError(err.response.data.message));
    } else {
      dispatch(setError('Failed to edit cv.Try again'));
    }
    //update list if error occured
    dispatch(getAllCvs());
    dispatch(setResponseFail());
  }
  dispatch(setLoadingOff);
  dispatch(showErrorOn);
};
