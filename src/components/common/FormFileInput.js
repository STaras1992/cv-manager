import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';
import { useFormContext } from 'react-hook-form';
import FileInput from '../common/FileInput.js';
import { RED_ERROR, GREEN_SUCCESS } from '../../consts/colors.js';

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
