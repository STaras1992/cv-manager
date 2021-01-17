import { OPEN_SIDE_PANEL, CLOSE_SIDE_PANEL, START_LOADING, STOP_LOADING } from '../consts/actionTypes.js';

export const openSidePanel = { type: OPEN_SIDE_PANEL };
export const closeSidePanel = { type: CLOSE_SIDE_PANEL };
export const setLoadingOn = { type: START_LOADING };
export const setLoadingOff = { type: STOP_LOADING };
