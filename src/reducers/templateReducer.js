import {
  UPDATE_MY_TEMPLATES,
  ADD_MY_TEMPLATE,
  DELETE_MY_TEMPLATE,
  UPDATE_MY_TEMPLATE,
  SET_LOADING_TEMPLATE,
  SET_ERROR_TEMPLATE,
} from '../consts/actionTypes.js';

const initState = {
  items: [],
  isLoading: false,
  error: { message: null },
  selectedItem: {},
};

const templateReducer = (state = initState, action) => {
  switch (action.type) {
    case UPDATE_MY_TEMPLATES:
      return {
        ...state,
        items: [...action.payload],
      };
    case ADD_MY_TEMPLATE:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case DELETE_MY_TEMPLATE:
      //payload type=string,items.id = number. so do toString for compare
      return {
        ...state,
        items: state.items.filter((item) => item.id.toString() !== action.payload.toString()),
      };
    case UPDATE_MY_TEMPLATE:
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id.toString() !== action.payload.id.toString()) return item;
          else return action.payload;
        }),
      };
    case SET_LOADING_TEMPLATE:
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    case SET_ERROR_TEMPLATE:
      return {
        ...state,
        error: { ...state.error, message: action.payload },
      };
    default:
      return state;
  }
};

export default templateReducer;
