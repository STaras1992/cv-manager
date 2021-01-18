import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import { LIGHT_BLUE, DARK_BLUE, LIGHT, DARK, RED_ERROR, LIME } from '../../consts/colors.js';

const useStyles = makeStyles(() => ({
  toolTip: {
    backgroundColor: LIME,
    color: DARK,
    border: `1px solid ${DARK}`,
    fontSize: '18px',
    marginTop: 0,
    minWidth: '55px',
    textAlign: 'center',
  },
  arrowToolTip: {
    color: DARK,
  },
}));

const MyToolTip = ({ children, title = '', position = 'bottom' }) => {
  const classes = useStyles();

  return (
    <Tooltip
      classes={{ tooltip: classes.toolTip, arrow: classes.arrowToolTip }}
      title={title}
      placement={position}
      TransitionComponent={Zoom}
      TransitionProps={{ timeout: 600 }}
      arrow
    >
      {children}
    </Tooltip>
  );
};

export default MyToolTip;
