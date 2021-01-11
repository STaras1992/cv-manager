import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import * as yup from 'yup';
import clsx from 'clsx';
import { yupResolver } from '@hookform/resolvers/yup';
import FormControl from '@material-ui/core/FormControl';
import CheckIcon from '@material-ui/icons/Check';
import ErrorIcon from '@material-ui/icons/Error';
import UploadIcon from '@material-ui/icons/Publish';
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
  file: yup.object(),
});

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  formControll: {},
  textField: {
    width: '80%',
    '& .MuiTextField-root': {
      color: 'white',
      borderColor: 'white',
    },
  },
  selectField: {
    width: '50%',
  },
  formTitle: {
    margin: '50px 0',
  },
}));

const CvForm = ({ initName = '', initDescription = '', initFile = null, mode = 'new', saveCv }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const formObject = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const { handleSubmit, reset, control, register, errors, clearErrors } = formObject;

  const onSubmit = (data) => {
    console.log(data);
    saveCv(data.name, data.description, data.file);
  };

  const handleReset = () => {
    reset({ name: '', description: '', file: null });
    clearErrors();
  };

  useEffect(() => {}, []);

  useEffect(() => {
    reset({ name: initName, description: initDescription, file: initFile });
  }, [initName]);

  return (
    <FormProvider {...formObject}>
      <form onSubmit={handleSubmit(onSubmit)} onReset={handleReset}>
        <Container className={classes.root}>
          <Typography className={classes.formTitle} variant='h4'>
            {mode === 'edit' ? 'Edit CV:' : 'New CV:'}
          </Typography>
          <FormInput name='name' label='Name' required={true} defaultValue={initName} errorobj={errors} />
          <FormInput
            name='description'
            label='Description'
            defaultValue={initDescription}
            required={false}
            errorobj={errors}
          />
          <FileInput name='file' control={control} />
          <div className={classes.submitContainer}>
            <MyButton name='Save' theme='dark' type='submit' />
            <MyButton name='Reset' theme='dark' type='reset' />
          </div>
        </Container>
      </form>
    </FormProvider>
  );
};

export default CvForm;
