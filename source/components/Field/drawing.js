import { createDummyCanvas } from 'Utilities';
import { CELL_COUNT_X, CELL_COUNT_Y, CELL_SIZE_PX, LAYER_WIDTH, LAYER_HEIGHT } from './constants';

export function generateLayerGrid() {
  const ctx = createDummyCanvas(LAYER_WIDTH, LAYER_HEIGHT).getContext('2d');
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'rgba(51, 55, 69, .2)';

  ctx.beginPath();
  // Vertical lines
  for (let i = 1; i < CELL_COUNT_X; i++) {
    ctx.moveTo(CELL_SIZE_PX * i, 0);
    ctx.lineTo(CELL_SIZE_PX * i, LAYER_HEIGHT);
  }

  // Horizontal lines
  for (let i = 1; i < CELL_COUNT_Y; i++) {
    ctx.moveTo(0, CELL_SIZE_PX * i);
    ctx.lineTo(LAYER_WIDTH, CELL_SIZE_PX * i);
  }
  ctx.stroke();

  const img = new Image();
  img.src = ctx.canvas.toDataURL('image/png');
  return img;
}