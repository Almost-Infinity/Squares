import { Canvas } from './core';
import {
  CELL_SIZE_PX,
  CELL_COUNT_X,
  CELL_COUNT_Y,
  OFFSCREEN_WIDTH,
  OFFSCREEN_HEIGHT
} from './constants';

Canvas.prototype._draw = function() {
  const { _offscreenViewContext: ctx } = this;
  ctx.clearRect(0, 0, OFFSCREEN_WIDTH, OFFSCREEN_HEIGHT);

  // Draw background grid
  ctx.save();
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'rgba(51, 55, 69, .2)';
  ctx.beginPath();

  // Horizontal lines
  for (let i = 1; i < CELL_COUNT_Y; i++) {
    ctx.moveTo(0, CELL_SIZE_PX * i);
    ctx.lineTo(OFFSCREEN_WIDTH, CELL_SIZE_PX * i);
  }

  // Vertical lines
  for (let i = 1; i < CELL_COUNT_X; i++) {
    ctx.moveTo(CELL_SIZE_PX * i, 0);
    ctx.lineTo(CELL_SIZE_PX * i, OFFSCREEN_HEIGHT);
  }

  ctx.stroke();
  ctx.restore();

  // Draw something else
  // ...
};

export { Canvas };