import React, { useState, useEffect } from 'react';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import { LIGHT_BLUE, DARK_BLUE, LIGHT, DARK, RED_ERROR, GREEN_SUCCESS, LIME } from '../../consts/colors.js';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  switch_root: {
    width: '68px',
    height: '47px',
  },
  switch_thumb: {
    width: '28px',
    height: '28px',
  },
  switch_track: {
    backgroundColor: 'white',
  },
  switch_base: {
    color: RED_ERROR,
    '&.Mui-checked': {
      color: GREEN_SUCCESS,
    },
    '&.Mui-checked + .MuiSwitch-track': {
      backgroundColor: LIME,
    },
  },
  switchLabel: {
    color: 'white',
    fontSize: '22px',
  },
}));

export const MySwitch = ({ label, name, value = false, handleChange }) => {
  const classes = useStyles();

  return (
    <FormControl className={classes.root} name={name}>
      <FormControlLabel
        value='edit'
        classes={{ label: classes.switchLabel }}
        control={
          <Switch
            classes={{
              root: classes.switch_root,
              thumb: classes.switch_thumb,
              track: classes.switch_track,
              switchBase: classes.switch_base,
              colorPrimary: classes.switch_primary,
            }}
            checked={value}
            onChange={handleChange}
          />
        }
        label={label}
        labelPlacement='start'
      />
    </FormControl>
  );
};

export default MySwitch;
