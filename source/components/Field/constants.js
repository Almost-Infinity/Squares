export const CELL_COUNT_X = 256;
export const CELL_COUNT_Y = (CELL_COUNT_X / 1.77) | 0; // AR: 16:9
export const CELL_SIZE_PX = 12;
export const LAYER_WIDTH = CELL_COUNT_X * CELL_SIZE_PX;
export const LAYER_HEIGHT = CELL_COUNT_Y * CELL_SIZE_PX;