import { createStore, applyMiddleware } from 'redux';
//import { composeWithDevTools } from 'redux-devtools-extension';
//import axios from 'axios';
import rootReducer from './reducers';
//import loggingMiddleware from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger
//import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk

export default createStore(rootReducer);
