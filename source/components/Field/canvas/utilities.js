import { Canvas } from './core';
import {
	CELL_COUNT_X,
	CELL_COUNT_Y,
	CELL_SIZE_PX,
	OFFSCREEN_WIDTH,
	OFFSCREEN_HEIGHT,
	SCALE,
	FIELD_BORDER
} from './constants';

Canvas.prototype._createSelection = (x, y, w, h) => ({
	posX: x,
	posY: y,
	width: w,
	height: h,
	_beginX: x,
	_beginY: y,
	_isIntersected: false,
	_isTouched: false
});

Canvas.prototype._cursorToOffscreen = function(cursorX, cursorY, toCells = false) {
	let cX = this._viewOffsetX + (cursorX - this._$canvas.offsetLeft - FIELD_BORDER) * this._viewScale;
	let cY = this._viewOffsetY + (cursorY - this._$canvas.offsetTop - FIELD_BORDER) * this._viewScale;

	if (toCells) {
		cX = (cX / CELL_SIZE_PX) | 0;
		cY = (cY / CELL_SIZE_PX) | 0;

		return [
			cX < 0 ?
				0 : cX > CELL_COUNT_X ?
					CELL_COUNT_X - 1 : cX,

			cY < 0 ?
				0 : cY > CELL_COUNT_Y ?
					CELL_COUNT_Y - 1 : cY
		];
	}

	return [ cX, cY ];
};

Canvas.prototype._getMaxScale = function() {
	return this._$canvas.width >= this._$canvas.height ?
		Math.min(OFFSCREEN_WIDTH / this._$canvas.width, SCALE.MAX) :
		Math.min(OFFSCREEN_HEIGHT / this._$canvas.height, SCALE.MAX);
};

Canvas.prototype._newViewPosition = function(newOffsetX, newOffsetY) {
	if (newOffsetX >= 0) {
		const maxViewOffsetX = OFFSCREEN_WIDTH - Math.ceil(this._$canvas.width * this._viewScale);
		if (newOffsetX >= maxViewOffsetX) {
			this._viewOffsetX = maxViewOffsetX;
		}
		else {
			this._viewOffsetX = newOffsetX;
		}
	}

	if (newOffsetY >= 0) {
		const maxViewOffsetY = OFFSCREEN_HEIGHT - Math.ceil(this._$canvas.height * this._viewScale);
		if (newOffsetY >= maxViewOffsetY) {
			this._viewOffsetY = maxViewOffsetY;
		}
		else {
			this._viewOffsetY = newOffsetY;
		}
	}
};

export { Canvas };