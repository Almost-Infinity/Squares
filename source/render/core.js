export default class Render {
  constructor(canvas, rendererCallback) {
    if (Render.instance) {
      return Render.instance;
    }
    Render.instance = this;

    // Check arguments
    if (!(canvas instanceof HTMLCanvasElement)) {
      throw new TypeError('[Render]: first argument must be a \'HTMLCanvasElement\'');
    }

    if (typeof rendererCallback !== 'function') {
      throw new TypeError('[Render]: sencond argument must be a \'function\'');
    }

    // Init
    this._dp = window.devicePixelRatio || 1;
    this._$canvas = canvas;
    this._$canvas.style.webkitTransform = `scale(${1 / this._dp})`;
    this._$canvas.width = canvas.parentElement.offsetWidth * this._dp;
    this._$canvas.height = canvas.parentElement.offsetHeight * this._dp;
    this._viewContext = canvas.getContext('2d');
    this._draw = rendererCallback;

    this._lastFrameTime = window.performance.now();
    this._requestFrameId = requestAnimationFrame(this._renderer);

    return this;
  }

  _renderer = () => {
    const FPS = 60;
    const now = window.performance.now();
    const elapsed = now - this._lastFrameTime;

    if (elapsed >= (1000 / FPS)) {
      this._draw(this._viewContext);
      this._lastFrameTime = now;
    }

    this._requestFrameId = requestAnimationFrame(this._renderer);
  }

  stop = () => {
    if (this._requestFrameId) {
      cancelAnimationFrame(this._requestFrameId);
    }
  }
}