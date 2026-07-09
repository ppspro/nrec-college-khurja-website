'use client';

import { useState, useEffect, useRef } from 'react';

interface AnimatedCounterProps {
  value: string; // e.g. "5000+"
  duration?: number;
}

export default function AnimatedCounter({ value, duration = 1500 }: AnimatedCounterProps) {
  const stringValue = String(value || '');
  const numericString = stringValue.replace(/[^0-9]/g, '');
  const numericValue = parseInt(numericString, 10) || 0;
  const suffix = stringValue.replace(/[0-9]/g, '');
  
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTimestamp: number | null = null;
          
          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            setCount(Math.floor(progress * numericValue));
            
            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };
          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [numericValue, duration]);

  return (
    <span ref={elementRef} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}
