import { Canvas } from './core';
import {
	OFFSCREEN_WIDTH,
	OFFSCREEN_HEIGHT
} from './constants';

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