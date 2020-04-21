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

  for (let i = 1; i < CELL_COUNT_Y; i++) { // Horizontal lines
    ctx.moveTo(0, CELL_SIZE_PX * i);
    ctx.lineTo(OFFSCREEN_WIDTH, CELL_SIZE_PX * i);
  }

  for (let i = 1; i < CELL_COUNT_X; i++) { // Vertical lines
    ctx.moveTo(CELL_SIZE_PX * i, 0);
    ctx.lineTo(CELL_SIZE_PX * i, OFFSCREEN_HEIGHT);
  }

  ctx.stroke();
  ctx.restore();

  // Draw squares
  if (this._renderData.length > 0) {
    ctx.save();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(51, 55, 69, .5)';
    ctx.font = 'bold 16px Roboto';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';

    for (let it of this._renderData) {
      ctx.save();
      ctx.fillStyle = it.color;

      ctx.beginPath();
      ctx.rect(
        it.posX * CELL_SIZE_PX,
        it.posY * CELL_SIZE_PX,
        it.width * CELL_SIZE_PX,
        it.height * CELL_SIZE_PX
      );
      ctx.stroke();
      ctx.fill();

      ctx.fillStyle = '#444';
      ctx.fillText(
        `${it.width * it.height}`,
        (it.posX + (it.width / 2)) * CELL_SIZE_PX,
        (it.posY + (it.height / 2)) * CELL_SIZE_PX + 1 // +1 to correct vertical align
      );
    }

    ctx.restore();
  }

  // Draw selection
};

export { Canvas };