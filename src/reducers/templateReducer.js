import { GET_ALL_TEMPLATES } from '../consts/actionTypes.js';

const initState = {
  items: [],
  selectedItem: {},
};

const templateReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_ALL_TEMPLATES:
      return {
        ...state,
        items: [...action.items],
      };
    default:
      return state;
  }
};

export default templateReducer;
