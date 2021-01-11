import React from 'react';
import { useFormContext, Controller, useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {},
  requiredLabel: {
    '& span': {
      color: '#f44336',
    },
  },
}));

const FormInput = (props) => {
  const classes = useStyles();
  const { control } = useFormContext();
  const { name, label, required, errorobj, defaultValue } = props;
  let isError = false;
  let errorMessage = '';

  if (errorobj && errorobj.hasOwnProperty(name)) {
    isError = true;
    errorMessage = errorobj[name].message;
  }

  return (
    <Controller
      as={<TextField className={classes.textField} variant='outlined' />}
      name={name}
      control={control}
      defaultValue={defaultValue}
      label={label}
      fullWidth={true}
      InputLabelProps={{
        className: required ? classes.requiredLabel : '',
        required: required || false,
      }}
      error={isError}
      helperText={errorMessage}
      {...props}
    />
  );
};

export default FormInput;
