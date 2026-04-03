import { useState, useEffect, useRef } from 'react';

function easeOut(t) {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Animates a number from 0 to `end` over `duration` ms when `active` becomes true.
 * Returns the current display value as a string (preserves "+" suffix and "%" etc).
 */
export default function useCountUp(rawValue, duration = 2000, active = false) {
  const [display, setDisplay] = useState('0');
  const rafRef = useRef(null);
  const startRef = useRef(null);

  // Parse numeric end value and suffix
  const suffix = rawValue.replace(/[\d,]+/, '');
  const end = parseFloat(rawValue.replace(/[^0-9.]/g, ''));

  useEffect(() => {
    if (!active) return;

    const animate = (timestamp) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOut(progress);
      const current = Math.round(easedProgress * end);

      // Format with commas if original has them
      const formatted =
        rawValue.includes(',')
          ? current.toLocaleString()
          : String(current);
      setDisplay(formatted + suffix);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      startRef.current = null;
    };
  }, [active, end, duration, suffix, rawValue]);

  return display;
}
