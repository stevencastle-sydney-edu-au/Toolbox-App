import { useEffect } from 'react';

declare global {
  interface Window {
    frameworkReady?: () => void;
  }
}

export function useFrameworkReady() {
  useEffect(() => {
    // Only call frameworkReady once when the component mounts
    window.frameworkReady?.();
  }, []); // Empty dependency array ensures this only runs once
}