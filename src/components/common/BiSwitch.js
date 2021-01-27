import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { LIGHT_BLUE, BLUE, DARK_BLUE, LIGHT, DARK, RED_ERROR, GREEN_SUCCESS, LIME } from '../../consts/colors.js';

const AntSwitch = withStyles((theme) => ({
  root: {
    width: 32,
    height: 18,
    padding: 0,
  },
  switchBase: {
    padding: 2,
    color: LIGHT_BLUE,
    '&$checked': {
      transform: 'translateX(14px)',
      color: LIGHT_BLUE,
      '& + $track': {
        opacity: 1,
        backgroundColor: LIGHT,
        // borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 14,
    height: 14,
    boxShadow: 'none',
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: LIGHT,
  },
  checked: {},
}))(Switch);

const useStyle = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  label: {
    padding: '5px',
  },
}));

const BiSwitch = ({ labelLeft = 'LEFT', labelRight = 'RIGHT', checked, handleChange, classes = {} }) => {
  return (
    <Typography className={classes.root} component='div'>
      <span className={classes.label}>{labelLeft}</span>
      <AntSwitch checked={!checked} onChange={handleChange} />
      <span className={classes.label}>{labelRight}</span>
    </Typography>
  );
};

export default BiSwitch;
