import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { api } from '../lib/api'

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

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      login: ({ token, user }) => set({ token, user }),
      logout: () => {
        const token = get().token
        // best-effort server-side logout to blacklist current token
        if (token) {
          api.post('/auth/logout', token).catch(() => {})
        }
        set({ token: null, user: null })
      },
    }),
    { name: 'havenly-auth' },
  ),
)


