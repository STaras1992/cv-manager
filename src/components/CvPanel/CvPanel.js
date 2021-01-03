import React, { useState } from 'react';
import List from '@material-ui/core/List';
import Cv from './Cv/Cv.js';
import { makeStyles } from '@material-ui/core/styles';
import { getCvs } from '../../utills/cv.js';
import { SIDE_PANEL_WIDTH, HEADER_MARGIN } from '../../consts/measures.js';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: HEADER_MARGIN,
    marginLeft: SIDE_PANEL_WIDTH,
    '& list': {},
    [theme.breakpoints.down('xs')]: {
      marginLeft: 70,
    },
  },
}));

const CvPanel = () => {
  const classes = useStyles(useStyles());

  const [cvObjects, setCvObjects] = useState(getCvs());

  const cvItems = cvObjects.map((cv) => <Cv name={cv.name} type={cv.type} link={cv.link} />);

  return (
    <div className={classes.root}>
      <List alignItems='flex-start'>{cvItems}</List>
    </div>
  );
};

export default CvPanel;
