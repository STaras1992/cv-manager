import {
  UPDATE_MY_CVS,
  ADD_MY_CV,
  DELETE_MY_CV,
  UPDATE_MY_CV,
  SET_LOADING_CV,
  SET_ERROR_CV,
} from '../consts/actionTypes.js';

const initState = {
  items: [],
  isLoading: false,
  error: { message: null },
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
    case SET_ERROR_CV: {
      return {
        ...state,
        error: { ...state.error, message: action.payload },
      };
    }
    default:
      return state;
  }
};

export default cvReducer;
