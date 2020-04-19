import { Canvas } from './core';
import { CELL_SIZE_PX, CELL_COUNT_X, CELL_COUNT_Y } from './constants';

Canvas.prototype._draw = function() {
  const { _offscreenViewContext: ctx } = this;
  ctx.clearRect(0, 0, CELL_SIZE_PX * CELL_COUNT_X, CELL_SIZE_PX * CELL_COUNT_Y);

  // Draw background grid
  ctx.save();
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'rgba(51, 55, 69, .2)';
  ctx.beginPath();

  // Horizontal lines
  for (let i = 1; i < CELL_COUNT_Y; i++) {
    ctx.moveTo(0, CELL_SIZE_PX * i);
    ctx.lineTo(CELL_SIZE_PX * CELL_COUNT_X, CELL_SIZE_PX * i);
  }

  // Vertical lines
  for (let i = 1; i < CELL_COUNT_X; i++) {
    ctx.moveTo(CELL_SIZE_PX * i, 0);
    ctx.lineTo(CELL_SIZE_PX * i, CELL_SIZE_PX * CELL_COUNT_Y);
  }

  ctx.stroke();
  ctx.restore();

  // Draw something else
  // ...
};

export { Canvas };