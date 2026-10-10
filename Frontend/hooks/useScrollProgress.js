import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook to measure scroll progress through a target DOM container.
 * Returns progress between 0.0 and 1.0.
 */
export function useScrollProgress(containerRef, { lerpFactor = 0.12 } = {}) {
  const [progress, setProgress] = useState(0);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const rafIdRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far down the user has scrolled through the container
      // Container total scrollable height = container height - windowHeight
      const totalScrollable = rect.height - windowHeight;
      if (totalScrollable <= 0) {
        targetProgressRef.current = 1;
        return;
      }

      // rect.top is 0 when container starts, and -totalScrollable when it ends
      const scrolled = -rect.top;
      const rawProgress = scrolled / totalScrollable;
      const clamped = Math.max(0, Math.min(1, rawProgress));
      targetProgressRef.current = clamped;
    };

    const updateSmooth = () => {
      // Lerp smoothing
      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) > 0.0005) {
        currentProgressRef.current += diff * lerpFactor;
        setProgress(Number(currentProgressRef.current.toFixed(4)));
      } else if (currentProgressRef.current !== targetProgressRef.current) {
        currentProgressRef.current = targetProgressRef.current;
        setProgress(targetProgressRef.current);
      }
      rafIdRef.current = requestAnimationFrame(updateSmooth);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();
    rafIdRef.current = requestAnimationFrame(updateSmooth);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [containerRef, lerpFactor]);

  return progress;
}
