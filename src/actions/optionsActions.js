import {
  OPEN_SIDE_PANEL,
  CLOSE_SIDE_PANEL,
  START_LOADING,
  STOP_LOADING,
  ENABLE_SHOW_ERROR,
  DISABLE_SHOW_ERROR,
} from '../consts/actionTypes.js';

export const openSidePanel = { type: OPEN_SIDE_PANEL };
export const closeSidePanel = { type: CLOSE_SIDE_PANEL };
export const setLoadingOn = { type: START_LOADING };
export const setLoadingOff = { type: STOP_LOADING };
export const showErrorOn = { type: ENABLE_SHOW_ERROR };
export const showErrorOff = { type: DISABLE_SHOW_ERROR };
