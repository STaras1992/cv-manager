import React, { useState } from 'react';
import List from '@material-ui/core/List';
import Cover from './Cover/Cover.js';
import { makeStyles } from '@material-ui/core/styles';
import { getCovers } from '../../utills/cover.js';
import { SIDE_PANEL_WIDTH, HEADER_MARGIN } from '../../consts/measures.js';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '500px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: HEADER_MARGIN,
    marginLeft: SIDE_PANEL_WIDTH,
  },
}));

const CoverPanel = () => {
  const classes = useStyles();
  const [coverObjects] = useState(getCovers());
  const [expanded, setExpanded] = useState('');

  const handleChange = (coverTitle) => (event, newExpanded) => {
    setExpanded(newExpanded ? coverTitle : false);
  };

  const covers = coverObjects.map((cover) => (
    <Cover title={cover.title} text={cover.text} expanded={expanded} handleChange={handleChange} />
  ));

  return <div className={classes.root}>{covers}</div>;
};

export default CoverPanel;
