import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Link } from 'react-router-dom';
import MuiLink from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';
import { FormInput } from '../common/FormInputLogin.js';
import { RED_ERROR } from '../../consts/colors.js';
import { HEADER_MARGIN, SIDE_PANEL_WIDTH_SHORT } from '../../consts/measures.js';
import { signup } from '../../actions/userActions.js';

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <MuiLink color='inherit' href='http://18.193.76.149/'>
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
  errorMessage: {
    margin: 0,
    padding: 0,
    fontSize: '18px',
    color: RED_ERROR,
  },
}));

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required('Required field')
    .test('len', `Must be less than 20 characters`, (val) => val.length <= 20),
  lastName: yup
    .string()
    .required('Required field')
    .test('len', `Must be less than 20 characters`, (val) => val.length <= 20),
  email: yup.string().required('Email adress is required').email('Bad email adress'),
  password: yup
    .string()
    .required('Password is required')
    .test('len', `Must be at least 8 characters`, (val) => val.length >= 8),
});

const SignUp = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const error = useSelector((state) => state.user.signUpError);
  const [showError, setShowError] = useState(false);

  const formObject = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  });

  const { handleSubmit, errors } = formObject;

  const onSubmit = async (data) => {
    setShowError(false);
    dispatch(signup(data));
  };

  useEffect(() => {
    isLoggedIn && props.history.push('/');
  }, [isLoggedIn]);

  useEffect(() => {
    if (error.message && error.message !== '') setShowError(true);
    else setShowError(false);
  }, [error]);

  return (
    <FormProvider {...formObject}>
      <Container className={classes.root} component='main' maxWidth='sm'>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign up
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormInput name='firstName' label='First Name' required={true} defaultValue={''} errorobj={errors} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormInput name='lastName' label='Last Name' required={true} defaultValue={''} errorobj={errors} />
              </Grid>
              <Grid item xs={12}>
                <FormInput name='email' label='Email' required={true} defaultValue={''} errorobj={errors} />
              </Grid>
              <Grid item xs={12}>
                <FormInput name='password' label='Password' required={true} defaultValue={''} errorobj={errors} />
              </Grid>

              <Grid item xs={12}>
                {showError && <p className={classes.errorMessage}>{error.message}</p>}
              </Grid>
            </Grid>
            <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
              Sign Up
            </Button>
            <Grid container justify='flex-end'>
              <Grid item>
                <Link to='/login' variant='body2'>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </FormProvider>
  );
};

export default SignUp;
