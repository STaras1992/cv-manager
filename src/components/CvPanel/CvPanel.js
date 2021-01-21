import React, { useState, useEffect } from 'react';

import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { addNewCv, getAllCvs, deleteMyCv, editMyCv } from '../../actions/cvActions.js';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Container from '@material-ui/core/Container';
import clsx from 'clsx';
import CircularProgress from '@material-ui/core/CircularProgress';
import Cv from './Cv/Cv.js';
import CvForm from './CvForm.js';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import DocViewer from '../common/DocViewer.js';
import MyButton from '../common/MyButton.js';
import { SIDE_PANEL_WIDTH_WIDE, SIDE_PANEL_WIDTH_SHORT, HEADER_MARGIN } from '../../consts/measures.js';
import styles from '../../styles/panelStyle.js';
import DocListItem from '../common/DocListItem.js';

const useStyles = makeStyles((theme) => ({}));

function Alert(props) {
  return <MuiAlert elevation={6} style={{ fontSize: '30px' }} variant='filled' {...props} />;
}

const CvPanel = ({ classes }) => {
  const myClasses = useStyles();
  const dispatch = useDispatch();
  const items = useSelector((state) => [...state.cv.items], shallowEqual);
  const isSidePanelOpen = useSelector((state) => state.options.isSidePanelOpen);
  const isLoading = useSelector((state) => state.options.isLoading);
  const requestError = useSelector((state) => state.cv.error);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [openForm, setOpenForm] = useState(false);

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

  const openFormHandler = (e) => {
    setOpenForm(true); //!openForm
  };

  const closeFormHandler = (e) => {
    setOpenForm(false);
  };

  // const editCv = (id, name, description, file) => {
  const editCv = (id) => {
    const item = items.find((item) => item.id === id);
    setEditItem(item);
    // setEditItem({ id: id, name: name, description: description, file: file });
    setIsEditMode(true);
    setOpenForm(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  //display files on init
  useEffect(async () => {
    await dispatch(getAllCvs());
  }, []);

  /*If error response received from api*/
  useEffect(() => {
    console.log('requestError');
    if (requestError.message !== '') setOpenSnackbar(true);
  }, [requestError]);

  const cvItems = items.map((cv) => (
    <DocListItem
      key={cv.id}
      id={cv.id}
      name={cv.name}
      description={cv.description}
      type={cv.type}
      file={cv.file}
      actions={['delete', 'edit', 'open']}
      onEdit={editCv}
      onDelete={deleteCv}
    />

    // <Cv
    //   key={cv.id}
    //   id={cv.id}
    //   name={cv.name}
    //   description={cv.description}
    //   type={cv.type}
    //   file={cv.file}
    //   editCv={editCv}
    //   deleteCv={deleteCv}
    //   // openFile={openFile}
    // />
  ));

  return (
    <div
      className={clsx(classes.root, {
        [classes.expanded]: isSidePanelOpen,
      })}
    >
      <Container>
        <List>{cvItems}</List>
        <div className={clsx(classes.loading, { [classes.hide]: !isLoading })}>
          <CircularProgress />
        </div>
        <div className={classes.addButtonContainer}>
          {!openForm && <MyButton name='Add cv' theme='light' onClick={openFormHandler} />}
        </div>
        {openForm && (
          <CvForm
            initName={editItem ? editItem.name : ''}
            initDescription={editItem ? editItem.description : ''}
            initFile={editItem ? editItem.description : ''}
            mode={isEditMode ? 'edit' : 'new'}
            saveCv={saveNewCv}
            closeForm={closeFormHandler}
          />
        )}
        {/* {fileOpen && <DocViewer source={file} />} */}
      </Container>
      <Snackbar
        className={classes.snackbar}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity='error'>
          {requestError.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(CvPanel);
