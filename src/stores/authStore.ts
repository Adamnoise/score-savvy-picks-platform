
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type User = {
  id: string
  name: string
  email: string
  avatar?: string
}

type AuthState = {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  reset: () => void
  setUser: (user: User | null) => void
  setToken: (token: string | null) => void
}

export const useAuthStore = create<{ auth: AuthState }>()(
  persist(
    (set) => ({
      auth: {
        user: null,
        token: null,
        isAuthenticated: false,
        reset: () => {
          set((state) => ({
            auth: {
              ...state.auth,
              user: null,
              token: null,
              isAuthenticated: false,
            },
          }))
        },
        setUser: (user) => {
          set((state) => ({
            auth: {
              ...state.auth,
              user,
              isAuthenticated: !!user,
            },
          }))
        },
        setToken: (token) => {
          set((state) => ({
            auth: {
              ...state.auth,
              token,
              isAuthenticated: !!token,
            },
          }))
        },
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
