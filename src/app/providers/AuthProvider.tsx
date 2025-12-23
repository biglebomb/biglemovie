import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { User } from '../../features/auth/types'
import {
  clearSession,
  createEmailUser,
  createGoogleUser,
  findUser,
  getSession,
  getUsers,
  setSession,
  setUsers,
} from '../../features/auth/storage'
import { hashPassword } from '../../features/auth/crypto'
import { useFavoritesStore } from '@/features/favorites/store'

type AuthContextValue = {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  registerWithEmail: (input: { email: string; password: string; displayName: string }) => Promise<void>
  loginWithEmail: (input: { email: string; password: string }) => Promise<void>
  loginWithGoogle: (displayName: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Restore user from session on mount
  useEffect(() => {
    const session = getSession()
    if (session) {
      const users = getUsers()
      const found = users.find((u) => u.id === session.userId)
      if (found) {
        setUser(found)
        useFavoritesStore.getState().setUser(found.id)
      } else {
        // Session exists but user not found, clear invalid session
        clearSession()
      }
    }
    setIsLoading(false)
  }, [])

  function loginUser(user: User) {
    setSession({ userId: user.id, createdAt: Date.now() })
    useFavoritesStore.getState().setUser(user.id)
    setUser(user)
  }

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      async registerWithEmail({ email, password, displayName }) {
        const normalizedEmail = email.trim().toLowerCase()
        const users = getUsers()
        if (findUser(users, normalizedEmail)) throw new Error('Email already registered')
        const passwordHash = hashPassword(password)
        const newUser = createEmailUser(normalizedEmail, displayName, passwordHash)
        setUsers([...users, newUser])
        loginUser(newUser)
      },
      async loginWithEmail({ email, password }) {
        const normalizedEmail = email.trim().toLowerCase()
        const users = getUsers()
        const found = findUser(users, normalizedEmail)
        if (!found) throw new Error('Invalid email or password')
        const passwordHash = hashPassword(password)
        if (found.passwordHash !== passwordHash) throw new Error('Invalid email or password')
        loginUser(found)
      },
      async loginWithGoogle(displayName) {
        const users = getUsers()
        const googleUser = createGoogleUser(displayName)
        setUsers([...users, googleUser])
        loginUser(googleUser)
      },
      logout() {
        clearSession()
        useFavoritesStore.getState().setUser(null)
        setUser(null)
      },
    }),
    [user, isLoading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
