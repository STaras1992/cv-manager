import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import * as yup from 'yup';
import clsx from 'clsx';
import { yupResolver } from '@hookform/resolvers/yup';
import FormControl from '@material-ui/core/FormControl';
import CheckIcon from '@material-ui/icons/Check';
import ErrorIcon from '@material-ui/icons/Error';
import UploadIcon from '@material-ui/icons/Publish';
import TopArrowIcon from '@material-ui/icons/VerticalAlignTop';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import InputTextField from '../common/InputTextField.js';
import MyButton from '../common/MyButton.js';
import FormSelect from '../common/FormSelect.js';
import FileInput from '../common/FileInput.js';
import FormInput from '../common/FormInput.js';
import { getAllCvs } from '../../actions/cvActions.js';
import { getAllCovers } from '../../actions/coverActions.js';
import { MAX_NAME_LENGTH, MAX_DESCRIPTION_LENGTH } from '../../consts/measures.js';
import { FILE_FORMATS } from '../../consts/structs.js';
import { LIGHT_BLUE, DARK_BLUE, LIGHT, DARK, RED_ERROR, GREEN_SUCCESS } from '../../consts/colors.js';
import FormTitle from '../common/FormTitle.js';
import FormFileInput from '../common/FormFileInput.js';
import formStyle from '../../styles/formStyle.js';

const schema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required field')
    .test('len', `Must be less than ${MAX_NAME_LENGTH} characters`, (val) => val.length <= MAX_NAME_LENGTH),
  content: yup
    .string()
    .test(
      'len',
      `Must be less than ${MAX_DESCRIPTION_LENGTH} characters`,
      (val) => val.length <= MAX_DESCRIPTION_LENGTH
    ),
});

// const useStyles = makeStyles((theme) => ({
//   // root: {
//   //   width: '100%',
//   //   display: 'flex',
//   //   margin: 0,
//   //   padding: 0,
//   //   flexDirection: 'column',
//   //   justifyContent: 'flex-start',
//   // },
//   // titleContainer: {
//   //   width: '80%',
//   //   display: 'flex',
//   //   justifyContent: 'space-between',
//   //   alignItems: 'center',
//   //   '& svg': {
//   //     color: LIGHT,
//   //     fontSize: '45px',
//   //   },
//   // },
//   // formTitle: {
//   //   margin: '40px 0',
//   //   color: 'white',
//   // },
//   // errorMessage: {
//   //   color: RED_ERROR,
//   //   margin: '5px 2px',
//   // },
//   // inputContainer: {
//   //   display: 'flex',
//   //   alignItems: 'center',
//   // },
//   // inputStatusIcon: {
//   //   '& svg': {
//   //     color: GREEN_SUCCESS,
//   //     fontWeight: 'bold',
//   //     fontSize: '45px',
//   //     marginLeft: '5px',
//   //   },
//   // },
//   // hide: {
//   //   display: 'none',
//   // },
// }));

const CoverForm = ({ initName = '', initContent = '', mode = 'new', saveCover, closeForm, classes }) => {
  //const classes = useStyles();

  const formObject = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const { handleSubmit, reset, control, register, watch, errors, clearErrors } = formObject;

  const onSubmit = (data) => {
    console.log(data);
    saveCover(data.name, data.content);
  };

  const handleClose = () => {
    closeForm();
  };

  const handleReset = () => {
    reset({ name: '', content: '' });
    clearErrors();
  };

  useEffect(() => {
    reset({ name: initName, description: initContent });
  }, [initName]);

  return (
    <FormProvider {...formObject}>
      <form onSubmit={handleSubmit(onSubmit)} onReset={handleReset}>
        <Container className={classes.root}>
          <FormTitle mode={mode} label='cover' handleClose={handleClose} />
          <FormInput name='name' label='Name' required={true} defaultValue={initName} errorobj={errors} />
          <FormInput name='content' label='Content' defaultValue={initContent} required={false} errorobj={errors} />
          <div className={classes.submitContainer}>
            <MyButton name='Save' theme='dark' type='submit' />
            <MyButton name='Reset' theme='dark' type='reset' />
          </div>
        </Container>
      </form>
    </FormProvider>
  );
};

export default withStyles(formStyle)(CoverForm);
