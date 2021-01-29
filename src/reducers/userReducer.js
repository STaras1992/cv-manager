import { LOGIN, LOGOUT, SET_ERROR_SIGNUP, SET_ERROR_LOGIN } from '../consts/actionTypes.js';

const initState = {
  user: {},
  isLoggedIn: null,
  loginError: { message: null },
  signUpError: { message: null },
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        user: {
          ...action.payload,
        },
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: {},
      };
    case SET_ERROR_LOGIN: {
      return {
        ...state,
        loginError: { ...state.loginError, message: action.payload },
      };
    }
    case SET_ERROR_SIGNUP: {
      return {
        ...state,
        signUpError: { ...state.signUpError, message: action.payload },
      };
    }
    default:
      return state;
  }
};

export default userReducer;
