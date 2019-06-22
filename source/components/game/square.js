// import { CELL_X, CELL_Y } from './constants';

export default class Square {
  constructor(pos, size, color) {
    this.pos = pos;
    this.size = size;
    this.color = color;
  }

  setPos = (newPosX, newPosY, field, relative = true) => {
    if (relative) {
      if (this.pos.x + newPosX >= 0 && this.pos.x + newPosX + this.size.w <= field.width &&
        this.pos.y + newPosY >= 0 && this.pos.y + newPosY + this.size.h <= field.height) {
          this.pos.x += newPosX;
          this.pos.y += newPosY;
      }
    }
    else {
      if (newPosX >= 0 && newPosX + this.size.w <= field.width &&
        newPosY >= 0 && newPosY + this.size.h <= field.height) {
          this.pos.x = newPosX;
          this.pos.y = newPosY;
          console.log('set!');
      }
    }
  }
}