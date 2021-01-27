import React from 'react';
import RichTextEditor from './RichTextEditor.js';
import { useFormContext, Controller } from 'react-hook-form';

export const FormRichTextEditor = (props) => {
  const { name, defaultValue } = props;
  const { control } = useFormContext();

  return (
    <React.Fragment>
      <Controller
        as={RichTextEditor}
        valueName='editorState'
        control={control}
        name={name}
        onChange={([value]) => value}
        defaultValue={defaultValue}
        {...props}
      />
    </React.Fragment>
  );
};

export default FormRichTextEditor;
