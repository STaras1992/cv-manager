import React, { useState, useEffect } from 'react';

import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { addNewCv, updateMyCv, deleteMyCv, getSelectedCv } from '../../actions/cvActions.js';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Container from '@material-ui/core/Container';
import clsx from 'clsx';

import Cv from './Cv/Cv.js';
import Form from './NewCvForm.js';
import DocViewer from '../common/DocViewer.js';
import MyButton from '../common/MyButton.js';
import { SIDE_PANEL_WIDTH_WIDE, SIDE_PANEL_WIDTH_SHORT, HEADER_MARGIN } from '../../consts/measures.js';
import styles from '../../styles/panelStyle.js';

const useStyles = makeStyles((theme) => ({
  // root: {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   justifyContent: 'flex-start',
  //   marginTop: HEADER_MARGIN,
  //   marginLeft: SIDE_PANEL_WIDTH_SHORT,
  //   '& .MuiListItem-root': {},
  //   // [theme.breakpoints.down('xs')]: {
  //   //   marginLeft: '70px',
  //   // },
  // },
  // expanded: {
  //   marginLeft: `calc(${SIDE_PANEL_WIDTH_WIDE}px + 10px)`,
  //   [theme.breakpoints.down('xs')]: {
  //     marginLeft: SIDE_PANEL_WIDTH_SHORT,
  //   },
  // },
}));

const CvPanel = ({ classes }) => {
  console.log('render');
  // const classes = useStyles(useStyles());
  const dispatch = useDispatch();
  const items = useSelector((state) => [...state.cv.items], shallowEqual);
  const isSidePanelOpen = useSelector((state) => state.options.isSidePanelOpen);
  const file = useSelector((state) => state.cv.selectedItem.file);
  const [fileOpen, setFileOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  const saveNewCv = (data) => {
    dispatch(addNewCv(data));
  };

  const deleteCv = (id) => {
    dispatch(deleteMyCv(id));
  };

  const openFile = async (id) => {
    await dispatch(getSelectedCv(id));
    if (file !== null) {
      setFileOpen(true);
    }
  };

  const openFormHandler = (e) => {
    setOpenForm(!openForm);
  };

  useEffect(async () => {
    await dispatch(updateMyCv());
  }, []);

  const cvItems = items.map((cv) => (
    <Cv
      key={cv.id}
      id={cv.id}
      name={cv.name}
      description={cv.description}
      type={cv.type}
      file={cv.file}
      deleteCv={deleteCv}
      openFile={openFile}
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
        {!openForm && <MyButton name='Add cv' theme='light' onClick={openFormHandler} />}
        {openForm && <Form saveCv={saveNewCv} deleteCv={deleteCv} />}
        {/* {fileOpen && <DocViewer source={file} />} */}
      </Container>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(CvPanel);
