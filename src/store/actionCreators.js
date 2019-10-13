import db from '../api/db/database';

// ACTION TYPES
export const GOT_PAST_RECIPES = 'GOT_PAST_RECIPES';
export const ADD_TO_PAST_RECIPES = 'ADD_TO_PAST_RECIPES';

export const GOT_WISHLIST = 'GOT_WISHLIST';
export const ADD_TO_WISHLIST = 'ADD_TO_WISHLIST';
export const REMOVE_FROM_WISHLIST = 'REMOVE_FROM_WISHLIST';

export const GET_CURRENT_USER = 'GET_CURRENT_USER';
export const UPDATE_CURRENT_USER = 'UPDATE_CURRENT_USER';

// ACTION CREATORS
export const getPastRecipes = pastRecipes => {
  return {
    type: GOT_PAST_RECIPES,
    pastRecipes,
  };
};

export const addToPastRecipes = (
  userId,
  recipeId,
  recipeTitle,
  recipeImage
) => {
  return {
    type: ADD_TO_PAST_RECIPES,
    userId,
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

export const addToWishList = (
  userId, recipeId, recipeTitle, recipeImage) => {
  return {
    type: ADD_TO_WISHLIST,
    userId,
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

export const getCurrentUser = () => {
  return {
    type: GET_CURRENT_USER,
  };
};
export const updateCurrentUser = (userId, userEmail, status) => {
  return {
    type: UPDATE_CURRENT_USER,
    userId,
    userEmail,
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
            pastRecipesObj[`${doc.id}`] = doc.data();
          });
        });
      dispatch(getPastRecipes(pastRecipesObj));
    } catch (error) {
      console.log('Error!', error);
    }
  };
};

export const addToPastRecipesThunk = (
  userId,
  recipeId,
  recipeTitle,
  recipeImage
) => {
  return async function(dispatch) {
    try {
      let recipeObj = { id: recipeId, title: recipeTitle, image: recipeImage };
      await db
        .collection('users')
        .doc(`${userId}`)
        .collection('pastRecipes')
        .doc(`${recipeId}`)
        .set(recipeObj);
      dispatch(addToPastRecipes(userId, recipeId, recipeTitle, recipeImage));
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
            wishListObj[`${doc.id}`] = doc.data();
          });
        });
      dispatch(getWishList(wishListObj));
    } catch (error) {
      console.log('Error!', error);
    }
  };
};

export const addToWishListThunk = (
  userId,
  recipeId,
  recipeTitle,
  recipeImage
) => {
  return async function(dispatch) {
    try {
      let recipeObj = { id: recipeId, title: recipeTitle, image: recipeImage };
      await db
        .collection('users')
        .doc(`${userId}`)
        .collection('wishList')
        .doc(`${recipeId}`)
        .set(recipeObj);
      dispatch(addToWishList(userId, recipeId, recipeTitle, recipeImage));
    } catch (error) {
      console.log('Error!', error);
    }
  };
};
