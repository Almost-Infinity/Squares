import { Canvas } from '../core';
import {
	CURSOR,
	MOUSE_KEY,
	FIELD_BORDER,
	SCALE
} from '../constants';

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

		this._newViewPosition(
			this._viewOffsetX - e.nativeEvent.movementX,
			this._viewOffsetY - e.nativeEvent.movementY
		);

		this._isNeedRedraw = true;
	}
};

Canvas.prototype.onMouseWheel = function(e) {
	const scaleDir = e.deltaY < 0 ? -1 : 1;
	const scaleNext = this._viewScale + (SCALE.STEP * scaleDir);

	if (scaleNext >= SCALE.MIN && scaleNext <= this._getMaxScale()) {
		this._viewScale = scaleNext;

		// Scaling to the cursor
		const cursorOffsetX = e.clientX - this._$canvas.offsetLeft - FIELD_BORDER;
		const cursorOffsetY = e.clientY - this._$canvas.offsetTop - FIELD_BORDER;
		if (cursorOffsetX >= 0 && cursorOffsetY >= 0) {
			this._newViewPosition(
				this._viewOffsetX - (cursorOffsetX * (SCALE.STEP * scaleDir)),
				this._viewOffsetY - (cursorOffsetY * (SCALE.STEP * scaleDir))
			);
		}

		this._isNeedRedraw = true;
	}
};

Canvas.prototype.onMouseOut = function() {
	this._mouseKeyMap = [];
	this._$canvas.style.cursor = CURSOR.DEFAULT;
};

export { Canvas };