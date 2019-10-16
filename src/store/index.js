import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { combineReducers } from 'redux';

import usersReducer from './usersReducer';
import pastRecipesReducer from './pastRecipesReducer';
import wishListReducer from './wishListReducer';

const rootReducer = combineReducers({
  usersReducer,
  pastRecipesReducer,
  wishListReducer,
});

export default createStore(rootReducer, applyMiddleware(thunkMiddleware));
