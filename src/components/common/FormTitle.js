import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import TopArrowIcon from '@material-ui/icons/VerticalAlignTop';
import Typography from '@material-ui/core/Typography';
import { LIGHT, LIME } from '../../consts/colors.js';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '80%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '40px 0',
    color: 'white',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  formTitle: {},
  closeButton: {
    padding: 0,
    margin: 0,
    marginTop: '2px',
    '& svg': {
      color: LIGHT,
      fontSize: '36px',
      '&:hover': {
        color: LIME,
      },
    },
  },
}));

const FormTitle = ({ mode, label, handleClose }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.formTitle} variant='h4'>
        {mode === 'edit' ? `Edit ${label}:` : `New ${label}:`}
      </Typography>
      <IconButton className={classes.closeButton} onClick={handleClose}>
        <TopArrowIcon />
      </IconButton>
    </div>
  );
};

export default FormTitle;
