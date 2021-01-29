import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cover from './Cover/Cover.js';
import { withStyles } from '@material-ui/core/styles';
import { addNewCover, getAllCovers, deleteMyCover, editMyCover } from '../../actions/coverActions.js';
import { showErrorOff } from '../../actions/optionsActions.js';
import Container from '@material-ui/core/Container';
import MyButton from '../common/MyButton.js';
import clsx from 'clsx';
import CoverForm from './CoverForm.js';
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from '../../styles/panelStyle.js';
import ConfirmDialog from '../common/ConfirmDialog.js';
import { LTR, EDIT_MODE, NEW_MODE } from '../../consts/strings.js';
import Alert from '../common/Alert.js';

const CoverPanel = ({ classes }) => {
  const dispatch = useDispatch();

  const items = useSelector((state) => state.cover.items);
  const isSidePanelOpen = useSelector((state) => state.options.isSidePanelOpen);
  const isLoading = useSelector((state) => state.options.isLoading);
  const requestError = useSelector((state) => state.cover.error);
  const showError = useSelector((state) => state.options.showError);
  const successResponse = useSelector((state) => state.cover.responseStatusSuccess);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [coverExpanded, setCoverExpanded] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(0);

  const handleChange = (id) => (event, newExpanded) => {
    setCoverExpanded(newExpanded ? id : null);
  };

  const openFormHandler = () => {
    setOpenForm(true);
  };

  const closeFormHandler = () => {
    setOpenForm(false);
    setIsEditMode(false);
    setOpenForm(false);
    setEditItem(null);
  };

  const saveCover = async (name, content, direction) => {
    if (isEditMode) {
      dispatch(editMyCover({ id: editItem.id, name: name, content: content, direction: direction }));
    } else dispatch(addNewCover({ name: name, content: content, direction: direction }));
  };

  const deleteCover = (id) => {
    setDeleteId(id);
    setOpenDialog(true);
    // dispatch(deleteMyCover(id));
  };

  const handleDialogOk = () => {
    dispatch(deleteMyCover(deleteId));
    setOpenDialog(false);
  };

  const handleDialogCancel = () => {
    setOpenDialog(false);
  };

  const editCover = (id, name, content, direction) => {
    setEditItem({ id: id, name: name, content: content, direction: direction });
    setIsEditMode(true);
    setOpenForm(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowSnackbar(false);
  };

  //display my files on init
  useEffect(() => {
    dispatch(getAllCovers());
  }, []);

  useEffect(() => {
    if (isEditMode) {
      if (requestError.message === '') {
        setIsEditMode(false);
        setOpenForm(false);
        setEditItem(null);
      }
    }
  }, [requestError]);

  useEffect(() => {
    if (!successResponse && showError && !showSnackbar) setShowSnackbar(true);
    dispatch(showErrorOff);
  }, [showError]);

  let covers = items.map((cover) => (
    <Cover
      key={cover.id}
      id={cover.id}
      name={cover.name}
      content={cover.content}
      direction={cover.direction}
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
        <div className={clsx(classes.loading, { [classes.hide]: !isLoading })}>
          <CircularProgress />
        </div>
        <div className={classes.addButtonContainer}>
          {!openForm && <MyButton name='Add cover' theme='light' onClick={openFormHandler} />}
        </div>
        {openForm && (
          <CoverForm
            initName={editItem ? editItem.name : ''}
            initContent={editItem ? editItem.content : ''}
            initDirection={editItem ? editItem.direction : LTR}
            mode={isEditMode ? EDIT_MODE : NEW_MODE}
            saveCover={saveCover}
            closeForm={closeFormHandler}
          />
        )}
      </Container>
      <Snackbar
        className={classes.snackbar}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        open={showSnackbar}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={'error'}>
          {requestError.message}
        </Alert>
      </Snackbar>
      <ConfirmDialog
        open={openDialog}
        dialogTitle='Delete Cover?'
        dialogText='Removing Cover also will remove templates that use current cover item.'
        handleOk={handleDialogOk}
        handleClose={handleDialogCancel}
      />
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(CoverPanel);
