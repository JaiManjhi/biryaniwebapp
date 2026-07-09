'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react';
import type { User, AuthState, LoginCredentials, RegisterData } from '@/types/user';

/* ═══════════════════════════════════════════════════════
   Auth Context — Manages authentication state
   
   Provides login, register, logout, and profile refresh.
   Token is stored in HTTP-only cookie (server-side)
   and optionally in localStorage for client checks.
   ═══════════════════════════════════════════════════════ */

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; message: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  /* Check auth on mount */
  useEffect(() => {
    const token = localStorage.getItem('biryani-token');
    if (token) {
      refreshProfile().catch(() => {
        localStorage.removeItem('biryani-token');
        setState({ user: null, isAuthenticated: false, isLoading: false });
      });
    } else {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshProfile = useCallback(async () => {
    try {
      const token = localStorage.getItem('biryani-token');
      const res = await fetch('/api/v1/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (data.success && data.data) {
        setState({
          user: data.data as User,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        setState({ user: null, isAuthenticated: false, isLoading: false });
        localStorage.removeItem('biryani-token');
      }
    } catch {
      setState({ user: null, isAuthenticated: false, isLoading: false });
    }
  }, []);

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      try {
        const res = await fetch('/api/v1/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials),
        });
        const data = await res.json();

        if (data.success && data.data) {
          localStorage.setItem('biryani-token', data.data.token);
          setState({
            user: data.data.user as User,
            isAuthenticated: true,
            isLoading: false,
          });
          return { success: true, message: data.message };
        }

        return { success: false, message: data.message || 'Login failed' };
      } catch {
        return { success: false, message: 'Network error' };
      }
    },
    []
  );

  const register = useCallback(
    async (data: RegisterData) => {
      try {
        const res = await fetch('/api/v1/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        const result = await res.json();

        if (result.success && result.data) {
          localStorage.setItem('biryani-token', result.data.token);
          setState({
            user: result.data.user as User,
            isAuthenticated: true,
            isLoading: false,
          });
          return { success: true, message: result.message };
        }

        return { success: false, message: result.message || 'Registration failed' };
      } catch {
        return { success: false, message: 'Network error' };
      }
    },
    []
  );

  const logout = useCallback(async () => {
    try {
      await fetch('/api/v1/auth/me', { method: 'POST' });
    } catch {
      /* Ignore errors — we're clearing client state regardless */
    }
    localStorage.removeItem('biryani-token');
    setState({ user: null, isAuthenticated: false, isLoading: false });
  }, []);

  return (
    <AuthContext.Provider
      value={{ ...state, login, register, logout, refreshProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
