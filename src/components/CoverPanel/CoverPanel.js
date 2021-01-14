import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import List from '@material-ui/core/List';
import Cover from './Cover/Cover.js';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { addNewCover, getAllCovers, deleteMyCover, editMyCover } from '../../actions/coverActions.js';
import Container from '@material-ui/core/Container';
import Form from './NewCoverForm.js';
import MyButton from '../common/MyButton.js';
import clsx from 'clsx';
import CoverForm from './CoverForm.js';
import { SIDE_PANEL_WIDTH_WIDE, HEADER_MARGIN } from '../../consts/measures.js';
import styles from '../../styles/panelStyle.js';

const useStyles = makeStyles((theme) => ({}));

const CoverPanel = ({ classes }) => {
  const dispatch = useDispatch();

  const items = useSelector((state) => state.cover.items);
  const isSidePanelOpen = useSelector((state) => state.options.isSidePanelOpen);
  const [openForm, setOpenForm] = useState(false);
  const [coverExpanded, setCoverExpanded] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const handleChange = (id) => (event, newExpanded) => {
    setCoverExpanded(newExpanded ? id : null);
  };

  const openFormHandler = (e) => {
    setOpenForm(true);
  };

  const closeFormHandler = (e) => {
    setOpenForm(false);
  };

  const saveCover = async (name, content) => {
    if (isEditMode) {
      dispatch(editMyCover({ id: editItem.id, name: name, content: content }));
      setIsEditMode(false);
      setOpenForm(false);
      setEditItem(null);
    } else dispatch(addNewCover({ name: name, content: content }));
  };

  const deleteCover = (id) => {
    dispatch(deleteMyCover(id));
  };

  const editCover = (id, name, content) => {
    setEditItem({ id: id, name: name, content: content });
    setIsEditMode(true);
    setOpenForm(true);
    // dispatch(editMyCover({ id: id, content: content }));
  };

  //display my files on init
  useEffect(() => {
    dispatch(getAllCovers());
  }, []);

  let covers = items.map((cover) => (
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
        <div className={classes.addButtonContainer}>
          {!openForm && <MyButton name='Add cover' theme='light' onClick={openFormHandler} />}
        </div>
        {openForm && (
          <CoverForm
            initName={editItem ? editItem.name : ''}
            initContent={editItem ? editItem.content : ''}
            mode={isEditMode ? 'edit' : 'new'}
            saveCover={saveCover}
            closeForm={closeFormHandler}
          />
        )}
      </Container>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(CoverPanel);
