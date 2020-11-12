import { useEffect, useRef } from 'react';

const useClickOutside = (handler) => {
  const domNode = useRef();
  useEffect(() => {
    const newHandler = (e) => {
      if (domNode.current && !domNode.current.contains(e.target)) {
        handler();
      }
    };
    document.addEventListener('mousedown', newHandler);
    return () => {
      document.removeEventListener('mousedown', newHandler);
    };
  });

  return domNode;
};

export default useClickOutside;
