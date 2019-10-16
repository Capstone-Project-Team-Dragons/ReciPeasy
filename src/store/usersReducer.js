// ACTION TYPES
export const GET_CURRENT_USER = 'GET_CURRENT_USER';
export const UPDATE_CURRENT_USER = 'UPDATE_CURRENT_USER';

// ACTION CREATORS
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

// Users Reducer
function usersReducer(state = { currentUser: {} }, action) {
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

export default usersReducer;
