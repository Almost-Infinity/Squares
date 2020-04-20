import React, { useEffect } from 'react';

import { useWindowResize } from 'Hooks';
import { Canvas } from './canvas';
import styles from './styles.sass';

let _$canvas = null;
let _canvasRender = null;

function Field() {
  useEffect(() => {
    _canvasRender = new Canvas(_$canvas);
    _canvasRender.init();

    return () => _canvasRender && _canvasRender.destroy();
  }, []);

  useWindowResize(() => _canvasRender.onWindowResize());

  return (
    <canvas
      ref={(el) => _$canvas = el}
      className={styles.field}
      onMouseUp={(e) => _canvasRender.onMouseUp(e)}
      onMouseDown={(e) => _canvasRender.onMouseDown(e)}
      onMouseMove={(e) => _canvasRender.onMouseMove(e)}
      onWheel={(e) => _canvasRender.onMouseWheel(e)}
      onMouseOut={(e) => _canvasRender.onMouseOut(e)}
    ></canvas>
  );
}

export { Field };