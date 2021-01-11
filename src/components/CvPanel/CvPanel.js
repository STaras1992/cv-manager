import React, { useState, useEffect } from 'react';

import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { addNewCv, getAllCvs, deleteMyCv, editMyCv } from '../../actions/cvActions.js';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Container from '@material-ui/core/Container';
import clsx from 'clsx';

import Cv from './Cv/Cv.js';
import Form from './NewCvForm.js';
import CvForm from './CvForm.js';
import DocViewer from '../common/DocViewer.js';
import MyButton from '../common/MyButton.js';
import { SIDE_PANEL_WIDTH_WIDE, SIDE_PANEL_WIDTH_SHORT, HEADER_MARGIN } from '../../consts/measures.js';
import styles from '../../styles/panelStyle.js';

const useStyles = makeStyles((theme) => ({}));

const CvPanel = ({ classes }) => {
  const myClasses = useStyles();
  const dispatch = useDispatch();
  const items = useSelector((state) => [...state.cv.items], shallowEqual);
  const isSidePanelOpen = useSelector((state) => state.options.isSidePanelOpen);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  // const file = useSelector((state) => state.cv.selectedItem.file);
  // const [fileOpen, setFileOpen] = useState(false);

  const saveNewCv = async (name, description, file) => {
    //save edited instance
    if (isEditMode) {
      await dispatch(editMyCv({ id: editItem.id, name: name, description: description, file: file }));
      setIsEditMode(false);
      setOpenForm(false);
      setEditItem(null);
    }
    //save new instance
    else dispatch(addNewCv({ name: name, description: description, file: file }));
  };

  const deleteCv = (id) => {
    dispatch(deleteMyCv(id));
  };

  // const openFile = async (id) => {
  //   await dispatch(getSelectedCv(id));
  //   if (file !== null) {
  //     setFileOpen(true);
  //   }
  // };

  const openFormHandler = (e) => {
    setOpenForm(!openForm);
  };

  const editCv = (id, name, description, file) => {
    setEditItem({ id: id, name: name, description: description, file: file });
    setIsEditMode(true);
    setOpenForm(true);
  };

  //display files on init
  useEffect(async () => {
    await dispatch(getAllCvs());
  }, []);

  const cvItems = items.map((cv) => (
    <Cv
      key={cv.id}
      id={cv.id}
      name={cv.name}
      description={cv.description}
      type={cv.type}
      file={cv.file}
      editCv={editCv}
      deleteCv={deleteCv}
      // openFile={openFile}
    />
  ));

  return (
    <div
      className={clsx(classes.root, {
        [classes.expanded]: isSidePanelOpen,
      })}
    >
      <Container>
        <List>{cvItems}</List>
        <div className={classes.addButtonContainer}>
          {!openForm && <MyButton name='Add cv' theme='light' onClick={openFormHandler} />}
        </div>
        {openForm && (
          <Form
            mode={isEditMode ? 'edit' : 'new'}
            initName={editItem ? editItem.name : ''}
            initDescription={editItem ? editItem.description : ''}
            initFile={editItem ? editItem.file : null}
            saveCv={saveNewCv}
            deleteCv={deleteCv}
          />
        )}
        {/* {fileOpen && <DocViewer source={file} />} */}
      </Container>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(CvPanel);
