import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import cvReducer from './reducers/cvReducer.js';
import coverReducer from './reducers/coverReducer.js';
import templateReducer from './reducers/templateReducer.js';

const reducers = combineReducers({ cv: cvReducer, cover: coverReducer, template: templateReducer });

const Store = createStore(reducers, applyMiddleware(thunk));

window.store = Store;

export default Store;
