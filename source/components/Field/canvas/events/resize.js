import { Canvas } from '../core';
import {
  FIELD_MARGIN,
  FIELD_BORDER
} from '../constants';

Canvas.prototype.onWindowResize = function() {
  this._$canvas.width = this._$canvas.parentElement.offsetWidth - (FIELD_MARGIN * 2) - (FIELD_BORDER * 2);
  this._$canvas.height = this._$canvas.parentElement.offsetHeight - (FIELD_MARGIN * 2) - (FIELD_BORDER * 2);

<<<<<<< HEAD
  this._viewScale = 1;
=======
>>>>>>> f520463d0ad9bef41af0329b8fa100f5789b8418
  this._newViewPosition(this._viewOffsetX, this._viewOffsetY);

  this._isNeedRedraw = true;
};

export { Canvas };