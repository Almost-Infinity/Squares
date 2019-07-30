import { SQ_POOL_ADD } from './actionTypes';

export const sqPoolAdd = (sqObject) => {
  return { type: SQ_POOL_ADD, sqObject };
};