import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import * as yup from 'yup';
import clsx from 'clsx';
import { yupResolver } from '@hookform/resolvers/yup';
import Container from '@material-ui/core/Container';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import MyButton from '../common/MyButton.js';
import { FormInput, FormInputUnControlled } from '../common/FormInput.js';
import { MAX_NAME_LENGTH, MAX_DESCRIPTION_LENGTH } from '../../consts/measures.js';
import { FILE_FORMATS } from '../../consts/structs.js';
import { LIGHT_BLUE, DARK_BLUE, LIGHT, DARK, RED_ERROR, GREEN_SUCCESS } from '../../consts/colors.js';
import FormTitle from '../common/FormTitle.js';
import formStyle from '../../styles/formStyle.js';
import parser from 'html-react-parser';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { RichTextEditor, FormRichTextEditor } from '../common/RichTextEditor.js';
import { convertJsonToEditorContent, convertEditorContentToJson } from '../../utills/editorUtils.js';

const schema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required field')
    .test('len', `Must be less than ${MAX_NAME_LENGTH} characters`, (val) => val.length <= MAX_NAME_LENGTH),
});

const useStyles = makeStyles((theme) => ({
  editor: {
    width: '100%',
  },
}));

const CoverForm = ({ initName = '', initContent = '', mode = 'new', saveCover, closeForm, classes }) => {
  const myClasses = useStyles();
  // const [name, setName] = useState('');
  const [initEditorContent, setInitEditorContent] = useState('');
  const [content, setContent] = useState('');

  const formObject = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const { handleSubmit, reset, errors, clearErrors } = formObject;

  const onSubmit = (data) => {
    let json;
    json = convertEditorContentToJson(content);
    saveCover(data.name, json);
  };

  const handleClose = () => {
    closeForm();
  };

  const handleReset = () => {
    reset({ name: '' });
    clearErrors();
    setInitEditorContent(EditorState.createEmpty().getCurrentContent());
  };

  const onContentChanged = (newContent) => {
    setContent(newContent);
  };

  useEffect(() => {
    reset({ name: initName });
  }, [initName]);

  useEffect(() => {
    if (initContent !== '') {
      setInitEditorContent(convertJsonToEditorContent(initContent));
    }
  }, [initContent]);

  useEffect(() => {
    setContent(initEditorContent);
  }, [initEditorContent]);

  return (
    <FormProvider {...formObject}>
      <form className={classes.root} onSubmit={handleSubmit(onSubmit)} onReset={handleReset}>
        <FormTitle mode={mode} label='cover' handleClose={handleClose} />
        {/* <FormInputUnControlled name='name' required={true} label='Name' onChange={onNameChange} value={name} /> */}
        <FormInput name='name' label='Name' required={true} defaultValue={initName} errorobj={errors} />
        <div className={myClasses.editor}>
          <RichTextEditor initContent={initEditorContent} onContentChange={onContentChanged} />
        </div>
        <div className={classes.submitContainer}>
          <MyButton name='Save' theme='dark' type='submit' />
          <MyButton name='Reset' theme='dark' type='reset' />
        </div>
      </form>
    </FormProvider>
  );
};

export default withStyles(formStyle)(CoverForm);
