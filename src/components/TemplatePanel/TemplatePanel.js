import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MyButton from '../common/MyButton.js';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import { getAllMyTemplates, editMyTemplate, addNewTemplate, deleteMyTemplate } from '../../actions/templateActions.js';
import clsx from 'clsx';
import Snackbar from '@material-ui/core/Snackbar';
import panelStyle from '../../styles/panelStyle.js';
import TemplateForm from './TemplateForm.js';
import DocListItem from '../common/DocListItem.js';
import ConfirmDialog from '../common/ConfirmDialog.js';
import { EDIT, DELETE, EDIT_MODE, NEW_MODE } from '../../consts/strings.js';
import Alert from '../common/Alert.js';
import { showErrorOff } from '../../actions/optionsActions.js';

const TemplatePanel = ({ classes }) => {
  const dispatch = useDispatch();
  const isSidePanelOpen = useSelector((state) => state.options.isSidePanelOpen);
  const isLoading = useSelector((state) => state.options.isLoading);
  const requestError = useSelector((state) => state.template.error);
  const showError = useSelector((state) => state.options.showError);
  const successResponse = useSelector((state) => state.template.responseStatusSuccess);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const items = useSelector((state) => state.template.items);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(0);

  const openFormHandler = (e) => {
    setOpenForm(true);
  };

  const saveTemplate = async (name, description, cv, cover) => {
    //save edited instance
    if (isEditMode) {
      dispatch(editMyTemplate({ id: editItem.id, name: name, description: description, cv: cv, cover: cover }));
    }
    //save new instance
    else dispatch(addNewTemplate({ name: name, description: description, cv: cv, cover: cover }));
  };

  const deleteTemplate = (id) => {
    setDeleteId(id);
    setOpenDialog(true);
  };

  const handleDialogOk = () => {
    dispatch(deleteMyTemplate(deleteId));
  };

  const handleDialogCancel = () => {
    setOpenDialog(false);
  };

  const closeFormHandler = (e) => {
    setOpenForm(false);
    resetFormInput();
  };

  const editTemplate = (id) => {
    const item = items.find((item) => item.id === id);
    setEditItem(item);
    setIsEditMode(true);
    setOpenForm(true);
  };

  const resetFormInput = () => {
    setIsEditMode(false);
    setEditItem(null);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowSnackbar(false);
  };

  useEffect(() => {
    dispatch(getAllMyTemplates());
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

  const templateItems = items.map((template) => (
    <DocListItem
      key={template.id}
      id={template.id}
      name={template.name}
      description={template.description}
      actions={[DELETE, EDIT]}
      onEdit={editTemplate}
      onDelete={deleteTemplate}
    />
  ));

  return (
    <div
      className={clsx(classes.root, {
        [classes.expanded]: isSidePanelOpen,
      })}
    >
      <Container>
        <List>{templateItems}</List>
        <div className={clsx(classes.loading, { [classes.hide]: !isLoading })}>
          <CircularProgress />
        </div>
        <div className={classes.addButtonContainer}>
          {!openForm && <MyButton name='Add template' theme='light' onClick={openFormHandler} />}
        </div>
        {openForm && (
          <TemplateForm
            mode={isEditMode ? EDIT_MODE : NEW_MODE}
            initName={editItem ? editItem.name : ''}
            initDescription={editItem ? editItem.description : ''}
            initCvId={editItem ? editItem.cv : ''}
            initCoverId={editItem ? editItem.cover : ''}
            saveTemplate={saveTemplate}
            closeForm={closeFormHandler}
          />
        )}
      </Container>
      <Snackbar
        className={classes.snackbar}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        open={showSnackbar}
        autoHideDuration={3500}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={'error'}>
          {requestError.message}
        </Alert>
      </Snackbar>
      <ConfirmDialog
        open={openDialog}
        dialogTitle='Delete Template?'
        dialogText='Template will not be available more'
        handleOk={handleDialogOk}
        handleClose={handleDialogCancel}
      />
    </div>
  );
};

export default withStyles(panelStyle, { withTheme: true })(TemplatePanel);
