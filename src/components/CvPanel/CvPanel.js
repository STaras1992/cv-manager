import React, { useState, useEffect } from 'react';

import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { addNewCv, getAllCvs, deleteMyCv, editMyCv, setError } from '../../actions/cvActions.js';

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
import ConfirmDialog from '../common/ConfirmDialog.js';

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
  const showError = useSelector((state) => state.options.showError);
  const successResponse = useSelector((state) => state.cv.responseStatusSuccess);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(0);

  const saveNewCv = async (name, description, file) => {
    //save edited instance
    if (isEditMode) {
      dispatch(editMyCv({ id: editItem.id, name: name, description: description, file: file }));
      // setIsEditMode(false);
      // setOpenForm(false);
      // setEditItem(null);
    }
    //save new instance
    else dispatch(addNewCv({ name: name, description: description, file: file }));
  };

  const deleteCv = (id) => {
    //setDeleteObject({ accept: true, id: id });
    setDeleteId(id);
    setOpenDialog(true);

    // dispatch(deleteMyCv(id));
  };

  const handleDialogOk = () => {
    dispatch(deleteMyCv(deleteId));
    setOpenDialog(false); //
  };

  const handleDialogCancel = () => {
    setOpenDialog(false);
  };

  const openFormHandler = (e) => {
    setOpenForm(true);
  };

  const closeFormHandler = (e) => {
    setOpenForm(false);
    setIsEditMode(false);
    setOpenForm(false);
    setEditItem(null);
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
    setShowSnackbar(false);
  };

  //display files on init
  useEffect(() => {
    dispatch(getAllCvs());
  }, []);

  /* Check api response for errors */
  useEffect(() => {
    // console.log('cv error:', requestError.message);
    if (isEditMode) {
      if (requestError.message === '') {
        setIsEditMode(false);
        setOpenForm(false);
        setEditItem(null);
      }
    }
    // if (requestError.message === null) {
    //   if (showSnackbar) setShowSnackbar(false);
    //   return;
    // }
    // if (requestError.message === '') closeFormHandler();
    // setShowSnackbar(true);
    // if (successResponse && openForm) closeFormHandler();
  }, [requestError]);

  // useEffect(() => {
  //   // console.log('succesResponse', successResponse);
  //   if (successResponse && openForm) setOpenForm(false);
  //   // if (!successResponse && showError && !showSnackbar) setShowSnackbar(true);
  // }, [successResponse]);

  useEffect(() => {
    // console.log('showErrorCv', showError);
    // if (!showError && showSnackbar) setShowSnackbar(false);
    // if (showError && requestError) {
    //   !showSnackbar && setShowSnackbar(true);
    // }
    if (!successResponse && showError && !showSnackbar) setShowSnackbar(true);
  }, [showError]);

  // useEffect(() => {
  //   if (deleteObject.accept) {
  //     dispatch(deleteMyCv(deleteObject.id));
  //   }
  // }, [deleteObject]);

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
            initFile={editItem ? editItem.file : ''}
            mode={isEditMode ? 'edit' : 'new'}
            saveCv={saveNewCv}
            closeForm={closeFormHandler}
          />
        )}
        {/* {fileOpen && <DocViewer source={file} />} */}
      </Container>
      <Snackbar
        className={classes.snackbar}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        open={showSnackbar}
        autoHideDuration={3000}
        disableWindowBlurListener={true}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity='error'>
          {requestError.message}
        </Alert>
      </Snackbar>
      <ConfirmDialog
        open={openDialog}
        dialogTitle='Delete CV?'
        dialogText='Removing CV also will remove templates that use current CV item.'
        handleOk={handleDialogOk}
        handleClose={handleDialogCancel}
      />
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(CvPanel);
