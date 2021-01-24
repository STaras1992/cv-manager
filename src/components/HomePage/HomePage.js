import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MyButton from '../common/MyButton.js';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from '../../styles/panelStyle.js';
import IconButton from '@material-ui/core/IconButton';
import HorizontalCard from '../common/HorizontalCard.js';
import { Link } from 'react-router-dom';
import ApplyIcon from '@material-ui/icons/PlayCircleFilled';
import SendIcon from '@material-ui/icons/Send';
import { LIGHT_BLUE, DARK_BLUE, LIGHT, DARK, GREEN_SUCCESS, LIME } from '../../consts/colors.js';
import cvImage from '../../images/cv2.jpeg';
import coverImage from '../../images/cover1.jpeg';
import templateImage from '../../images/template1.jpg';
import ConfirmDialog from '../common/ConfirmDialog.js';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
    padding: 0,
  },
  title: {
    '& .MuiTypography-root': {
      fontFamily: 'Anton, sans-serif',
      color: LIME,
      [theme.breakpoints.down('sm')]: {
        fontSize: '60px',
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: '40px',
      },
    },
  },
  subTitle: {
    width: '100%',
    paddingLeft: '50%',

    '& .MuiTypography-root': {
      fontFamily: 'Abril Fatface, cursive',
      color: LIGHT_BLUE,
    },
    [theme.breakpoints.down('sm')]: {
      '& .MuiTypography-root': {
        fontSize: '34px',
      },
    },
    [theme.breakpoints.down('xs')]: {
      width: 'auto',
      paddingLeft: 0,
      '& .MuiTypography-root': {
        fontSize: '28px',
      },
    },
  },
  contentContainer: {
    marginTop: '70px',
    marginBottom: '50px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    margin: '1vw 0',
    display: 'flex',
    justifyContent: 'center',
    '& .MuiPaper-root': {
      backgroundColor: LIGHT,
    },
  },
  cvCard: {
    paddingRight: '10vw',
    [theme.breakpoints.down('xs')]: {
      padding: 0,
    },
  },
  coverCard: {
    paddingLeft: '10vw',
    [theme.breakpoints.down('xs')]: {
      padding: 0,
    },
  },
  templateCard: {
    paddingRight: '10vw',
    [theme.breakpoints.down('xs')]: {
      padding: 0,
    },
  },
  actionButtonsContainer: {
    margin: '50px 0',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  actionButton: {
    marginBottom: '50px',
    '& a': {
      textDecoration: 'none',
    },
  },
  sendMailButton: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    margin: '50px 0',
    padding: '0 120px',
  },
  applyJobContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '50px',
    color: LIME,
    fontSize: '36px',
    [theme.breakpoints.down('xs')]: {
      fontSize: '28px',
    },
  },
  applyIcon: {
    '& svg': {
      marginLeft: '7px',
      color: 'white',
      fontSize: '50px',
      transition: 'all 0.5s ease-in-out',
      '&:hover': {
        transform: 'scale(1.5)',
        transformOrigin: '50% 50%',
        color: GREEN_SUCCESS,
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: '42px',
      },
    },
  },
}));

const HomePage = ({ classes }) => {
  const myClasses = useStyles();
  const dispatch = useDispatch();

  const isSidePanelOpen = useSelector((state) => state.options.isSidePanelOpen);
  const isLoading = useSelector((state) => state.options.isLoading);

  // useEffect(() => {
  //   dispatch(checkAuth());
  // }, []);

  return (
    <div
      className={clsx(classes.root, {
        [classes.expanded]: isSidePanelOpen,
      })}
    >
      <Container className={myClasses.root} maxWidth='lg'>
        <div className={myClasses.title}>
          <Typography variant='h1' color='secondary'>
            CV Manager
          </Typography>
        </div>
        <div className={myClasses.subTitle}>
          <Typography variant='h4' color='secondary'>
            By Stas Tarasenko
          </Typography>
        </div>
        <div className={myClasses.contentContainer}>
          <div className={clsx(myClasses.cvCard, myClasses.card)}>
            <HorizontalCard
              title='Cv storage'
              text='Manage your CV files.Accesable storage from any place.Just upload CV document,give him unique name and be sure you can apply for your next job at any moment'
              image={cvImage}
            />
          </div>
          <div className={clsx(myClasses.coverCard, myClasses.card)}>
            <HorizontalCard
              title='Cover letter'
              text='Write and manage your own email cover letters for specific job types.Use html editor for ensure good looking email content'
              image={coverImage}
            />
          </div>
          <div className={clsx(myClasses.templateCard, myClasses.card)}>
            <HorizontalCard
              title='Templates'
              text='Connect your CV documents with created cover letters in unique templates for fast and easy job apply and abbility to edit the content at any point.'
              image={templateImage}
            />
          </div>
        </div>
        <div className={myClasses.actionButtonsContainer}>
          <div className={myClasses.actionButton}>
            <Link to={'/cv'}>
              <MyButton styles={{ width: '220px' }} name='My CV' theme='light' type='button' />
            </Link>
          </div>
          <div className={myClasses.actionButton}>
            <Link to={'/cover'}>
              <MyButton styles={{ width: '220px' }} name='My cover letters' theme='light' type='button' />
            </Link>
          </div>
          <div className={myClasses.actionButton}>
            <Link to={'/template'}>
              <MyButton styles={{ width: '220px' }} name='My templates' theme='light' type='button' />
            </Link>
          </div>
        </div>
        <div className={myClasses.applyJobContainer}>
          <span style={{ color: 'white' }}>Apply for a job </span>
          <IconButton component={Link} to='/email' className={myClasses.applyIcon}>
            <ApplyIcon />
          </IconButton>
        </div>
      </Container>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(HomePage);
