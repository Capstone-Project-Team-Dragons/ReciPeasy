import db from '../api/db/database';

// ACTION TYPES
export const GOT_PAST_RECIPES = 'GOT_PAST_RECIPES';
export const ADD_TO_PAST_RECIPES = 'ADD_TO_PAST_RECIPES';

export const GOT_WISHLIST = 'GOT_WISHLIST';
export const ADD_TO_WISHLIST = 'ADD_TO_WISHLIST';
export const REMOVE_FROM_WISHLIST = 'REMOVE_FROM_WISHLIST';

export const UPDATE_CURRENT_USER = 'UPDATE_CURRENT_USER';

// ACTION CREATORS
export const getPastRecipes = pastRecipes => {
  return {
    type: GOT_PAST_RECIPES,
    pastRecipes,
  };
};

export const addToPastRecipes = (recipeId, recipeTitle, recipeImage) => {
  return {
    type: ADD_TO_PAST_RECIPES,
    recipeId,
    recipeTitle,
    recipeImage,
  };
};

export const getWishList = wishList => {
  return {
    type: GOT_WISHLIST,
    wishList,
  };
};

export const addToWishList = (recipeId, recipeTitle, recipeImage) => {
  return {
    type: ADD_TO_WISHLIST,
    recipeId,
    recipeTitle,
    recipeImage,
  };
};

export const removeFromWishList = recipeId => {
  return {
    type: REMOVE_FROM_WISHLIST,
    recipeId,
  };
};

export const updateCurrentUser = (userId, status) => {
  return {
    type: UPDATE_CURRENT_USER,
    userId,
    status,
  };
};

// THUNK CREATORS
export const getPastRecipesThunk = userId => {
  return async function(dispatch) {
    try {
      let pastRecipesObj = {};
      await db
        .collection('users')
        .doc(`${userId}`)
        .collection('pastRecipes')
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            //console.log(doc.id, '=>', doc.data());
            pastRecipesObj[`${doc.id}`] = doc.data();
          });
        });
      dispatch(getPastRecipes(pastRecipesObj));
    } catch (error) {
      console.log('Error!', error);
    }
  };
};

export const getWishListThunk = userId => {
  return async function(dispatch) {
    try {
      let wishListObj = {};
      await db
        .collection('users')
        .doc(`${userId}`)
        .collection('wishList')
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            //console.log(doc.id, '=>', doc.data());
            wishListObj[`${doc.id}`] = doc.data();
          });
        });
      dispatch(getWishList(wishListObj));
    } catch (error) {
      console.log('Error!', error);
    }
  };
};
