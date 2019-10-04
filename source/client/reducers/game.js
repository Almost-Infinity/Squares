import Square from 'Components/game/square';
import initialState from './initialState';

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SQ_POOL_ADD': {
      const { x, y, w, h, c } = action.sqObject;
      return Object.assign({}, state, {
        squaresPool: [
          ...state.squaresPool,
          new Square({ x, y }, { w, h }, c)
        ]
      });
    }
    default: {
      return state;
    }
  }
};