import { UPDATE_MY_CV, ADD_MY_CV, DELETE_MY_CV, UPDATE_SELECTED_CV, SET_LOADING_CV } from '../consts/actionTypes.js';

const initState = {
  items: [],
  selectedItem: {},
  isLoading: false,
  errors: { name: false, description: false, file: false },
};

const cvReducer = (state = initState, action) => {
  switch (action.type) {
    case UPDATE_MY_CV:
      // console.log('UPDATE_MY_CV:\n' + JSON.stringify(action.payload));
      return {
        ...state,
        items: [...action.payload],
      };
    case UPDATE_SELECTED_CV: {
      return {
        ...state,
        selectedItem: action.payload,
      };
    }
    case ADD_MY_CV:
      // console.log('ADD_MY_CV:\n' + JSON.stringify(action.payload));
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case DELETE_MY_CV:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case SET_LOADING_CV: {
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    }
    default:
      return state;
  }
};

export default cvReducer;
