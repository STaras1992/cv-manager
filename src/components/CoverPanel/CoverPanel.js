import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import List from '@material-ui/core/List';
import Cover from './Cover/Cover.js';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { addNewCover, updateMyCovers, deleteMyCover } from '../../actions/coverActions.js';
import Container from '@material-ui/core/Container';
import Form from './NewCoverForm.js';
import MyButton from '../common/MyButton.js';
import clsx from 'clsx';
import { SIDE_PANEL_WIDTH_WIDE, HEADER_MARGIN } from '../../consts/measures.js';
import styles from '../../styles/panelStyle.js';

const useStyles = makeStyles((theme) => ({
  // root: {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   justifyContent: 'flex-start',
  //   alignItems: 'flex-start',
  //   marginTop: HEADER_MARGIN,
  //   marginLeft: `calc(${SIDE_PANEL_WIDTH_WIDE}px + 10px)`,
  //   [theme.breakpoints.down('xs')]: {
  //     marginLeft: '70px',
  //   },
  // },
}));

const CoverPanel = ({ classes }) => {
  // const classes = useStyles();
  const dispatch = useDispatch();

  const items = useSelector((state) => state.cover.items);
  const isSidePanelOpen = useSelector((state) => state.options.isSidePanelOpen);
  const [openForm, setOpenForm] = useState(false);
  const [coverExpanded, setCoverExpanded] = useState('');

  const handleChange = (id) => (event, newExpanded) => {
    setCoverExpanded(newExpanded ? id : null);
  };

  const openFormHandler = (e) => {
    setOpenForm(!openForm);
  };

  const saveNewCover = (name, content) => {
    dispatch(addNewCover({ name, content }));
  };

  const deleteCover = (name) => {
    dispatch(deleteMyCover(name));
  };

  const editCover = (id, content) => {};

  useEffect(async () => {
    await dispatch(updateMyCovers());
  }, []);

  const covers = items.map((cover) => (
    <Cover
      key={cover.id}
      id={cover.id}
      name={cover.name}
      content={cover.content}
      expanded={coverExpanded}
      deleteCover={deleteCover}
      editCover={editCover}
      handleChange={handleChange}
    />
  ));

  return (
    <div
      className={clsx(classes.root, {
        [classes.expanded]: isSidePanelOpen,
      })}
    >
      <Container maxWidth='lg'>
        <div>{covers}</div>
        {!openForm && <MyButton name='Add cover' theme='light' onClick={openFormHandler} />}
        {openForm && <Form saveCover={saveNewCover} deleteCover={deleteCover} />}
        {/* <Form saveCover={saveNewCover} /> */}
      </Container>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(CoverPanel);
