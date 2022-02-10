import { useRef, useEffect } from 'react';

const useEffectAfterFirstUpdate = (cb, dependencies) => {
  const firstUpdate = useRef(true);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    cb();
  }, dependencies);
};

export default useEffectAfterFirstUpdate;
