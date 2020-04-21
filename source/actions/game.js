import { SQUARES_POOL_ADD } from './action-types';

export const squaresPoolAdd = (square) => ({
  type: SQUARES_POOL_ADD,
  square
});