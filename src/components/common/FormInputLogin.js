import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { PURPLE, BLUE, DARK_GREY, DARK, RED_ERROR } from '../../consts/colors.js';

const useStyles = makeStyles((theme) => ({
  root: {
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

export const FormInput = ({ name = '', label = '', errorobj = {}, defaultValue = '', ...props }) => {
  const classes = useStyles();
  const { control } = useFormContext();
  let isError = false;
  let errorMessage = '';

  if (errorobj && errorobj.hasOwnProperty(name)) {
    isError = true;
    errorMessage = errorobj[name].message;
  }

  return (
    <Controller
      as={<TextField classes={{ root: classes.root }} variant='outlined' />}
      name={name}
      control={control}
      defaultValue={defaultValue}
      label={label}
      fullWidth={true}
      error={isError}
      helperText={errorMessage}
      {...props}
    />
  );
};

export default FormInput;
