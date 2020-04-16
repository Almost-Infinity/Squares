import { useState, useEffect } from 'react';

export function useWindowSize(cb) {
  const isClient = typeof window === 'object';

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
      aspectRation: isClient ? (window.innerWidth / window.innerHeight) : undefined
    };
  }

  const [ windowSize, setWindowSize ] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return false;
    }

    function handleResize(e) {
      setWindowSize(getSize());
      cb && cb(e);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}