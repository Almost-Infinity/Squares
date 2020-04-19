import { Canvas } from './core';
import {
  MOUSE_KEY,
  CELL_SIZE_PX,
  CELL_COUNT_X,
  CELL_COUNT_Y,
  CURSOR
} from './constants';

Canvas.prototype.onMouseDown = function(e) {
  this._mouseKeyMap[e.button] = true;
};

Canvas.prototype.onMouseUp = function(e) {
  this._mouseKeyMap[e.button] = false;
  this._$canvas.style.cursor = CURSOR.DEFAULT;
};

Canvas.prototype.onMouseMove = function(e) {
  if (this._mouseKeyMap[MOUSE_KEY.LMB]) {
    this._$canvas.style.cursor = CURSOR.MOVING;

    const newOffsetX = this._viewOffestX - e.nativeEvent.movementX;
    if (newOffsetX >= 0 && newOffsetX <= (CELL_SIZE_PX * CELL_COUNT_X - Math.ceil(this._$canvas.width * this._viewScale))) {
      this._viewOffestX = newOffsetX;
    }

    const newOffsetY = this._viewOffsetY - e.nativeEvent.movementY;
    if (newOffsetY >= 0 && newOffsetY <= (CELL_SIZE_PX * CELL_COUNT_Y - Math.ceil(this._$canvas.height * this._viewScale))) {
      this._viewOffsetY = newOffsetY;
    }

    this._isNeedRedraw = true;
  }
};

Canvas.prototype.onMouseWheel = function(e) {
  const scaleDir = e.deltaY < 0 ? -1 : 1;
  const scaleStep = 0.25;
  const scaleNext = this._viewScale + (scaleStep * scaleDir);

  if (scaleNext >= 1 && scaleNext <= 2) {
    this._viewScale = scaleNext;
    this._isNeedRedraw = true;
  }
};

Canvas.prototype.onMouseOut = function() {
  this._mouseKeyMap = [];
  this._$canvas.style.cursor = CURSOR.DEFAULT;
};

export { Canvas };