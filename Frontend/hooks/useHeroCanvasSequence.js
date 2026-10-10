import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * 60 FPS Canvas Frame Sequence Scrubber with Hold Buffer at End.
 * - Starts at 0.5s (Frame 12).
 * - Scrubs through 10.0s (Frame 239).
 * - Holds at the final frame (10.0s) between holdEndThreshold (0.78) and 1.0 so user can view the complete interface.
 * - Only after scrolling through the hold buffer does the page flow to the next section.
 */
export function useHeroCanvasSequence({
  startFrame = 20, // 0.5s at 24fps
  endFrame = 239,  // 10.0s at 24fps
  holdEndThreshold = 0.78, // Hold at final frame between 0.78 and 1.0
  framePath = (index) => `/hero_frames/frame_${String(index).padStart(3, '0')}.webp`,
  smoothing = 0.18,
} = {}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  // Performance-critical animation refs
  const imagesRef = useRef({});
  const loadedCountRef = useRef(0);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const lastDrawnIndexRef = useRef(-1);
  const rafIdRef = useRef(null);

  // Helper to draw a specific frame onto canvas with object-fit: cover
  const drawFrame = useCallback((frameIdx) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let img = imagesRef.current[frameIdx];
    if (!img || !img.complete || img.naturalWidth === 0) {
      // Robust fallback: find nearest loaded frame so the canvas NEVER goes blank
      for (let offset = 1; offset <= 25; offset++) {
        const prev = imagesRef.current[frameIdx - offset];
        if (prev && prev.complete && prev.naturalWidth > 0) {
          img = prev;
          break;
        }
        const next = imagesRef.current[frameIdx + offset];
        if (next && next.complete && next.naturalWidth > 0) {
          img = next;
          break;
        }
      }
    }
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = window.devicePixelRatio || 1;
    const cw = canvas.clientWidth;
    const ch = canvas.clientHeight;
    if (cw === 0 || ch === 0) return;

    if (canvas.width !== Math.round(cw * dpr) || canvas.height !== Math.round(ch * dpr)) {
      canvas.width = Math.round(cw * dpr);
      canvas.height = Math.round(ch * dpr);
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    // Object-fit: cover math
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const scale = Math.max(cw / iw, ch / ih);
    const nw = iw * scale;
    const nh = ih * scale;
    const ox = (cw - nw) / 2;
    const oy = (ch - nh) / 2;

    ctx.drawImage(img, ox, oy, nw, nh);
    ctx.restore();

    lastDrawnIndexRef.current = frameIdx;
  }, []);

  // Preload all frames from startFrame to endFrame into memory
  useEffect(() => {
    let isCancelled = false;
    loadedCountRef.current = 0;

    // 1. Immediately load start frame (Frame 12 at 0.5s) so UI is ready instantly
    const initialImg = new Image();
    initialImg.src = framePath(startFrame);
    initialImg.onload = () => {
      if (isCancelled) return;
      imagesRef.current[startFrame] = initialImg;
      drawFrame(startFrame);
      setIsReady(true);
    };

    // 2. Preload remaining frames
    for (let i = startFrame; i <= endFrame; i++) {
      if (i === startFrame) continue;
      const img = new Image();
      img.src = framePath(i);
      img.onload = () => {
        if (isCancelled) return;
        imagesRef.current[i] = img;
        loadedCountRef.current += 1;
        if (lastDrawnIndexRef.current === i) {
          drawFrame(i);
        }
      };
    }

    return () => {
      isCancelled = true;
    };
  }, [startFrame, endFrame, framePath, drawFrame]);

  // Window scroll & resize listener
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const scrollableDistance = container.offsetHeight - window.innerHeight;

      if (scrollableDistance <= 0) {
        targetProgressRef.current = 0;
        return;
      }

      const rawProgress = -rect.top / scrollableDistance;
      const clamped = Math.min(Math.max(rawProgress, 0), 1);
      targetProgressRef.current = clamped;
    };

    const handleResize = () => {
      handleScroll();
      if (lastDrawnIndexRef.current !== -1) {
        drawFrame(lastDrawnIndexRef.current);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [drawFrame]);

  // RequestAnimationFrame loop with LERP and Hold-at-End logic
  useEffect(() => {
    let lastProgressReportTime = 0;

    const tick = (timestamp) => {
      const target = targetProgressRef.current;
      const current = currentProgressRef.current;
      const diff = target - current;

      // Smooth inertia interpolation towards target
      if (Math.abs(diff) > 0.0003) {
        currentProgressRef.current += diff * smoothing;
      } else {
        currentProgressRef.current = target;
      }

      const activeProgress = currentProgressRef.current;

      // Throttle React state updates to avoid unnecessary component renders
      if (timestamp - lastProgressReportTime > 25) {
        setScrollProgress(activeProgress);
        lastProgressReportTime = timestamp;
      }

      // Normalized video progress:
      // 0.0 to holdEndThreshold plays startFrame -> endFrame
      // holdEndThreshold to 1.0 holds firmly at endFrame
      let normalizedVideoP = 1.0;
      if (activeProgress < holdEndThreshold) {
        normalizedVideoP = activeProgress / holdEndThreshold;
      }

      const targetFrame = Math.min(
        endFrame,
        Math.max(startFrame, Math.round(startFrame + normalizedVideoP * (endFrame - startFrame)))
      );

      if (targetFrame !== lastDrawnIndexRef.current) {
        drawFrame(targetFrame);
      }

      rafIdRef.current = requestAnimationFrame(tick);
    };

    rafIdRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [startFrame, endFrame, holdEndThreshold, smoothing, drawFrame]);

  return {
    containerRef,
    canvasRef,
    isReady,
    scrollProgress,
    currentFrame: lastDrawnIndexRef.current,
  };
}
