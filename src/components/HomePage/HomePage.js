import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MyButton from '../common/MyButton.js';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from '../../styles/panelStyle.js';

const useStyles = makeStyles((theme) => ({
  root: {},
  titleContainer: {
    color: 'white',
  },
}));

const HomePage = ({ classes }) => {
  const myClasses = useStyles();
  const dispatch = useDispatch();

  const isSidePanelOpen = useSelector((state) => state.options.isSidePanelOpen);
  const isLoading = useSelector((state) => state.options.isLoading);

  return (
    <div
      className={clsx(classes.root, {
        [classes.expanded]: isSidePanelOpen,
      })}
    >
      <Container maxWidth='lg'>
        <div className={myClasses.titleContainer}>
          <Typography variant='h1' color='secondary'>
            CV Manager
          </Typography>
          <Typography variant='h3' color='secondary'>
            By Stas Tarasenko
          </Typography>
        </div>
        <div>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
      </Container>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(HomePage);
