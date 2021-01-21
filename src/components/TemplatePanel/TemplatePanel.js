import React, { useState, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MyButton from '../common/MyButton.js';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import { getAllMyTemplates, editMyTemplate, addNewTemplate, deleteMyTemplate } from '../../actions/templateActions.js';
import clsx from 'clsx';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import panelStyle from '../../styles/panelStyle.js';
import Template from './Template/Template.js';
import TemplateForm from './TemplateForm.js';
import DocListItem from '../common/DocListItem.js';

const useStyles = makeStyles((theme) => ({
  root: {},
}));

function Alert(props) {
  return <MuiAlert elevation={6} style={{ fontSize: '30px' }} variant='filled' {...props} />;
}

const TemplatePanel = ({ classes }) => {
  //const classes = useStyles();
  const dispatch = useDispatch();
  const isSidePanelOpen = useSelector((state) => state.options.isSidePanelOpen);
  const isLoading = useSelector((state) => state.options.isLoading);
  const requestError = useSelector((state) => state.template.error);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const items = useSelector((state) => state.template.items);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [openForm, setOpenForm] = useState(false);

  const openFormHandler = (e) => {
    setOpenForm(true);
  };

  const saveTemplate = async (name, description, cv, cover) => {
    //save edited instance
    if (isEditMode) {
      await dispatch(editMyTemplate({ id: editItem.id, name: name, description: description, cv: cv, cover: cover }));
      setIsEditMode(false);
      setOpenForm(false);
      setEditItem(null);
    }
    //save new instance
    else dispatch(addNewTemplate({ name: name, description: description, cv: cv, cover: cover }));
  };

  const deleteTemplate = (id) => {
    dispatch(deleteMyTemplate(id));
  };

  const closeFormHandler = (e) => {
    resetFormInput();
    setOpenForm(false);
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
    setOpenSnackbar(false);
  };

  useEffect(() => {
    dispatch(getAllMyTemplates());
  }, []);

  useEffect(() => {
    if (requestError.message !== '') setOpenSnackbar(true);
  }, [requestError]);

  const templateItems = items.map((template) => (
    <DocListItem
      key={template.id}
      id={template.id}
      name={template.name}
      description={template.description}
      actions={['delete', 'edit']}
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
            mode={isEditMode ? 'edit' : 'new'}
            initName={editItem ? editItem.name : ''}
            initDescription={editItem ? editItem.description : ''}
            initCvId={editItem ? editItem.cv : ''}
            initCoverId={editItem ? editItem.cover : ''}
            saveTemplate={saveTemplate}
            closeForm={closeFormHandler}
            //deleteTemplate={deleteTemplate}
          />
        )}
      </Container>
      <Snackbar
        className={classes.snackbar}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity='error'>
          {requestError.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default withStyles(panelStyle, { withTheme: true })(TemplatePanel);
