'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react';

/* ═══════════════════════════════════════════════════════
   Theme Context — Veg / Non-Veg Experience Toggle
   
   Switches the entire site's color palette, particles,
   menu, and recommendations without a page reload.
   Uses CSS custom properties via data-cuisine attribute.
   ═══════════════════════════════════════════════════════ */

export type CuisineMode = 'nonveg' | 'veg';

interface ThemeContextType {
  cuisine: CuisineMode;
  setCuisine: (mode: CuisineMode) => void;
  toggleCuisine: () => void;
  isVeg: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [cuisine, setCuisineState] = useState<CuisineMode>('nonveg');

  /* Persist preference */
  useEffect(() => {
    const stored = localStorage.getItem('biryani-cuisine') as CuisineMode | null;
    if (stored === 'veg' || stored === 'nonveg') {
      setCuisineState(stored);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-cuisine', cuisine);
    localStorage.setItem('biryani-cuisine', cuisine);
  }, [cuisine]);

  const setCuisine = useCallback((mode: CuisineMode) => {
    setCuisineState(mode);
  }, []);

  const toggleCuisine = useCallback(() => {
    setCuisineState((prev) => (prev === 'nonveg' ? 'veg' : 'nonveg'));
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        cuisine,
        setCuisine,
        toggleCuisine,
        isVeg: cuisine === 'veg',
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
