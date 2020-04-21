import { combineReducers } from 'redux';
import { lobbiesReducer } from './lobbies-list';
import { gameReducer } from './game';

export default combineReducers({
  lobbies: lobbiesReducer,
  game: gameReducer
});