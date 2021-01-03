import { GET_ALL_COVERS } from '../consts/actionTypes.js';

const initState = {
  items: [],
  selectedItem: {},
};

const coverReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_ALL_COVERS:
      return {
        ...state,
        items: [...action.items],
      };
    default:
      return state;
  }
};

export default coverReducer;
