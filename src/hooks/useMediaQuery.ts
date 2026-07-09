'use client';

import { useEffect, useState } from 'react';

/* ═══════════════════════════════════════════════════════
   useMediaQuery — Responsive breakpoint hook
   
   Returns true when the given CSS media query matches.
   Used for conditionally rendering mobile vs desktop layouts.
   ═══════════════════════════════════════════════════════ */

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);

    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

/* Convenience presets */
export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 768px)');
}

export function useIsTablet(): boolean {
  return useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
}

export function useIsDesktop(): boolean {
  return useMediaQuery('(min-width: 1025px)');
}
