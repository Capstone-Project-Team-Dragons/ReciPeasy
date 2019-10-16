import db from '../api/db/database';

// ACTION TYPES
export const GET_PAST_RECIPES_FROM_STORE = 'GET_PAST_RECIPES_FROM_STORE';
export const CLEAR_PAST_RECIPES_FROM_STORE = 'CLEAR_PAST_RECIPES_FROM_STORE';
export const GOT_PAST_RECIPES = 'GOT_PAST_RECIPES';
export const ADD_TO_PAST_RECIPES = 'ADD_TO_PAST_RECIPES';

// ACTION CREATORS
export const getPastRecipesFromStore = () => {
  return {
    type: GET_PAST_RECIPES_FROM_STORE,
  };
};

export const clearPastRecipesFromStore = () => {
  return {
    type: CLEAR_PAST_RECIPES_FROM_STORE,
  };
};

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
      dispatch(getPastRecipes(Object.values(pastRecipesObj)));
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
      dispatch(addToPastRecipes(recipeId, recipeTitle, recipeImage));
    } catch (error) {
      console.log('Error!', error);
    }
  };
};

// Past Recipes Reducer
function pastRecipesReducer(state = { pastRecipes: [] }, action) {
  switch (action.type) {
    case GET_PAST_RECIPES_FROM_STORE:
      return state;
    case CLEAR_PAST_RECIPES_FROM_STORE:
      return { ...state, pastRecipes: [] };
    case GOT_PAST_RECIPES:
      return { ...state, pastRecipes: action.pastRecipes };
    case ADD_TO_PAST_RECIPES:
      let recipeObj = {
        id: action.recipeId,
        title: action.recipeTitle,
        image: action.recipeImage,
      };
      return { ...state, pastRecipes: [...state.pastRecipes, recipeObj] };
    default:
      return state;
  }
}

export default pastRecipesReducer;
