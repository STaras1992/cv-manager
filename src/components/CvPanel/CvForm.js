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
    .test('fileSelected', 'File is required', (value) => {
      return value && value.length > 0;
    })
    .test('fileSize', 'File is too large', (value) => {
      return value.length === 0 || (value.length > 0 && value[0].size < 3000000);
    })
    .test('type', 'Only doc, docx, pdf format supported', (value) => {
      return value.length === 0 || (value.length > 0 && FILE_FORMATS.includes(value[0].type));
    }),
});

const CvForm = ({ initName = '', initDescription = '', initFile = null, mode = 'new', saveCv, closeForm, classes }) => {
  //const classes = useStyles();
  const dispatch = useDispatch();
  const [isAfterReset, setIsAfterReset] = useState(false);

  const formObject = useForm({
    defaultValues: {
      cvFile: null,
    },
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const { handleSubmit, reset, control, register, watch, errors, clearErrors } = formObject;

  const file = watch('cvFile');

  const onSubmit = (data) => {
    if (data.cvFile.length > 0) saveCv(data.name, data.description, data.cvFile[0]);
    else saveCv(data.name, data.description, initFile);
  };

  const handleClose = () => {
    closeForm();
  };

  const handleReset = () => {
    reset({ name: '', description: '', cvFile: null });
    clearErrors();
    setIsAfterReset(true);
  };

  useEffect(() => {
    reset({ name: initName, description: initDescription, cvFile: null });
    setIsAfterReset(false);
  }, [initFile]);

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
        {/* <FormFileInput name='cvFile' errors={errors} initFile={initFile} /> */}
        <FormFileInput
          name='cvFile'
          errors={errors}
          isSelected={(file && file.length > 0) || (initFile && !isAfterReset)}
        />
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
