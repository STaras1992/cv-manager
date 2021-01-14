import {
  UPDATE_MY_COVERS,
  ADD_MY_COVER,
  DELETE_MY_COVER,
  UPDATE_MY_COVER,
  SET_LOADING_COVER,
} from '../consts/actionTypes.js';

const initState = {
  items: [], //{id,name,content},content:JSON(editorState)
  isLoading: false,
  selectedItem: {},
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
      //payload type=string,items.id = number. so do toString for compare
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
    default:
      return state;
  }
};

export default coverReducer;
