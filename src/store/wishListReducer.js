import db from '../api/db/database';

// ACTION TYPES
export const GET_WISHLIST_FROM_STORE = 'GET_WISHLIST_FROM_STORE';
export const CLEAR_WISHLIST_FROM_STORE = 'CLEAR_WISHLIST_FROM_STORE';
export const GOT_WISHLIST = 'GOT_WISHLIST';
export const ADD_TO_WISHLIST = 'ADD_TO_WISHLIST';
export const REMOVE_FROM_WISHLIST = 'REMOVE_FROM_WISHLIST';

// ACTION CREATORS
export const getWishListFromStore = () => {
  return {
    type: GET_WISHLIST_FROM_STORE,
  };
};

export const clearWishListFromStore = () => {
  return {
    type: CLEAR_WISHLIST_FROM_STORE,
  };
};

export const gotWishList = wishList => {
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

// THUNK CREATORS
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
      dispatch(gotWishList(Object.values(wishListObj)));
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
      dispatch(addToWishList(recipeId, recipeTitle, recipeImage));
    } catch (error) {
      console.log('Error!', error);
    }
  };
};

export const removeFromWishListThunk = (userId, recipeId) => {
  return async function(dispatch) {
    await db
      .collection('users')
      .doc(`${userId}`)
      .collection('wishList')
      .doc(`${recipeId}`)
      .delete()
      .then(function() {})
      .catch(function(error) {
        console.error('Error removing document: ', error);
      });
    dispatch(removeFromWishList(recipeId));
  };
};

// Wish List Reducer
function wishListReducer(state = { wishList: [] }, action) {
  switch (action.type) {
    case GET_WISHLIST_FROM_STORE:
      return state;
    case CLEAR_WISHLIST_FROM_STORE:
      return { ...state, wishList: [] };
    case GOT_WISHLIST:
      return { ...state, wishList: action.wishList };
    case ADD_TO_WISHLIST:
      let recipeObj = {
        id: action.recipeId,
        title: action.recipeTitle,
        image: action.recipeImage,
      };
      return { ...state, wishList: [...state.wishList, recipeObj] };
    case REMOVE_FROM_WISHLIST:
      return {
        ...state,
        wishList: [...state.wishList].filter(
          elemObj => elemObj.id !== action.recipeId
        ),
      };
    default:
      return state;
  }
}

export default wishListReducer;
