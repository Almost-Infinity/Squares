import { useEffect } from 'react';

export function useKeyboard(callback) {
  const _keyboardKeyMap = [];

  useEffect(() => {
    function handleKeydown(e) {
      e.preventDefault();
      _keyboardKeyMap[e.key] = true;
      callback && callback(_keyboardKeyMap);
    }

    function handleKeyup(e) {
      _keyboardKeyMap[e.key] = false;
      callback && callback(_keyboardKeyMap);
    }

    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('keyup', handleKeyup);
    return () => {
      window.removeEventListener('keydown', handleKeydown)
      window.removeEventListener('keyup', handleKeyup)
    };
  }, []);
}