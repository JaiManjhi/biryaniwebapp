'use client';

import { useEffect, useState } from 'react';

/* ═══════════════════════════════════════════════════════
   useReducedMotion — Respects prefers-reduced-motion
   
   Returns true when the user has requested reduced motion.
   All animation components should check this before animating.
   ═══════════════════════════════════════════════════════ */

export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mql.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return prefersReduced;
}
