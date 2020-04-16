import Render from '../core';

Render.prototype._defineMouseEvents = function() {
  for (const evt in this._events) {
    const f = this[`_${evt}`];
    if (f) {
      const m = f.bind(this);
      window.addEventListener(evt, m, { passive: false });
      this._events[evt] = m;
      console.log(evt, m);
    }
  }
};

Render.prototype._undefMouseEvents = function() {
  for (const evt of this._events) {
    window.removeEventListener(evt, this._events[evt]);
  }
};

export default Render;