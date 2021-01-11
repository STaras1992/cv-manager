import { ADD_MY_CV, UPDATE_MY_CVS, DELETE_MY_CV, UPDATE_SELECTED_CV, UPDATE_MY_CV } from '../consts/actionTypes.js';
import * as api from '../api/api.js';

const updateCvs = (items) => ({ type: UPDATE_MY_CVS, payload: items });
const updateEditedCv = (item) => ({ type: UPDATE_MY_CV, payload: item });
const addCv = (item) => ({ type: ADD_MY_CV, payload: item });
const deleteCv = (id) => ({ type: DELETE_MY_CV, payload: id });

export const getAllCvs = () => async (dispatch) => {
  const response = await api.getAllCv();
  if (response.status === 200) {
    await dispatch(updateCvs(response.data.items));
  }
};

export const addNewCv = (data) => async (dispatch) => {
  let formData = new FormData();
  formData.append('file', data.file);
  formData.append('name', data.name);
  formData.append('description', data.description);
  const response = await api.addCv(formData);
  if (response.status === 200) {
    await dispatch(
      addCv({
        id: response.data.data.id,
        name: response.data.data.name,
        description: response.data.data.description,
        file: response.data.data.file,
        type: response.data.data.type,
      })
    );
  }
};

export const deleteMyCv = (id) => async (dispatch) => {
  const response = await api.deleteCv(id);
  if (response.status === 200) {
    await dispatch(deleteCv(response.data.id));
  }
};

// export const getSelectedCv = (id) => async (dispatch) => {
//   const response = await api.getCv(id);
//   if (response.status === 200) {
//     await dispatch(getAllCvs(response.data.item));
//   }
// };

export const editMyCv = (data) => async (dispatch) => {
  let dataToSend = {};
  //file was not changed.File already in db and data.file is link to file.
  if (typeof data.file === 'string') {
    dataToSend = data;
  }
  //new file selected.data.file is File object.
  else if (typeof data.file === 'object') {
    dataToSend = new FormData();
    dataToSend.append('file', data.file);
    dataToSend.append('id', data.id);
    dataToSend.append('name', data.name);
    dataToSend.append('description', data.description);
  }
  //Ther was some error in process.
  else {
    console.log('Bad selected file!'); //DEV
  }

  const response = await api.updateCv(dataToSend);

  if (response.status === 200) {
    await dispatch(updateEditedCv(response.data.item));
  }
};
