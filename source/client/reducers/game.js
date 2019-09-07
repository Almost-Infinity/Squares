import Square from "../components/game/square";

const initialState = {
  squaresPool: [
    new Square({ x: 0, y: 0 }, { w: 10, h: 10 }, 'red'),
    new Square({ x: 20, y: 5 }, { w: 20, h: 10 }, 'green'),
    new Square({ x: 45, y: 25 }, { w: 10, h: 15 }, 'blue'),
    new Square({ x: 60, y: 20 }, { w: 20, h: 15 }, 'orange')
  ]
};

export const gameReducer = (state = initialState, action) => {
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