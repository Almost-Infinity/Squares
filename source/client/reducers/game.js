import Square from 'Components/game/square';

export const gameReducer = (state, action) => {
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
}