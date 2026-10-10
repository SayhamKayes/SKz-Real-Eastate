import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * High-performance scroll-driven video scrubber hook with in-memory Blob caching & LERP inertia.
 * Scrubs smoothly from 1.0s to 10.0s (total 9s construction motion) mapped directly to scroll.
 */
export function useHeroScrollVideo({
  videoSrc = '/videos/hero_background.mp4',
  startTime = 1.0,
  endTime = 10.0,
  smoothing = 0.18,
} = {}) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  const [isReady, setIsReady] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Performance-critical animation refs
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const isSeekingRef = useRef(false);
  const seekTimeoutRef = useRef(null);
  const rafIdRef = useRef(null);

  const durationSpan = Math.max(0.1, endTime - startTime); // 9.0 seconds

  // Preload video into in-memory Blob URL for instantaneous zero-latency seeking
  useEffect(() => {
    let isCancelled = false;
    let createdBlobUrl = null;

    fetch(videoSrc)
      .then((res) => {
        if (!res.ok) throw new Error('Fetch failed');
        return res.blob();
      })
      .then((blob) => {
        if (isCancelled) return;
        createdBlobUrl = URL.createObjectURL(blob);
        const vid = videoRef.current;
        if (vid) {
          vid.src = createdBlobUrl;
          vid.currentTime = startTime;
        }
      })
      .catch(() => {
        // Fallback to direct path if fetch is blocked
        const vid = videoRef.current;
        if (vid && !vid.src) {
          vid.src = videoSrc;
          vid.currentTime = startTime;
        }
      });

    return () => {
      isCancelled = true;
      if (createdBlobUrl) {
        URL.revokeObjectURL(createdBlobUrl);
      }
    };
  }, [videoSrc, startTime]);

  // Video metadata loaded & initial position setup
  const handleLoadedMetadata = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = startTime;
      setIsReady(true);
    }
  }, [startTime]);

  // Seek completed listener
  const handleSeeked = useCallback(() => {
    isSeekingRef.current = false;
    if (seekTimeoutRef.current) {
      window.clearTimeout(seekTimeoutRef.current);
      seekTimeoutRef.current = null;
    }
  }, []);

  // Initial video setup & seeked listener binding
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      if (video.readyState >= 1) {
        video.pause();
        video.currentTime = startTime;
        setIsReady(true);
      }
      const onSeeked = () => {
        isSeekingRef.current = false;
        if (seekTimeoutRef.current) {
          window.clearTimeout(seekTimeoutRef.current);
          seekTimeoutRef.current = null;
        }
      };
      video.addEventListener('seeked', onSeeked);
      return () => {
        video.removeEventListener('seeked', onSeeked);
      };
    }
  }, [startTime]);

  // Passive scroll & resize listener to track progress across hero container
  useEffect(() => {
    const calculateProgress = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const scrollableDistance = container.offsetHeight - window.innerHeight;

      if (scrollableDistance <= 0) {
        targetProgressRef.current = 0;
        return;
      }

      // 0.0 at top of hero, 1.0 when scrolled through hero
      const rawProgress = -rect.top / scrollableDistance;
      const clamped = Math.min(Math.max(rawProgress, 0), 1);
      targetProgressRef.current = clamped;
    };

    window.addEventListener('scroll', calculateProgress, { passive: true });
    window.addEventListener('resize', calculateProgress, { passive: true });
    calculateProgress();

    return () => {
      window.removeEventListener('scroll', calculateProgress);
      window.removeEventListener('resize', calculateProgress);
    };
  }, []);

  // RequestAnimationFrame loop with LERP for ultra-smooth forward & backward scrubbing
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.pause();
    }

    let lastProgressReportTime = 0;

    const tick = (timestamp) => {
      const target = targetProgressRef.current;
      const current = currentProgressRef.current;
      const diff = target - current;

      // Smooth interpolation towards target (forward or backward)
      if (Math.abs(diff) > 0.0003) {
        currentProgressRef.current += diff * smoothing;
      } else {
        currentProgressRef.current = target;
      }

      const activeProgress = currentProgressRef.current;

      // Throttled state update for external components (prevents UI re-render stalls)
      if (timestamp - lastProgressReportTime > 25) {
        setScrollProgress(activeProgress);
        lastProgressReportTime = timestamp;
      }

      const vid = videoRef.current;
      if (vid && vid.readyState >= 1) {
        // Exact frame mapping: 1.0s to 10.0s
        const targetTime = startTime + activeProgress * durationSpan;
        const timeDiff = Math.abs(vid.currentTime - targetTime);

        // Seek frame-by-frame when decoder is free and diff is > 18ms
        if (!isSeekingRef.current && timeDiff > 0.018) {
          isSeekingRef.current = true;
          const clampedTime = Math.min(Math.max(targetTime, startTime), endTime);
          vid.currentTime = clampedTime;

          // Safety timeout in case browser skips 'seeked' event
          if (seekTimeoutRef.current) {
            window.clearTimeout(seekTimeoutRef.current);
          }
          seekTimeoutRef.current = window.setTimeout(() => {
            isSeekingRef.current = false;
          }, 35);
        }
      }

      rafIdRef.current = requestAnimationFrame(tick);
    };

    rafIdRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      if (seekTimeoutRef.current) {
        window.clearTimeout(seekTimeoutRef.current);
      }
    };
  }, [startTime, endTime, durationSpan, smoothing]);

  return {
    containerRef,
    videoRef,
    isReady,
    scrollProgress,
    handleLoadedMetadata,
    handleSeeked,
  };
}
