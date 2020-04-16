import React, { useRef, useEffect } from 'react';

import Render from 'Render/core';
// import Selection from './selection';
// import { onMove } from './mouse';
import { generateLayerGrid } from './drawing';
import styles from './styles.sass';

function Field() {
  let render = null;
  const canvasRef = useRef(null);
  const layerGrid = generateLayerGrid();

  const draw = (ctx) => {
    const { width: cW, height: cH } = ctx.canvas;
    ctx.clearRect(0, 0, cW, cH);

    // Grid layer
    if (layerGrid) {
      ctx.drawImage(layerGrid, 0, 0, cW, cH, 0, 0, cW, cH);
    }
  };

  useEffect(() => {
    render = new Render(canvasRef.current, draw);

    return () => render && render.stop();
  }, []);

  return (
    <canvas ref={canvasRef} className={styles.field}></canvas>
  );
}

export default Field;

/**
 *
  const layerGrid = generateLayerGrid();
  let contentOffsetX = 0;
  let contentOffsetY = 0;
  let selection = new Selection;

  // Re-render method
  const update = () => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, width, height);

    // Grid layer
    layerGrid !== null && ctx.drawImage(
      layerGrid, contentOffsetX, contentOffsetY,
      width, height, 0, 0, width, height
    );

    // Selection
    selection.draw(ctx, contentOffsetX, contentOffsetY);
  };

  // Mouse handling
  const onMouseMove = (e) => {
    if (e.buttons & 1) { // LMB
      if (e.altKey) {
        e.target.style.cursor = 'grabbing';
        [ contentOffsetX, contentOffsetY ] = onMove(e, contentOffsetX, contentOffsetY);
      }
      else {
        e.target.style.cursor = 'crosshair';
        selection.process(e, contentOffsetX, contentOffsetY);
      }
      update();
    }
  };

  const onMouseDown = (e) => {
    if (e.buttons & 1 && !e.altKey) {
      selection.start(e, contentOffsetX, contentOffsetY);
    }
  };

  const onMouseUp = (e) => {
    e.target.style.cursor = 'default';
    const sel = selection.end();
    console.log(sel);
    update();
  };

  // Did mount and did update
  useEffect(() => update());
 */