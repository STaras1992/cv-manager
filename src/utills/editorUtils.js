import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';

export const convertJsonToEditorContent = (json) => {
  if (json === '') return EditorState.createEmpty().getCurrentContent();
  return convertFromRaw(JSON.parse(json));
};

export const convertEditorContentToJson = (state) => {
  if (state === '') return '';
  return JSON.stringify(convertToRaw(state));
};
