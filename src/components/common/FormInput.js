import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import { LIME } from '../../consts/colors.js';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '80%',
    minWidth: '290px',
    margin: '15px 0px',
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white',
    },
    '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderWidth: 4,
      padding: '4px !important',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderLeftWidth: 6,
      borderWidth: 4,
      padding: '4px !important',
    },
    '& label': {
      color: LIME,
    },
    '& label.Mui-error': {
      color: LIME,
    },
    '& label.Mui-focused': {
      color: LIME,
    },

    '& .MuiInputBase-root': {
      color: 'white',
    },
    //add
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
}));

export const FormInputUnControlled = ({ label, name, value = '', onChange }) => {
  const classes = useStyles();

  return (
    <FormControl name={name}>
      <TextField
        className={classes.root}
        label={label}
        value={value}
        onChange={onChange}
        autoComplete='off'
        variant='outlined'
      >
        {value}
      </TextField>
      ;
    </FormControl>
  );
};

export const FormInput = (props) => {
  const classes = useStyles();
  const { control } = useFormContext();
  const { name, label, errorobj, defaultValue } = props;
  let isError = false;
  let errorMessage = '';

  if (errorobj && errorobj.hasOwnProperty(name)) {
    isError = true;
    errorMessage = errorobj[name].message;
  }

  return (
    <Controller
      as={<TextField classes={{ root: classes.root }} autoComplete='off' variant='outlined' />}
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
