import { useCallback, useEffect, useRef, useState } from 'react';

export default function useIsMounted(): boolean {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted;
}
