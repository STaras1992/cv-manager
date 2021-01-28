import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';
import FileInput from '../common/FileInput.js';
import clsx from 'clsx';
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

const FormFileInput = ({ name, errors, isSelected }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.inputContainer}>
        <FileInput name={name} label='Upload file' required={true} errorobj={errors} />
        <div className={clsx(classes.inputStatusIcon, { [classes.hide]: !isSelected })}>
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
