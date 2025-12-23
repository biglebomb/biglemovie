import { hasAuthErrors, validateAuthForm } from './validation'

describe('auth validation', () => {
  it('requires displayName for register', () => {
    const errors = validateAuthForm('register', { displayName: '', email: 'a@b.com', password: '123456' })
    expect(errors.displayName).toBeTruthy()
    expect(hasAuthErrors(errors)).toBe(true)
  })

  it('accepts login with valid email/password', () => {
    const errors = validateAuthForm('login', { email: 'a@b.com', password: '123456' })
    expect(hasAuthErrors(errors)).toBe(false)
  })

  it('rejects invalid email', () => {
    const errors = validateAuthForm('login', { email: 'not-an-email', password: '123456' })
    expect(errors.email).toBeTruthy()
    expect(hasAuthErrors(errors)).toBe(true)
  })
})

