import {
  OPEN_SIDE_PANEL,
  CLOSE_SIDE_PANEL,
  START_LOADING,
  STOP_LOADING,
  ENABLE_SHOW_ERROR,
  DISABLE_SHOW_ERROR,
} from '../consts/actionTypes.js';

const initState = {
  isSidePanelOpen: false,
  isLoading: false,
};

const optionsReducer = (state = initState, action) => {
  switch (action.type) {
    case OPEN_SIDE_PANEL:
      return {
        ...state,
        isSidePanelOpen: true,
      };
    case CLOSE_SIDE_PANEL:
      return {
        ...state,
        isSidePanelOpen: false,
      };
    case START_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case STOP_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    case ENABLE_SHOW_ERROR:
      return {
        ...state,
        showError: true,
      };
    case DISABLE_SHOW_ERROR:
      return {
        ...state,
        showError: false,
      };
    default:
      return state;
  }
};

export default optionsReducer;
