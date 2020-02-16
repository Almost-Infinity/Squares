import { LAYER_WIDTH, LAYER_HEIGHT } from './constants';

export function onMove(e, offsetX, offsetY) {
  const newOffsetX = offsetX - e.movementX;
  const newOffsetY = offsetY - e.movementY;

  return [
    (newOffsetX >= 0 && newOffsetX <= (LAYER_WIDTH - e.target.width)) ? newOffsetX : offsetX,
    (newOffsetY >= 0 && newOffsetY <= (LAYER_HEIGHT - e.target.height)) ? newOffsetY : offsetY
  ];
}