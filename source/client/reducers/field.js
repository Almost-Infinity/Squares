import Square from 'Components/Field/square';

import { SQUARE_POOL_ADD } from 'Types/actions';
import initialState from './initialState';

export default (state = initialState, action) => {
  switch (action.type) {
    case SQUARE_POOL_ADD: {
      const { x, y, w, h, c } = action.square;
      return Object.assign({}, state, {
        pool: [
          ...state.pool,
          new Square({ x, y }, { w, h }, c)
        ]
      });
    }
    default: {
      return state;
    }
  }
};