import { SQUARES_POOL_ADD } from 'Actions/action-types';
import initialState from './initial-state';

export const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case SQUARES_POOL_ADD: {
      return Object.assign({}, state, {
        squaresPool: [
          ...state.squaresPool,
          action.square
        ]
      });
    }
    default: {
      return state;
    }
  }
};