import { Canvas } from './core';

Canvas.prototype._selectionBegin = function(e) {
  if (this._selection === null) {
    const [ cursorX, cursorY ] = this._cursorToOffscreen(e.clientX, e.clientY, true);
    this._selection = this._createSquare(cursorX, cursorY, 1, 1, 'orange'); // TODO: Change color
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
  }
};

Canvas.prototype._selectionEnd = function() {
  if (this._selection !== null) {
    if (this._selectionObserver !== null) {
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