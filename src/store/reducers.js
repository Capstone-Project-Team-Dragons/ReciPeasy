import { combineReducers } from 'redux';
import {
  GOT_PAST_RECIPES,
  ADD_TO_PAST_RECIPES,
  GOT_WISHLIST,
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  UPDATE_CURRENT_USER,
} from './actionCreators';

// Reducer
function usersReducer(currentUserId = null, action) {
  switch (action.type) {
    case UPDATE_CURRENT_USER:
      if (action.status === 'loggedIn') return action.userId;
      else if (action.status === 'loggedOut') return null;
    default:
      return currentUserId;
  }
}

const rootReducer = combineReducers({
  usersReducer,
  //pastRecipesReducer,
  //wishListReducers,
});

export default rootReducer;
