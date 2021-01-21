import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import cvReducer from './reducers/cvReducer.js';
import coverReducer from './reducers/coverReducer.js';
import templateReducer from './reducers/templateReducer.js';
import optionsReducer from './reducers/optionsReducer.js';
import userReducer from './reducers/userReducer.js';
import emailReducer from './reducers/emailReducer.js';

const reducers = combineReducers({
  cv: cvReducer,
  cover: coverReducer,
  template: templateReducer,
  options: optionsReducer,
  user: userReducer,
  email: emailReducer,
});

const Store = createStore(reducers, applyMiddleware(thunk));

window.store = Store;

export default Store;
