import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import List from '@material-ui/core/List';
import Cover from './Cover/Cover.js';
import { makeStyles } from '@material-ui/core/styles';
import { addNewCover, updateMyCovers, deleteMyCover } from '../../actions/coverActions.js';
import Container from '@material-ui/core/Container';
import Form from './NewCoverForm.js';
import { SIDE_PANEL_WIDTH, HEADER_MARGIN } from '../../consts/measures.js';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: HEADER_MARGIN,
    marginLeft: `calc(${SIDE_PANEL_WIDTH}px + 10px)`,
    [theme.breakpoints.down('xs')]: {
      marginLeft: '70px',
    },
  },
}));

const CoverPanel = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const items = useSelector((state) => state.cover.items);

  // const [coverObjects] = useState(getCovers());
  const [expanded, setExpanded] = useState('');

  const handleChange = (coverTitle) => (event, newExpanded) => {
    setExpanded(newExpanded ? coverTitle : false);
  };

  const saveNewCover = (name, content) => {
    dispatch(addNewCover({ name, content }));
  };

  const deleteCover = (name) => {
    dispatch(deleteMyCover(name));
  };

  useEffect(async () => {
    await dispatch(updateMyCovers());
  }, []);

  const covers = items.map((cover) => (
    <Cover
      key={cover.name}
      name={cover.name}
      content={cover.content}
      expanded={expanded}
      deleteCover={deleteCover}
      handleChange={handleChange}
    />
  ));

  return (
    <div className={classes.root}>
      <Container maxWidth='lg'>
        <div>{covers}</div>
        <Form saveCover={saveNewCover} />
      </Container>
    </div>
  );
};

export default CoverPanel;
