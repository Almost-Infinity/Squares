import Square from "../components/game/square";

const initialState = {
  squaresPool: []
};

export const game = (state = initialState, action) => {
  switch (action.type) {
    case 'SQ_POOL_ADD': {
      return {
        ...state,
        squaresPool: [
          ...state.squaresPool,
          new Square({ x: action.x, y: action.y}, { w: action.w, h: action.h }, action.c)
        ]
      };
    }
    default: {
      return state;
    }
  }
}