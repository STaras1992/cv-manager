import React, { useState, useEffect } from 'react';
import { useFormContext, Controller, useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import UploadIcon from '@material-ui/icons/Publish';
import Button from '@material-ui/core/Button';
import { LIGHT_BLUE, DARK_BLUE, LIGHT, DARK, RED_ERROR, GREEN_SUCCESS } from '../../consts/colors.js';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '200px',
    height: '45px',
    background: LIGHT,
    border: '2px solid',
    borderColor: DARK_BLUE,
    borderRadius: '5px',
    margin: '15px 0',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: 'white',
      borderColor: 'white',
      '& .MuiButton-label svg': {
        color: LIGHT_BLUE,
      },
    },
    '& .MuiButton-label': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginTop: '3px',
      color: DARK_BLUE,
      '& svg': {
        fontSize: '36px',
        marginBottom: '4px',
        marginRight: '10px',
        color: DARK_BLUE,
      },
    },
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
        <Button className={classes.root} variant='contained' startIcon={<UploadIcon />} component='label'>
          Upload File
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
