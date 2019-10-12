import { combineReducers } from 'redux';
import {
  GOT_PAST_RECIPES,
  ADD_TO_PAST_RECIPES,
  GOT_WISHLIST,
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  GET_CURRENT_USER,
  UPDATE_CURRENT_USER,
} from './actionCreators';

const initialState = {
  currentUserId: '',
  pastRecipes: {},
  wishList: {},
};

// Users Reducer
function usersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CURRENT_USER:
      return state;
    case UPDATE_CURRENT_USER:
      if (action.status === 'loggedIn') {
        return { ...state, currentUserId: action.userId };
      } else if (action.status === 'loggedOut')
        return { ...state, currentUserId: '' };
    default:
      return state;
  }
}

// Past Recipes Reducer
function pastRecipesReducer(state = initialState, action) {
  switch (action.type) {
    case GOT_PAST_RECIPES:
      return { ...state, pastRecipes: action.pastRecipes };
    default:
      return state;
  }
}

// Wish List Reducer
function wishListReducer(state = initialState, action) {
  switch (action.type) {
    case GOT_WISHLIST:
      return { ...state, wishList: action.wishList };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  usersReducer,
  pastRecipesReducer,
  wishListReducer,
});

export default rootReducer;
