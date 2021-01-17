import React, { useState, useEffect } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import { LIGHT_BLUE, DARK_BLUE, LIGHT, DARK, RED_ERROR, LIME } from '../../consts/colors.js';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    margin: 0,
    padding: 0,
    '& .MuiFormControlLabel-root': {
      '& .MuiCheckbox-root': {
        color: 'white',
        '& svg': {
          fontSize: '32px',
        },
      },
    },
    '& span': {
      color: 'white',
      fontSize: '20px',
    },
  },
}));

export const MyCheckBox = ({ label, name, value = false, handleChange }) => {
  const classes = useStyles();

  return (
    <FormControl className={classes.root} name={name}>
      <FormControlLabel
        value='edit'
        control={<Checkbox checked={value} onChange={handleChange} />}
        label={label}
        labelPlacement='start'
      />
    </FormControl>
  );
};

export default MyCheckBox;
