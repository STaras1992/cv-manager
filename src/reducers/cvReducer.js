import {
  UPDATE_MY_CVS,
  ADD_MY_CV,
  DELETE_MY_CV,
  UPDATE_MY_CV,
  SET_LOADING_CV,
  SET_ERROR_CV,
  ENABLE_SHOW_ERROR_CV,
  DISABLE_SHOW_ERROR_CV,
  CV_RESPONSE_SUCCESS,
  CV_RESPONSE_FAIL,
} from '../consts/actionTypes.js';

const initState = {
  items: [],
  isLoading: false,
  error: { message: null },
  // showError: false,
  responseStatusSuccess: true,
};

const cvReducer = (state = initState, action) => {
  switch (action.type) {
    case UPDATE_MY_CVS:
      // console.log('UPDATE_MY_CVS:\n' + JSON.stringify(action.payload));
      return {
        ...state,
        items: [...action.payload],
      };
    case UPDATE_MY_CV: {
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id.toString() !== action.payload.id.toString()) return item;
          else return action.payload;
        }),
      };
    }
    case ADD_MY_CV:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case DELETE_MY_CV:
      return {
        ...state,
        items: state.items.filter((item) => item.id.toString() !== action.payload.toString()),
      };
    case SET_LOADING_CV: {
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    }
    case SET_ERROR_CV:
      return {
        ...state,
        error: { ...state.error, message: action.payload },
      };
    // case ENABLE_SHOW_ERROR_CV:
    //   return {
    //     ...state,
    //     showError: true,
    //   };

    // case DISABLE_SHOW_ERROR_CV:
    //   return {
    //     ...state,
    //     showError: false,
    //   };
    case CV_RESPONSE_SUCCESS:
      return {
        ...state,
        responseStatusSuccess: true,
      };
    case CV_RESPONSE_FAIL:
      return {
        ...state,
        responseStatusSuccess: false,
      };

    default:
      return state;
  }
};

export default cvReducer;
