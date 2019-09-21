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

  haveIntersection = (anotherX, anotherY, anotherW, anotherH) => {
    return !(this.pos.x > anotherX + anotherW - 1 ||
      this.pos.x + this.size.w - 1 < anotherX ||
      this.pos.y > anotherY + anotherH - 1 ||
      this.pos.y + this.size.h - 1 < anotherY);
  }

  haveTouch = (anotherX, anotherY, anotherW, anotherH) => {
    return !(this.pos.x > anotherX + anotherW ||
      this.pos.x + this.size.w < anotherX ||
      this.pos.y > anotherY + anotherH ||
      this.pos.y + this.size.h < anotherY);
  }
}