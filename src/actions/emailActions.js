import { SET_ERROR_EMAIL, SET_EMAIL_CV, SET_EMAIL_COVER, SET_SENDED } from '../consts/actionTypes.js';
import * as api from '../api/api.js';
import { setLoadingOn, setLoadingOff, showErrorOn, showErrorOff } from './optionsActions';
import { catchError } from '../utills/actionsUtils.js';

const setError = (error) => ({ type: SET_ERROR_EMAIL, payload: error });
const setCv = (item) => ({ type: SET_EMAIL_CV, payload: item });
const setCover = (item) => ({ type: SET_EMAIL_COVER, payload: item });
export const setSended = (flag) => ({ type: SET_SENDED, payload: flag });

export const sendEmailRequest = (data) => async (dispatch) => {
  dispatch(setLoadingOn);
  dispatch(showErrorOff);
  try {
    const response = await api.sendEmail(data);
    if (response.status === 200) {
      console.log('Email sent successfully'); //TODO
    }
  } catch (err) {
    catchError(err, dispatch, setError); //no message response aspected only 500
    dispatch(showErrorOn);
  }
  dispatch(setSended(true));
  dispatch(setLoadingOff);
};

const getCvData = async (id, dispatch) => {
  try {
    const response = await api.getCvById(id);
    dispatch(setCv(response.data.item));
  } catch (err) {
    catchError(err, dispatch, setError);
  }
};

const getCoverData = async (id, dispatch) => {
  try {
    if (id === '') {
      dispatch(setCover({ id: 0, name: 'empty', content: '', direction: 'LTR' }));
    } else {
      const response = await api.getCoverById(id);
      dispatch(setCover(response.data.item));
    }
  } catch (err) {
    catchError(err, dispatch, setError);
  }
};

export const getData = (cvId, coverId) => async (dispatch) => {
  dispatch(setLoadingOn);
  getCvData(cvId, dispatch);
  getCoverData(coverId, dispatch);
  dispatch(setLoadingOff);
};
