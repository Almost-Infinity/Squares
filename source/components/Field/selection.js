import { CELL_SIZE_PX } from './constants';

class Selection {
  constructor() {
    this.isExist = false;
    this.posX = null;
    this.posY = null;
    this.height = 1;
    this.width = 1;
  }

  start(e, offsetX, offsetY) {
    this.isExist = true;
    this.posX = ~~((e.clientX - offsetX) / CELL_SIZE_PX);
    this.posY = ~~((e.clientY - offsetY) / CELL_SIZE_PX);
    this.height = 1;
    this.width = 1;
  }

  process(e, offsetX, offsetY) {
    if (this.isExist) {
      const currentX = ~~((e.clientX - offsetX) / CELL_SIZE_PX);
      const currentY = ~~((e.clientY - offsetY) / CELL_SIZE_PX);

      const deltaX = currentX - this.posX;
      const deltaY = currentY - this.posY;
      this.width = deltaX < 0 ? deltaX - 1 : deltaX + 1;
      this.height = deltaY < 0 ? deltaY - 1 : deltaY + 1;
    }
  }

  end() {
    if (this.isExist) {
      this.isExist = false;

      const ret = {
        x: this.posX,
        y: this.posY,
        w: this.width,
        h: this.height
      };

      this.posX = this.posY = null;
      this.width = this.height = 1;
      return ret;
    }
  }

  draw(ctx, offsetX, offsetY) {
    if (this.isExist) {
      ctx.save();
      ctx.strokeRect(
        (Math.ceil(offsetX / CELL_SIZE_PX) + (this.width < 0 ? this.posX + 1 : this.posX)) * CELL_SIZE_PX,
        (Math.ceil(offsetY / CELL_SIZE_PX) + (this.height < 0 ? this.posY + 1 : this.posY)) * CELL_SIZE_PX,
        this.width * CELL_SIZE_PX,
        this.height * CELL_SIZE_PX
      );
      ctx.restore();
    }
  }
}

export default Selection;