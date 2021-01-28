import {
  UPDATE_MY_COVERS,
  ADD_MY_COVER,
  DELETE_MY_COVER,
  UPDATE_MY_COVER,
  SET_LOADING_COVER,
  SET_ERROR_COVER,
  COVER_RESPONSE_SUCCESS,
  COVER_RESPONSE_FAIL,
} from '../consts/actionTypes.js';

const initState = {
  items: [],
  isLoading: false,
  error: { message: null },
  responseStatusSuccess: true,
};

const coverReducer = (state = initState, action) => {
  switch (action.type) {
    case UPDATE_MY_COVERS:
      return {
        ...state,
        items: JSON.parse(JSON.stringify(action.payload)),
      };
    case ADD_MY_COVER:
      return {
        ...state,
        items: [...state.items, JSON.parse(JSON.stringify(action.payload))],
      };
    case DELETE_MY_COVER:
      return {
        ...state,
        items: state.items.filter((item) => item.id.toString() !== action.payload.toString()),
      };
    case UPDATE_MY_COVER:
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id.toString() !== action.payload.id.toString()) return item;
          else return action.payload;
        }),
      };
    case SET_LOADING_COVER: {
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    }
    case SET_ERROR_COVER: {
      return {
        ...state,
        error: { ...state.error, message: action.payload },
      };
    }
    case COVER_RESPONSE_SUCCESS:
      return {
        ...state,
        responseStatusSuccess: true,
      };
    case COVER_RESPONSE_FAIL:
      return {
        ...state,
        responseStatusSuccess: false,
      };
    default:
      return state;
  }
};

export default coverReducer;
