import { create } from 'zustand'

type Role = 'admin' | 'designer' | 'user'

export interface AuthUser {
  id: string
  email: string
  role: Role
}

interface AuthState {
  token: string | null
  user: AuthUser | null
  login: (params: { token: string; user: AuthUser }) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  login: ({ token, user }) => set({ token, user }),
  logout: () => set({ token: null, user: null }),
}))


