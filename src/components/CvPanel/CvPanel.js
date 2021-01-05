import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { addNewCv, updateMyCv, deleteMyCv } from '../../actions/cvActions.js';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Container from '@material-ui/core/Container';

import Cv from './Cv/Cv.js';
import Form from './NewCvForm.js';
import { SIDE_PANEL_WIDTH, HEADER_MARGIN } from '../../consts/measures.js';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: HEADER_MARGIN,
    marginLeft: `calc(${SIDE_PANEL_WIDTH}px + 10px)`,
    '& .MuiListItem-root': {},
    [theme.breakpoints.down('xs')]: {
      marginLeft: '70px',
    },
  },
}));

const CvPanel = () => {
  const classes = useStyles(useStyles());
  const dispatch = useDispatch();
  const items = useSelector((state) => [...state.cv.items]);

  //const [cvObjects, setCvObjects] = useState(items);

  const saveNewCv = (data) => {
    dispatch(addNewCv(data));
  };

  const deleteCv = (data) => {
    dispatch(deleteMyCv(data));
  };

  useEffect(async () => {
    await dispatch(updateMyCv());
  }, []);

  const cvItems = items.map((cv) => <Cv key={cv.name} name={cv.name} deleteCv={deleteCv} />); //type={cv.type} link={cv.link}

  return (
    <div className={classes.root}>
      <Container>
        <List>{cvItems}</List>
        <Form saveCv={saveNewCv} deleteCv={deleteCv} />
      </Container>
    </div>
  );
};

export default CvPanel;
