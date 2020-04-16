import { useState, useEffect } from 'react';

export function useMouseListener(el, cb, config = {}) {
  if (typeof el !== HTMLElement) {
    throw new TypeError('useMouseListener: first argument must be: HTMLElement');
  }

  
  useEffect(() => {
    return () => {};
  }, []);
}