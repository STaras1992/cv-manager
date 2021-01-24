import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { DialogContentText } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import {
  LIGHT_BLUE,
  DARK_BLUE,
  LIME,
  DARK_GREY,
  PURPLE,
  LIGHT,
  DARK,
  RED_ERROR,
  GREEN_SUCCESS,
} from '../../consts/colors.js';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  dialogContent: {
    padding: '8px 16px',
  },
  dialogTitle: {
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  dialogText: {
    color: PURPLE,
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant='h6'>{children}</Typography>
      {onClose ? (
        <IconButton aria-label='close' className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const ConfirmDialog = ({ classes, open, dialogTitle, dialogText, handleOk, handleClose }) => {
  const [text, setText] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleDialogOK = () => {
    setIsOpen(false);
    handleOk();
  };

  const handleDialogClose = () => {
    setIsOpen(false);
    handleClose();
  };

  const handleChange = (e) => {
    const target = e.target;
    const value = target.checked;

    setIsOpen(false);
    setIsChecked(value);
  };

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  useEffect(() => {
    setText(dialogText);
  }, [dialogText]);

  return (
    <div>
      <Checkbox onChange={handleChange} checked={isChecked}></Checkbox>
      <Dialog open={isOpen} onClose={handleDialogClose}>
        <DialogTitle classes={{ root: classes.dialogTitle }} onClose={handleDialogClose}>
          {dialogTitle}
        </DialogTitle>
        <DialogContent classes={{ root: classes.dialogContent }}>
          <DialogContentText className={classes.dialogText}>{text}</DialogContentText>
          <DialogActions>
            <Button color='primary' onClick={handleDialogOK}>
              OK
            </Button>
            <Button color='primary' onClick={handleDialogClose}>
              Cancel
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(ConfirmDialog);
