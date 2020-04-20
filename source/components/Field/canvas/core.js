import { createDummyCanvas } from 'Utilities';
import {
  OFFSCREEN_WIDTH,
  OFFSCREEN_HEIGHT
} from './constants';

class Canvas {
  _$canvas = null;
  _viewContext = null;
  _requestFrameId = null;
  _lastFrameTime = null;
  _isNeedRedraw = true;

  _mouseKeyMap = [];

  _offscreenViewContext = null;

  _viewOffsetX = 0;
  _viewOffsetY = 0;
  _viewScale = 1;

  constructor($el) {
    this._$canvas = $el;
  }

  init = () => {
    // Create offscreen canvas
    this._offscreenViewContext = createDummyCanvas(OFFSCREEN_WIDTH, OFFSCREEN_HEIGHT).getContext('2d');

    this._viewContext = this._$canvas.getContext('2d');
    this._lastFrameTime = window.performance.now();
    this._requestFrameId = requestAnimationFrame(this._renderer);
    this.onWindowResize();
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
          this._viewOffsetX,
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