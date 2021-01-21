import { SET_ERROR_EMAIL, SET_EMAIL_CV, SET_EMAIL_COVER, SET_SENDED } from '../consts/actionTypes.js';

const initState = {
  selectedCv: null,
  selectedCover: null,
  isLoading: false,
  error: { message: '' },
  isSended: false,
};

const emailReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_EMAIL_CV:
      //   console.log('SET_EMAIL_CV');
      return {
        ...state,
        selectedCv: action.payload,
      };
    case SET_EMAIL_COVER:
      // console.log('SET_EMAIL_COVER');
      return {
        ...state,
        selectedCover: action.payload,
      };
    case SET_ERROR_EMAIL:
      return {
        ...state,
        error: { ...state.error, message: action.payload },
      };
    case SET_SENDED:
      return {
        ...state,
        isSended: action.payload,
      };
    default:
      return state;
  }
};

export default emailReducer;
