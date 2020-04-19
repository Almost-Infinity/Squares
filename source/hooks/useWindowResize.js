import { useState, useEffect } from 'react';

export function useWindowResize(resizeCallback) {
  function getSize() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      aspectRation: (window.innerWidth / window.innerHeight)
    };
  }

  const [ windowSize, setWindowSize ] = useState(getSize);

  useEffect(() => {
    function handleResize(e) {
      setWindowSize(getSize());
      resizeCallback && resizeCallback(e);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}