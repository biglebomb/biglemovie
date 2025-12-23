export type User = {
  id: string
  provider: 'email' | 'google'
  displayName: string
  createdAt: number
  email?: string
  passwordHash?: string
  providerUserId?: string
}

export type Session = {
  userId: string
  createdAt: number
}

