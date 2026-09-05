import { create } from 'zustand';

export interface EducatorUser {
  id: string;
  name: string;
  email: string;
  school: string;
  language: string;
}

interface AuthState {
  user: EducatorUser | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: EducatorUser, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: {
    id: 't_01',
    name: 'Shri Ramdas Murmu',
    email: 'ramdas@schools.jharkhand.gov.in',
    school: 'Dumka Model Tribal School',
    language: 'santhali',
  },
  token: 'mock-token',
  isAuthenticated: true,
  login: (user, token) => set({ user, token, isAuthenticated: true }),
  logout: () => set({ user: null, token: null, isAuthenticated: false }),
}));
