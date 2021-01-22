import { LOGIN, LOGOUT, SET_ERROR_USER } from '../consts/actionTypes.js';

const initState = {
  user: {},
  isLoggedIn: false,
  error: { message: '' },
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
    case SET_ERROR_USER: {
      return {
        ...state,
        error: { ...state.error, message: action.payload },
      };
    }
    default:
      return state;
  }
};

export default userReducer;
