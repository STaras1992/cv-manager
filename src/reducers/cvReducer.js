import { GET_ALL_CV } from '../consts/actionTypes.js';

const initState = {
  items: [],
  selectedItem: {},
};

const cvReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_ALL_CV:
      return {
        ...state,
        items: [...action.items],
      };
    default:
      return state;
  }
};

const getAllCv = (items) => ({ type: GET_ALL_CV, payload: items });

export default cvReducer;
