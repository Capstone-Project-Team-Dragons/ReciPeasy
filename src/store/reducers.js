import { combineReducers } from 'redux';
import {
  GOT_PAST_RECIPES_FROM_STORE,
  GOT_PAST_RECIPES,
  ADD_TO_PAST_RECIPES,
  GOT_WISHLIST_FROM_STORE,
  GOT_WISHLIST,
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  GET_CURRENT_USER,
  UPDATE_CURRENT_USER,
} from './actionCreators';

const initialState = {
  currentUser: {},
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
        let userObj = { id: action.userId, email: action.userEmail };
        return { ...state, currentUser: userObj };
      } else if (action.status === 'loggedOut')
        return { ...state, currentUser: {} };
    default:
      return state;
  }
}

// Past Recipes Reducer
function pastRecipesReducer(state = initialState, action) {
  switch (action.type) {
    case GOT_PAST_RECIPES_FROM_STORE:
      return state;
    case GOT_PAST_RECIPES:
      return { ...state, pastRecipes: action.pastRecipes };
    case ADD_TO_PAST_RECIPES:
      let recipeObj = {
        id: action.recipeId,
        title: action.recipeTitle,
        image: action.recipeImage,
      };
      return { ...state, pastRecipes: { ...state.pastRecipes, recipeObj } };
    default:
      return state;
  }
}

// Wish List Reducer
function wishListReducer(state = initialState, action) {
  switch (action.type) {
    case GOT_WISHLIST_FROM_STORE:
      return state;
    case GOT_WISHLIST:
      return { ...state, wishList: action.wishList };
    case ADD_TO_WISHLIST:
      let recipeObj = {
        id: action.recipeId,
        title: action.recipeTitle,
        image: action.recipeImage,
      };
      return { ...state, wishList: { ...state.wishList, recipeObj } };
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
