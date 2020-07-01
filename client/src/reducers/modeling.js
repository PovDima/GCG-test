import { SET_USER_ID } from '../actions/modeling';

const initialState = {
  userId: ''
};

const modelingReducer = (state = initialState, action) => {
  const { type, userId } = action;

  switch (type) {
    case SET_USER_ID:
      return { ...state, userId };
    default:
      return state;
  }
};

export default modelingReducer;
