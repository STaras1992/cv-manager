import React, { useState, useEffect, forwardRef } from 'react';
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
import { useForm, Controller, FormProvider, useFormContext } from 'react-hook-form';
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

const useStyles = makeStyles({
  root: {},
  errorMessage: {
    color: RED_ERROR,
    margin: '5px 2px',
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  inputStatusIcon: {
    '& svg': {
      color: GREEN_SUCCESS,
      fontWeight: 'bold',
      fontSize: '45px',
      marginLeft: '5px',
    },
  },
  hide: {
    display: 'none',
  },
});

const FormFileInput = ({ name, errors, initFile }) => {
  const classes = useStyles();
  const { watch } = useFormContext();

  const file = watch('cvFile');

  useEffect(() => {
    console.log('file changed');
    console.log(file);
  }, [file]);

  return (
    <div className={classes.root}>
      <div className={classes.inputContainer}>
        <FileInput name={name} label='Upload file' required={true} defaultValue={initFile} errorobj={errors} />
        <div className={file && file.length > 0 ? classes.inputStatusIcon : classes.hide}>
          <CheckIcon />
        </div>
      </div>
      <div className={classes.errorContainer}>
        {errors.cvFile && <p className={classes.errorMessage}>{errors.cvFile && errors.cvFile.message}</p>}
        {/* {file && <p className={classes.errorMessage}>{file.length === 0 && 'file is required'}</p>} */}
      </div>
    </div>
  );
};

export default FormFileInput;
