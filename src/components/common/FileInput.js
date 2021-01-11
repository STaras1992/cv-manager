import React, { useState, useEffect } from 'react';
import { useFormContext, Controller, useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import UploadIcon from '@material-ui/icons/Publish';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  inputContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  fileInput: {
    display: 'none',
  },
}));

const FileInput = (props) => {
  const classes = useStyles();
  const { control, register } = useFormContext();
  const { name, label, required, onChange, errorobj, defaultValue } = props;
  let isError = false;
  let errorMessage = '';
  // const [file, setFile] = useState(null);

  if (errorobj && errorobj.hasOwnProperty(name)) {
    isError = true;
    errorMessage = errorobj[name].message;
  }

  return (
    <Controller
      render={({ onChange, onBlur, name }) => (
        <Button className={classes.fileButton} variant='contained' startIcon={<UploadIcon />} component='label'>
          {label}
          <div className={classes.fileInput}>
            <input type='file' name={name} onBlur={onBlur} ref={register} />
          </div>
        </Button>
      )}
      control={control}
      name={name}
      defaultValue={defaultValue}
      error={isError}
      helperText={errorMessage}
      {...props}
    />
  );
};

export default FileInput;
{
  /* <input ref={register} type='file' name={'cvFile'} /> */
}
