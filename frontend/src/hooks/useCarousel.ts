'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface UseCarouselOptions {
  /** Total number of items */
  itemCount: number;
  /** Auto-slide interval in ms (default 6000) */
  autoPlayInterval?: number;
  /** Whether auto-play is enabled (default true) */
  autoPlay?: boolean;
}

interface UseCarouselReturn {
  currentIndex: number;
  goTo: (index: number) => void;
  next: () => void;
  prev: () => void;
  /** Ref to attach to the scrollable track (the flex container of cards) */
  trackRef: React.RefObject<HTMLDivElement | null>;
  /** Ref to attach to a single card wrapper to measure width */
  cardRef: React.RefObject<HTMLDivElement | null>;
  /** The inline style to apply to the track */
  trackStyle: React.CSSProperties;
  /** Touch handlers to spread onto the track container */
  handlers: {
    onTouchStart: (e: React.TouchEvent) => void;
    onTouchMove: (e: React.TouchEvent) => void;
    onTouchEnd: () => void;
  };
}

export function useCarousel({
  itemCount,
  autoPlayInterval = 6000,
  autoPlay = true,
}: UseCarouselOptions): UseCarouselReturn {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [gap, setGap] = useState(16); // 1rem = 16px default
  const isInteractingRef = useRef(false);
  const interactionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Measure card width and gap
  useEffect(() => {
    const measure = () => {
      if (cardRef.current) {
        setCardWidth(cardRef.current.offsetWidth);
      }
      if (trackRef.current) {
        const computedGap = window.getComputedStyle(trackRef.current).gap;
        if (computedGap && computedGap !== 'normal') {
          setGap(parseFloat(computedGap));
        }
      }
    };

    measure();
    // Re-measure on resize
    window.addEventListener('resize', measure);
    // Also measure after a short delay for SSR hydration
    const t = setTimeout(measure, 100);
    return () => {
      window.removeEventListener('resize', measure);
      clearTimeout(t);
    };
  }, [itemCount]);

  // Navigation
  const goTo = useCallback((index: number) => {
    const clamped = ((index % itemCount) + itemCount) % itemCount;
    setCurrentIndex(clamped);
  }, [itemCount]);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % itemCount);
  }, [itemCount]);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + itemCount) % itemCount);
  }, [itemCount]);

  // Pause/resume helpers
  const pauseAutoPlay = useCallback(() => {
    isInteractingRef.current = true;
    if (interactionTimerRef.current) {
      clearTimeout(interactionTimerRef.current);
    }
  }, []);

  const resumeAutoPlay = useCallback((delay: number = 5000) => {
    if (interactionTimerRef.current) {
      clearTimeout(interactionTimerRef.current);
    }
    interactionTimerRef.current = setTimeout(() => {
      isInteractingRef.current = false;
    }, delay);
  }, []);

  // Auto-play
  useEffect(() => {
    if (!autoPlay || itemCount <= 1) return;

    const timer = setInterval(() => {
      if (!isInteractingRef.current) {
        setCurrentIndex((prev) => (prev + 1) % itemCount);
      }
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [autoPlay, autoPlayInterval, itemCount]);

  // Touch swipe
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const minSwipeDistance = 40;

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = null;
    pauseAutoPlay();
  }, [pauseAutoPlay]);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  }, []);

  const onTouchEnd = useCallback(() => {
    if (touchStartX.current === null || touchEndX.current === null) {
      resumeAutoPlay();
      return;
    }
    const distance = touchStartX.current - touchEndX.current;
    if (distance > minSwipeDistance) {
      next();
    } else if (distance < -minSwipeDistance) {
      prev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
    resumeAutoPlay();
  }, [next, prev, resumeAutoPlay]);

  // Compute transform — pixel-based for reliability
  const translateX = cardWidth > 0
    ? -(currentIndex * (cardWidth + gap))
    : 0;

  const trackStyle: React.CSSProperties = {
    transform: `translate3d(${translateX}px, 0, 0)`,
    transition: 'transform 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    willChange: 'transform',
  };

  return {
    currentIndex,
    goTo,
    next,
    prev,
    trackRef,
    cardRef,
    trackStyle,
    handlers: {
      onTouchStart,
      onTouchMove,
      onTouchEnd,
    },
  };
}
