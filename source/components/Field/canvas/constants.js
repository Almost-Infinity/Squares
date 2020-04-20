export const CELL_SIZE_PX = 15;
export const CELL_COUNT_X = 256;
export const CELL_COUNT_Y = (CELL_COUNT_X / 1.77) | 0; // AR: 16:9
export const OFFSCREEN_WIDTH = CELL_SIZE_PX * CELL_COUNT_X;
export const OFFSCREEN_HEIGHT = CELL_SIZE_PX * CELL_COUNT_Y;

export const FIELD_MARGIN = 5;
export const FIELD_BORDER = 2;

export const SCALE = {
  MIN: 1,
  MAX: 1.75,
  STEP: 0.25
};

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