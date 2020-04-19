import { CELL_SIZE_PX, CELL_COUNT_X, CELL_COUNT_Y } from './constants';
import { createDummyCanvas } from 'Utilities';

class Canvas {
  _$canvas = null;
  _viewContext = null;
  _requestFrameId = null;
  _lastFrameTime = null;
  _isNeedRedraw = true;

  _mouseKeyMap = [];

  _offscreenViewContext = null;

  _viewOffestX = 0;
  _viewOffsetY = 0;
  _viewScale = 1;

  constructor($el) {
    this._$canvas = $el;
  }

  updateSize = () => {
    this._$canvas.width = this._$canvas.parentElement.offsetWidth - 10 - 4; // 10 - sum of the left and right margins, 4 - sum of borders
    this._$canvas.height = this._$canvas.parentElement.offsetHeight - 10 - 4; // 10 - sum of the top and bottom margin, 4 - sum of borders
    this._isNeedRedraw = true;
  }

  init = () => {
    // Create offscreen canvas
    this._offscreenViewContext = createDummyCanvas(
      CELL_SIZE_PX * CELL_COUNT_X,
      CELL_SIZE_PX * CELL_COUNT_Y
    ).getContext('2d');

    this._viewContext = this._$canvas.getContext('2d');
    this._lastFrameTime = window.performance.now();
    this._requestFrameId = requestAnimationFrame(this._renderer);
    this.updateSize();
  }

  destroy = () => {
    if (this._requestFrameId !== null) {
      cancelAnimationFrame(this._requestFrameId);
    }
  }

  _renderer = () => {
    const FPS = 60;
    const now = window.performance.now();
    const elapsed = now - this._lastFrameTime;

    if (elapsed >= (1000 / FPS) && this._isNeedRedraw) {
      if (this._viewContext !== null && this._offscreenViewContext !== null) {
        this._viewContext.clearRect(0, 0, this._$canvas.width, this._$canvas.height);

        // Draw content on offscreen canvas
        this._draw();

        // Put content into view canvas
        this._viewContext.drawImage(
          this._offscreenViewContext.canvas,
          this._viewOffestX,
          this._viewOffsetY,
          this._$canvas.width * this._viewScale,
          this._$canvas.height * this._viewScale,
          0, 0,
          this._$canvas.width,
          this._$canvas.height
        );

        this._isNeedRedraw = false;
      }
      this._lastFrameTime = now;
    }

    this._requestFrameId = requestAnimationFrame(this._renderer);
  }
}

export { Canvas };