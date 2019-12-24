import { SET_USER_ID } from '../actions/users'

const initialState = {
  userId: ''
};

const usersReducer = (state = initialState, action) => {
  const { type, userId } = action;

  switch (type) {
    case SET_USER_ID:
      return { ...state, userId }
    default:
      return state
  }
}

export default usersReducer;
