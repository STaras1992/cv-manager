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
  description: yup
    .string()
    .test(
      'len',
      `Must be less than ${MAX_DESCRIPTION_LENGTH} characters`,
      (val) => val.length <= MAX_DESCRIPTION_LENGTH
    ),
  cvFile: yup
    .mixed()
    .required('File is required')
    .test('fileSize', 'File is too large', (value) => {
      return value.length > 0 && value[0].size < 3000000;
    })
    .test('type', 'Only doc, docx, pdf format supported', (value) => {
      return value.length > 0 && FILE_FORMATS.includes(value[0].type);
    }),
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

const CvForm = ({ initName = '', initDescription = '', initFile = '', mode = 'new', saveCv, closeForm, classes }) => {
  //const classes = useStyles();
  const dispatch = useDispatch();

  const formObject = useForm({
    defaultValues: {
      cvFile: '',
    },
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const { handleSubmit, reset, control, register, watch, errors, clearErrors } = formObject;

  const file = watch('cvFile');

  const onSubmit = (data) => {
    console.log(data);
    saveCv(data.name, data.description, data.cvFile[0]);
  };

  const handleClose = () => {
    closeForm();
  };

  const handleReset = () => {
    reset({ name: '', description: '', file: null });
    clearErrors();
  };

  useEffect(() => {
    reset({ name: initName, description: initDescription, file: initFile });
  }, [initName]);

  return (
    <FormProvider {...formObject}>
      <form className={classes.root} onSubmit={handleSubmit(onSubmit)} onReset={handleReset}>
        {/* <Container className={classes.root}> */}
        <FormTitle mode={mode} label='CV' handleClose={handleClose} />
        <FormInput name='name' label='Name' required={true} defaultValue={initName} errorobj={errors} />
        <FormInput
          name='description'
          label='Description'
          defaultValue={initDescription}
          required={false}
          errorobj={errors}
        />
        <FormFileInput name='cvFile' errors={errors} initFile={initFile} />
        <div className={classes.submitContainer}>
          <MyButton name='Save' theme='dark' type='submit' />
          <MyButton name='Reset' theme='dark' type='reset' />
        </div>
        {/* </Container> */}
      </form>
    </FormProvider>
  );
};

export default withStyles(formStyle)(CvForm);
