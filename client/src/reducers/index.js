import { combineReducers } from 'redux';
import users from './users';
import analytics from './analytics';

export default combineReducers({
  users,
  analytics
})
