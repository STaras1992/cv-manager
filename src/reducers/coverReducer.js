import { UPDATE_MY_COVERS, ADD_MY_COVER, DELETE_MY_COVER } from '../consts/actionTypes.js';

const initState = {
  items: [],
  selectedItem: {},
};

const coverReducer = (state = initState, action) => {
  switch (action.type) {
    case UPDATE_MY_COVERS:
      return {
        ...state,
        items: [...action.payload],
      };
    case ADD_MY_COVER:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case DELETE_MY_COVER:
      return {
        ...state,
        items: state.items.filter((item) => item.name !== action.payload),
      };
    default:
      return state;
  }
};

export default coverReducer;
