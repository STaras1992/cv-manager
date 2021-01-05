import { UPDATE_MY_TEMPLATES } from '../consts/actionTypes.js';

const initState = {
  items: [],
  selectedItem: {},
};

const templateReducer = (state = initState, action) => {
  switch (action.type) {
    case UPDATE_MY_TEMPLATES:
      return {
        ...state,
        items: [action.items],
      };
    default:
      return state;
  }
};

export default templateReducer;
