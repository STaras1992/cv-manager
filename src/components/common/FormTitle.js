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
import { LIGHT_BLUE, DARK_BLUE, LIGHT, DARK, LIME, RED_ERROR, GREEN_SUCCESS } from '../../consts/colors.js';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '80%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '40px 0',
    color: 'white',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  formTitle: {},
  closeButton: {
    padding: 0,
    margin: 0,
    marginTop: '2px',
    '& svg': {
      color: LIGHT,
      fontSize: '36px',
      '&:hover': {
        color: LIME,
      },
    },
  },
}));

const FormTitle = ({ mode, label, handleClose }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.formTitle} variant='h4'>
        {mode === 'edit' ? `Edit ${label}:` : `New ${label}:`}
      </Typography>
      <IconButton className={classes.closeButton} onClick={handleClose}>
        <TopArrowIcon />
      </IconButton>
    </div>
  );
};

export default FormTitle;
