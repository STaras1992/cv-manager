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
import { convertToRaw, convertFromRaw } from 'draft-js';
import { RichTextEditor, FormRichTextEditor } from '../common/RichTextEditor.js';

// const schema = yup.object().shape({
//   name: yup
//     .string()
//     .required('Name is required field')
//     .test('len', `Must be less than ${MAX_NAME_LENGTH} characters`, (val) => val.length <= MAX_NAME_LENGTH),
//   content: yup
//     .string()
//     .test(
//       'len',
//       `Must be less than ${MAX_DESCRIPTION_LENGTH} characters`,
//       (val) => val.length <= MAX_DESCRIPTION_LENGTH
//     ),
// });

const useStyles = makeStyles((theme) => ({
  editor: {
    width: '80%',
  },
  // root: {
  //   width: '100%',
  //   display: 'flex',
  //   margin: 0,
  //   padding: 0,
  //   flexDirection: 'column',
  //   justifyContent: 'flex-start',
  // },
  // titleContainer: {
  //   width: '80%',
  //   display: 'flex',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   '& svg': {
  //     color: LIGHT,
  //     fontSize: '45px',
  //   },
  // },
  // formTitle: {
  //   margin: '40px 0',
  //   color: 'white',
  // },
  // errorMessage: {
  //   color: RED_ERROR,
  //   margin: '5px 2px',
  // },
  // inputContainer: {
  //   display: 'flex',
  //   alignItems: 'center',
  // },
  // inputStatusIcon: {
  //   '& svg': {
  //     color: GREEN_SUCCESS,
  //     fontWeight: 'bold',
  //     fontSize: '45px',
  //     marginLeft: '5px',
  //   },
  // },
  // hide: {
  //   display: 'none',
  // },
}));

const CoverForm = ({ initName = '', initContent = '', mode = 'new', saveCover, closeForm, classes }) => {
  const myClasses = useStyles();
  // const formObject = useForm({
  //   mode: 'all',
  //   // resolver: yupResolver(schema),
  // });
  // const { handleSubmit, reset, control, register, watch, errors, clearErrors } = formObject;

  const [name, setName] = useState('');
  const [content, setContent] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    let json = JSON.stringify(convertToRaw(content.getCurrentContent()));
    saveCover(name, json);
  };

  const handleClose = () => {
    closeForm();
  };

  const handleReset = () => {
    // reset({ name: '', content: '' });
    // clearErrors();
  };

  const onContentChanged = (contentState) => {
    setContent(contentState);
  };

  const onNameChange = (e) => {
    setName(e.target.value);
  };

  useEffect(() => {
    setName(initName);
  }, [initName]);

  useEffect(() => {
    setContent(initContent);
  }, [initContent]);

  return (
    // <FormProvider {...formObject}>
    <form className={classes.root} onSubmit={onSubmit} onReset={handleReset}>
      {/* <Container className={classes.root}> */}
      <FormTitle mode={mode} label='cover' handleClose={handleClose} />
      {/* <FormInput name='name' label='Name' required={true} defaultValue={initName} errorobj={errors} /> */}
      {/* <FormInput name='content' label='Content' defaultValue={initContent} required={false} errorobj={errors} /> */}
      <FormInputUnControlled name='name' label='Name' onChange={onNameChange} value={name} />
      <div className={myClasses.editor}>
        <RichTextEditor initState={initContent} onContentChange={onContentChanged} />
      </div>
      <div className={classes.submitContainer}>
        <MyButton name='Save' theme='dark' type='submit' />
        <MyButton name='Reset' theme='dark' type='reset' />
      </div>
      {/* </Container> */}
    </form>
    // </FormProvider>
  );
};

export default withStyles(formStyle)(CoverForm);
