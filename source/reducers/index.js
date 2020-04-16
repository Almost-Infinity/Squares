import { combineReducers } from 'redux';
import lobbiesReducer from './lobbies-list';

export default combineReducers({
  lobbies: lobbiesReducer
});