import { LOGIN, LOGOUT, SET_ERROR_SIGNUP, SET_ERROR_LOGIN } from '../consts/actionTypes.js';
import { deleteCookie } from '../utills/cookies.js';
import * as api from '../api/api.js';
import { setLoadingOn, setLoadingOff } from './optionsActions';
import { catchError } from '../utills/actionsUtils.js';

const userLoggedIn = (user) => ({ type: LOGIN, payload: user });
const userLoggedOut = () => ({ type: LOGOUT });
const setLoginError = (error) => ({ type: SET_ERROR_LOGIN, payload: error });
const setSignUpError = (error) => ({ type: SET_ERROR_SIGNUP, payload: error });

export const signup = (data) => async (dispatch) => {
  try {
    dispatch(setLoadingOn);
    dispatch(setLoginError(''));
    const response = await api.signup(data);
    if (response.status === 201) {
      dispatch(userLoggedIn(response.data.user));
    }
    dispatch(setSignUpError(''));
  } catch (err) {
    catchError(err, dispatch, setSignUpError);
    // if (err.response && (err.response.status === 409 || err.response.status === 400))
    //   dispatch(setSignUpError(err.response.data.message));
    // else dispatch(setSignUpError('Failed to sign up. Try again'));
  }
  dispatch(setLoadingOff);
};

export const login = (data) => async (dispatch) => {
  try {
    dispatch(setLoadingOn);
    dispatch(setSignUpError(''));
    const response = await api.login(data);
    if (response.status === 200) {
      dispatch(userLoggedIn(response.data.user));
    }
    dispatch(setLoginError(''));
  } catch (err) {
    catchError(err, dispatch, setLoginError);
    // if (err.response && (err.response.status === 409 || err.response.status === 400 || err.response.status === 401))
    //   dispatch(setLoginError(err.response.data.message));
    // else dispatch(setLoginError('Failed to login. Try again'));
  }
  dispatch(setLoadingOff);
};

export const logout = () => async (dispatch) => {
  try {
    deleteCookie('jwt');
    const response = await api.logout();
    if (response.status === 200) dispatch(userLoggedOut());
  } catch (err) {}
};

export const checkAuth = () => async (dispatch) => {
  try {
    const response = await api.auth();
    if (response.status === 200) {
      dispatch(userLoggedIn(response.data.user));
    }
  } catch (err) {
    dispatch(userLoggedOut());
  }
};
