import { combineReducers } from 'redux';
import gameReducer from './game';
import lobbiesReducer from './lobbies-list';

export default combineReducers({
  squaresPool: gameReducer,
  lobbies: lobbiesReducer
});