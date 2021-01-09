import { OPEN_SIDE_PANEL, CLOSE_SIDE_PANEL } from '../consts/actionTypes.js';

const initState = {
  isSidePanelOpen: false,
};

const optionsReducer = (state = initState, action) => {
  switch (action.type) {
    case OPEN_SIDE_PANEL:
      return {
        isSidePanelOpen: true,
      };
    case CLOSE_SIDE_PANEL:
      return {
        isSidePanelOpen: false,
      };
    default:
      return state;
  }
};

export default optionsReducer;
