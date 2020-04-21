import { Canvas } from './core';

Canvas.prototype.isIntersected = function(another) {
	return !(
    this._selection.posX > another.posX + another.width - 1 || // Right side
    this._selection.posX + this._selection.width - 1 < another.posX || // Left side
    this._selection.posY > another.posY + another.height - 1 || // Top side
    this._selection.posY + this._selection.height - 1 < another.posY // Bottom side
  );
};

Canvas.prototype.isTouched = function(another) {
  return !(
    this._selection.posX > another.posX + another.width || // Right side
    this._selection.posX + this._selection.width < another.posX || // Left side
    this._selection.posY > another.posY + another.height || // Top side
    this._selection.posY + this._selection.height < another.posY // Bottom side
  );
};

Canvas.prototype._selectionBegin = function(e) {
  if (this._selection === null) {
    const [ cursorX, cursorY ] = this._cursorToOffscreen(e.clientX, e.clientY, true);
    this._selection = this._createSelection(cursorX, cursorY, 1, 1, 'orange'); // TODO: Change color
  }
};

Canvas.prototype._selectionProcess = function(e) {
  if (this._selection !== null) {
    const [ currentX, currentY ] = this._cursorToOffscreen(e.clientX, e.clientY, true);

    const minX = Math.min(currentX, this._selection._beginX);
    const maxX = Math.max(currentX, this._selection._beginX);
    const minY = Math.min(currentY, this._selection._beginY);
    const maxY = Math.max(currentY, this._selection._beginY);

    this._selection.posX = minX;
    this._selection.posY = minY;
    this._selection.width = maxX - minX + 1;
    this._selection.height = maxY - minY + 1;

    for (let it of this._renderData) {
      if((this._selection._isIntersected = this.isIntersected(it))) {
        break;
      }
      else if((this._selection._isTouched = this.isTouched(it))) {
        break;
      }
    }
  }
};

Canvas.prototype._selectionEnd = function() {
  if (this._selection !== null) {
    if (this._selectionObserver !== null && !this._selection._isIntersected) {
      this._selectionObserver({
        posX: this._selection.posX,
        posY: this._selection.posY,
        width: this._selection.width,
        height: this._selection.height
      });
    }
    this._selection = null;
  }
};

export { Canvas };