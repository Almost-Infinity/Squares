export const CELL_SIZE_PX = 15;
export const CELL_COUNT_X = 256;
export const CELL_COUNT_Y = (CELL_COUNT_X / 1.77) | 0; // AR: 16:9

export const CURSOR = {
  DEFAULT: 'default',
  MOVING: 'grabbing'
};

export const MOUSE_KEY = {
  LMB: 0,
  WHEEL: 1,
  RMB: 2,
  M4: 3,
  M5: 4
};