import React, { useState, useEffect } from 'react';
import { useFormContext, Controller, useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import { LIGHT_BLUE, PURPLE, BLUE, DARK_GREY, DARK_BLUE, LIGHT, DARK, RED_ERROR, LIME } from '../../consts/colors.js';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    // width: '80%',
    // minWidth: '290px',
    margin: '10px 0px',
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: DARK_GREY,
    },
    '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderWidth: 3,
      borderColor: BLUE,
      padding: '4px !important',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderLeftWidth: 6,
      borderColor: BLUE,
      borderWidth: 3,
      padding: '4px !important',
    },
    '& label': {
      color: PURPLE,
    },
    '& label.Mui-error': {
      color: RED_ERROR,
    },
    '& label.Mui-focused': {
      color: PURPLE,
    },
    '& .MuiInputBase-root': {
      color: DARK,
      fontWeight: '500',
    },
    // add
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
}));

export const FormInput = ({ name = '', label = '', required = false, errorobj = {}, defaultValue = '' }) => {
  const classes = useStyles();
  const { control } = useFormContext();
  //const { name, theme, label, required, errorobj, defaultValue } = props;
  let isError = false;
  let errorMessage = '';

  if (errorobj && errorobj.hasOwnProperty(name)) {
    isError = true;
    errorMessage = errorobj[name].message;
  }

  return (
    <Controller
      as={
        <TextField
          //className={clsx(classes.root, { [classes.light]: theme === 'light', [classes.dark]: theme === 'dark' })}
          classes={{ root: classes.root }}
          //   autoComplete='off'
          variant='outlined'
        />
      }
      name={name}
      control={control}
      defaultValue={defaultValue}
      label={label}
      fullWidth={true}
      error={isError}
      helperText={errorMessage}
    />
  );
};

export default FormInput;
