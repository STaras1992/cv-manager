import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { LIME } from '../../consts/colors.js';

const PrivateRoute = ({ path, render }) => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  if (isLoggedIn === null) {
    return <CircularProgress style={{ color: LIME }} />;
  }

  return isLoggedIn ? <Route exact path={path} render={render} /> : <Redirect to='/login' />;
};

export default PrivateRoute;
