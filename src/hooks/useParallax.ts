'use client';

import { useEffect, useRef, type RefObject } from 'react';

/* ═══════════════════════════════════════════════════════
   useParallax — Mouse-driven parallax effect
   
   Shifts the element's transform based on mouse position.
   Used for the hero section's 3D depth effect.
   ═══════════════════════════════════════════════════════ */

interface ParallaxOptions {
  intensity?: number;
  invertX?: boolean;
  invertY?: boolean;
  disabled?: boolean;
}

export function useParallax<T extends HTMLElement = HTMLDivElement>(
  options: ParallaxOptions = {}
): RefObject<T | null> {
  const { intensity = 20, invertX = false, invertY = false, disabled = false } = options;
  const ref = useRef<T>(null);

  useEffect(() => {
    if (disabled) return;

    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const xPercent = (clientX / innerWidth - 0.5) * 2;
      const yPercent = (clientY / innerHeight - 0.5) * 2;

      const moveX = xPercent * intensity * (invertX ? -1 : 1);
      const moveY = yPercent * intensity * (invertY ? -1 : 1);

      element.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
    };

    const handleMouseLeave = () => {
      element.style.transform = 'translate3d(0, 0, 0)';
      element.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      setTimeout(() => {
        if (element) element.style.transition = '';
      }, 500);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [intensity, invertX, invertY, disabled]);

  return ref;
}
