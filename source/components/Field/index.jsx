import React, { useEffect } from 'react';
import { array, func } from 'prop-types';

import { useWindowResize } from 'Hooks';
import { Canvas } from './canvas';
import styles from './styles.sass';

let _$canvas = null;
let _canvasRender = null;

// eslint-disable-next-line no-unused-vars
function Field({ squaresPool, squaresPoolAdd }) {
  useEffect(() => {
    _canvasRender = new Canvas(_$canvas);
    _canvasRender.init();

    return () => _canvasRender && _canvasRender.destroy();
  }, []);

  useEffect(() => _canvasRender.updateRenderData(squaresPool), [ squaresPool ]);
  useWindowResize(() => _canvasRender.onWindowResize());

  return (
    <canvas
      ref={(el) => _$canvas = el}
      className={styles.field}
      onWheel={(e) => _canvasRender && _canvasRender.onMouseWheel(e)}
      onMouseUp={(e) => _canvasRender && _canvasRender.onMouseUp(e)}
      onMouseOut={(e) => _canvasRender && _canvasRender.onMouseOut(e)}
      onMouseDown={(e) => _canvasRender && _canvasRender.onMouseDown(e)}
      onMouseMove={(e) => _canvasRender && _canvasRender.onMouseMove(e)}
    ></canvas>
  );
}

Field.propTypes = {
  squaresPool: array,
  squaresPoolAdd: func
};

export { Field };