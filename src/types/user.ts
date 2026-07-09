/* ═══════════════════════════════════════════════════════
   TypeScript Types — User & Auth
   ═══════════════════════════════════════════════════════ */

export interface Address {
  label: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

export interface User {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  avatar?: string;
  addresses: Address[];
  favorites: string[];
  role: 'customer';
  loyaltyPoints: number;
  isVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type AdminRole = 'manager' | 'admin' | 'superadmin';

export interface Admin {
  _id: string;
  name: string;
  email: string;
  role: AdminRole;
  permissions: string[];
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
