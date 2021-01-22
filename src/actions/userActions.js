import { LOGIN, LOGOUT, SET_ERROR_USER } from '../consts/actionTypes.js';
import { deleteCookie } from '../utills/cookies.js';
import * as api from '../api/api.js';

const userLoggedIn = (user) => ({ type: LOGIN, payload: user });
const userLoggedOut = () => ({ type: LOGOUT });
const setError = (error) => ({ type: SET_ERROR_USER, payload: error });

export const signup = (data) => async (dispatch) => {
  try {
    const response = await api.signup(data);
    if (response.status === 201) {
      dispatch(userLoggedIn(response.data.user));
    }
  } catch (err) {
    //   if(err.response.status === 409){
    //       //TODO
    //   }
    console.log(err);
  }
};

export const login = (data) => async (dispatch) => {
  try {
    const response = await api.login(data);
    if (response.status === 200) {
      dispatch(userLoggedIn(response.data.user));
    }
  } catch (err) {
    // if(err.response.status === 401){
    //     //TODO
    // }
    console.log(err.message);
  }
};

export const logout = () => async (dispatch) => {
  deleteCookie('jwt');
  //const response = await api.logout();
  dispatch(userLoggedOut());
};

export const checkAuth = () => async (dispatch) => {
  try {
    const response = await api.auth();
    if (response.status === 200) {
      dispatch(userLoggedIn(response.data.user));
    }
  } catch (err) {
    // if(err.response.status === 401){
    //     //TODO
    // }
    console.log(err.message);
  }
};
