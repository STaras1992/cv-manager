import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom';
import MuiLink from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import * as yup from 'yup';
import clsx from 'clsx';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import MyButton from '../common/MyButton.js';
import { FormInput } from '../common/FormInputLogin.js';
import { MAX_NAME_LENGTH, MAX_DESCRIPTION_LENGTH } from '../../consts/measures.js';
import { FILE_FORMATS } from '../../consts/structs.js';
import { LIGHT_BLUE, DARK_BLUE, LIGHT, DARK, RED_ERROR, GREEN_SUCCESS } from '../../consts/colors.js';
import { HEADER_MARGIN, SIDE_PANEL_WIDTH_SHORT, SIDE_PANEL_WIDTH_WIDE } from '../../consts/measures.js';
import styles from '../../styles/panelStyle.js';
import { login } from '../../actions/userActions.js';

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <MuiLink color='inherit' href='http://18.193.76.149/' rel='noopener noreferrer' target='_blank'>
        Stas Tarasenko
      </MuiLink>
      &nbsp;
      {new Date().getFullYear()}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    background: 'white',
    marginTop: HEADER_MARGIN,
    paddingLeft: SIDE_PANEL_WIDTH_SHORT,
    paddingRight: SIDE_PANEL_WIDTH_SHORT,
    [theme.breakpoints.down('sm')]: {
      //   paddingLeft: SIDE_PANEL_WIDTH_SHORT,
      //   paddingRight: SIDE_PANEL_WIDTH_SHORT,
    },
    [theme.breakpoints.down('xs')]: {
      paddingLeft: SIDE_PANEL_WIDTH_SHORT + 20,
      paddingRight: 20,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    //width: '100%',
    marginTop: theme.spacing(3),
    '& a': {
      textDecoration: 'none',
    },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const schema = yup.object().shape({
  email: yup.string().required('Email adress is required').email('Bad email adress'),
  password: yup
    .string()
    .required('Password is required')
    .test('len', `Must be at least 8 characters`, (val) => val.length >= 8),
});

const Login = (props) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const formObject = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const { handleSubmit, reset, controll, register, errors, clearErrors } = formObject;

  const onSubmit = (data) => {
    dispatch(login(data));
  };

  useEffect(() => {
    isLoggedIn && props.history.push('/');
  }, [isLoggedIn]);

  return (
    <FormProvider {...formObject}>
      <Container className={classes.root} component='main' maxWidth='sm'>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <FormInput name='email' label='Email' required={true} defaultValue={''} errorobj={errors} />
            <FormInput name='password' label='Password' required={true} defaultValue={''} errorobj={errors} />
            <FormControlLabel control={<Checkbox value='remember' color='primary' />} label='Remember me' />
            <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to='/' variant='body2'>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to='/signup' variant='body2'>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </FormProvider>
  );
};

export default Login;
