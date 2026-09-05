import { create } from 'zustand';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'superadmin' | 'moderator';
}

interface AdminAuthState {
  user: AdminUser | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: AdminUser, token: string) => void;
  logout: () => void;
}

export const useAdminAuthStore = create<AdminAuthState>((set) => ({
  user: {
    id: 'adm_01',
    name: 'State Education Officer',
    email: 'admin@janbhasha.jharkhand.gov.in',
    role: 'superadmin',
  },
  token: 'mock-admin-token',
  isAuthenticated: true,
  login: (user, token) => set({ user, token, isAuthenticated: true }),
  logout: () => set({ user: null, token: null, isAuthenticated: false }),
}));
