import { ADD_MY_COVER, UPDATE_MY_COVERS, DELETE_MY_COVER } from '../consts/actionTypes.js';
import * as api from '../api/api.js';

const updateCovers = (items) => ({ type: UPDATE_MY_COVERS, payload: items });
const addCover = (item) => ({ type: ADD_MY_COVER, payload: item });
const deleteCover = (item) => ({ type: DELETE_MY_COVER, payload: item });

export const updateMyCovers = () => async (dispatch) => {
  const response = await api.getAllCovers();
  if (response.status === 200) {
    await dispatch(updateCovers(response.data.items));
  }
};

export const addNewCover = (data) => async (dispatch) => {
  const response = await api.addCover(data);
  if (response.status === 200) {
    //updateMyCv(dispatch);
    await dispatch(addCover(response.data.item));
  }
};

export const deleteMyCover = (data) => async (dispatch) => {
  const response = await api.deleteCover(data);

  if (response.status === 200) {
    //updateMyCv(dispatch);
    await dispatch(deleteCover(response.data.name));
  }
};
