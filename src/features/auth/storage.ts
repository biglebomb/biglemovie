import type { Session, User } from './types'

const USERS_KEY = 'biglemovie.users'
const SESSION_KEY = 'biglemovie.session'

export function getUsers(): User[] {
  const data = localStorage.getItem(USERS_KEY)
  if (!data) return []
  try {
    return JSON.parse(data) as User[]
  } catch {
    return []
  }
}

export function setUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function getSession(): Session | null {
  const data = localStorage.getItem(SESSION_KEY)
  if (!data) return null
  try {
    return JSON.parse(data) as Session
  } catch {
    return null
  }
}

export function setSession(session: Session) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY)
}

export function findUser(users: User[], email: string) {
  return users.find((u) => u.provider === 'email' && u.email?.toLowerCase() === email.toLowerCase())
}

export function createEmailUser(email: string, displayName: string, passwordHash: string): User {
  return {
    id: `email:${email}`,
    provider: 'email',
    email,
    displayName,
    passwordHash,
    createdAt: Date.now(),
  }
}

export function createGoogleUser(displayName: string): User {
  const providerUserId = crypto.randomUUID()
  return {
    id: `google:${providerUserId}`,
    provider: 'google',
    providerUserId,
    displayName,
    createdAt: Date.now(),
  }
}
