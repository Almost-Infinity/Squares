import { Canvas } from './core';
import { brightness } from 'Utilities';
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
    ctx.font = '300 16px Roboto';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';

    for (let it of this._renderData) {
      ctx.save();
      ctx.fillStyle = `#${it.color}`;
      ctx.strokeStyle = `#${brightness(it.color, 0.5)}`;

      ctx.beginPath();
      ctx.rect(
        it.posX * CELL_SIZE_PX,
        it.posY * CELL_SIZE_PX,
        it.width * CELL_SIZE_PX,
        it.height * CELL_SIZE_PX
      );
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = `#${brightness(it.color, 0.3)}`;
      ctx.fillText(
        `${it.width * it.height}`,
        (it.posX + (it.width / 2)) * CELL_SIZE_PX,
        (it.posY + (it.height / 2)) * CELL_SIZE_PX + 1 // +1 to correct vertical align
      );
    }

    ctx.restore();
  }

  // Draw selection
  if (this._selection !== null) {
    ctx.save();
    ctx.strokeStyle = this._selection._isIntersected ? '#7d1a1a' : '#1a757d';
    ctx.strokeRect(
      this._selection.posX * CELL_SIZE_PX,
      this._selection.posY * CELL_SIZE_PX,
      this._selection.width * CELL_SIZE_PX,
      this._selection.height * CELL_SIZE_PX
    );
    ctx.restore();
  }
};

export { Canvas };