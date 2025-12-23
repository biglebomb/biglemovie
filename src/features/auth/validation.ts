import _ from 'lodash'

export type AuthMode = 'login' | 'register'

export type AuthFields = {
  displayName?: string
  email: string
  password: string
}

export type AuthErrors = Partial<Record<keyof AuthFields, string>>

export function validateEmail(email: string): string | undefined {
  const trimmed = email.trim()
  if (!trimmed) return 'Email is required'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return 'Enter a valid email address'
}

export function validatePassword(password: string) {
  if (!password) return 'Password is required'
  if (password.length < 6) return 'Password must be at least 6 characters'
}

export function validateDisplayName(displayName: string) {
  const name = displayName.trim()
  if (!name) return 'Display name is required'
  if (name.length < 2) return 'Display name is too short'
}

export function validateAuthForm(mode: AuthMode, fields: AuthFields): AuthErrors {
  const errors: AuthErrors = {}
  if (mode === 'register') {
    const displayNameError = validateDisplayName(fields.displayName ?? '')
    if (displayNameError) errors.displayName = displayNameError
  }
  const emailError = validateEmail(fields.email)
  if (emailError) errors.email = emailError
  const passwordError = validatePassword(fields.password)
  if (passwordError) errors.password = passwordError
  return errors
}

export function hasAuthErrors(errors: AuthErrors) {
  return _.some(_.values(errors), Boolean)
}

