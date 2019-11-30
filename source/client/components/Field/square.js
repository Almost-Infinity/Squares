export default class Square {
  constructor(pos, size, color) {
    this.pos = pos;
    this.size = size;
    this.color = color;
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