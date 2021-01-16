import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';

export const convertJsonToEditorContent = (json) => {
  if (json === '') return EditorState.createEmpty().getCurrentContent();
  // if (json === '') return '';
  return convertFromRaw(JSON.parse(json));
};

export const convertEditorContentToJson = (state) => {
  // if (state === '') return JSON.stringify(convertToRaw(EditorState.createEmpty().getCurrentContent()));
  if (state === '') return '';
  return JSON.stringify(convertToRaw(state));
};
