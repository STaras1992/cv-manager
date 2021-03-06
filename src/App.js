import './App.css';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Nav from './components/Nav/Nav.js';
import CvPanel from './components/CvPanel/CvPanel.js';
import CoverPanel from './components/CoverPanel/CoverPanel.js';
import TemplatePanel from './components/TemplatePanel/TemplatePanel.js';
import SendMailPage from './components/SendMailPage/SendMailPage.js';
import HomePage from './components/HomePage/HomePage.js';
import SignUp from './components/SignUp/SignUp.js';
import Login from './components/Login/Login.js';
import { checkAuth } from './actions/userActions.js';
import PrivateRoute from './components/common/PrivateRoute.js';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  return (
    <div className='app'>
      <Nav />
      <Switch>
        <Route exact path='/' render={(routeParams) => <HomePage {...routeParams} />} />
        <Route exact path='/signup' render={(routeParams) => <SignUp {...routeParams} />} />
        <Route exact path='/login' render={(routeParams) => <Login {...routeParams} />} />
        <PrivateRoute exact path='/cv' render={(routeParams) => <CvPanel {...routeParams} />} />
        <PrivateRoute exact path='/cover' render={(routeParams) => <CoverPanel {...routeParams} />} />
        <PrivateRoute exact path='/template' render={(routeParams) => <TemplatePanel {...routeParams} />} />
        <PrivateRoute exact path='/email' render={(routeParams) => <SendMailPage {...routeParams} />} />
      </Switch>
    </div>
  );
};

export default App;
