import { OPEN_SIDE_PANEL, CLOSE_SIDE_PANEL, START_LOADING, STOP_LOADING } from '../consts/actionTypes.js';

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
      console.log('Start Loading');
      return {
        ...state,
        isLoading: true,
      };
    case STOP_LOADING:
      console.log('Stop Loading');
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default optionsReducer;
