import React, { useEffect } from 'react';
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
import CircularProgress from '@material-ui/core/CircularProgress';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';
import { FormInput } from '../common/FormInputLogin.js';
import { RED_ERROR, LIGHT_BLUE } from '../../consts/colors.js';
import clsx from 'clsx';
import { HEADER_MARGIN, SIDE_PANEL_WIDTH_SHORT } from '../../consts/measures.js';
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
    fontSize: '17px',
    color: RED_ERROR,
  },
  loading: {
    textAlign: 'center',
    '& svg': {
      color: LIGHT_BLUE,
    },
  },
  hide: {
    display: 'none',
    // visibility: 'hidden',
  },
}));

const schema = yup.object().shape({
  email: yup.string().required('Email adress is required'),
  password: yup.string().required('Password is required'),
});

const Login = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.options.isLoading);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const error = useSelector((state) => state.user.loginError);

  const formObject = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  });

  const { handleSubmit, errors } = formObject;

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
            <FormInput
              name='password'
              label='Password'
              required={true}
              defaultValue={''}
              errorobj={errors}
              autoComplete='off'
            />
            <div>
              <p className={clsx(classes.errorMessage, { [classes.hide]: isLoading })}>{error.message}</p>
            </div>
            <div className={clsx(classes.loading, { [classes.hide]: !isLoading })}>
              <CircularProgress />
            </div>
            {/* <FormControlLabel control={<Checkbox value='remember' color='primary' />} label='Remember me' /> */}
            <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                {/* <Link to='/' variant='body2'>
                  Forgot password?
                </Link> */}
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
