import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../app/providers/AuthProvider'
import { useI18n } from '../app/providers/I18nProvider'
import { useFormField } from '../lib/hooks/useFormField'
import { TextField } from '@/components/form/TextField'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ErrorState } from '@/components/common/ErrorState'
import {
  hasAuthErrors,
  type AuthMode,
  validateAuthForm,
  validateDisplayName,
  validateEmail,
  validatePassword,
} from '../features/auth/validation'

export function AuthPage() {
  const { t } = useI18n()
  const auth = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const next = searchParams.get('next') || '/'

  const [mode, setMode] = useState<AuthMode>('login')
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const displayName = useFormField('', { validate: validateDisplayName })
  const email = useFormField('', { validate: validateEmail })
  const password = useFormField('', { validate: validatePassword })

  const title = useMemo(() => (mode === 'login' ? 'Login' : 'Create account'), [mode])

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitError(null)

    const errors = validateAuthForm(mode, { displayName: displayName.value, email: email.value, password: password.value })
    displayName.setError(errors.displayName)
    email.setError(errors.email)
    password.setError(errors.password)
    displayName.setTouched(true)
    email.setTouched(true)
    password.setTouched(true)
    if (hasAuthErrors(errors)) return

    setSubmitting(true)
    try {
      if (mode === 'register') {
        await auth.registerWithEmail({
          displayName: displayName.value.trim(),
          email: email.value.trim(),
          password: password.value,
        })
      } else {
        await auth.loginWithEmail({ email: email.value.trim(), password: password.value })
      }
      navigate(next, { replace: true })
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to authenticate')
    } finally {
      setSubmitting(false)
    }
  }

  async function onGoogle() {
    setSubmitError(null)
    const name = window.prompt(t('displayNamePrompt'))
    if (!name) return
    const error = validateDisplayName(name)
    if (error) {
      setSubmitError(error)
      return
    }
    setSubmitting(true)
    try {
      await auth.loginWithGoogle(name.trim())
      navigate(next, { replace: true })
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to sign in with Google')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-dvh px-4 py-8">
      <div className="mx-auto grid w-full max-w-md gap-4">
        <header className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight">{t('authTitle')}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{t('authSubtitle')}</p>
        </header>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{title}</CardTitle>
            <Tabs value={mode} onValueChange={(v) => setMode(v as AuthMode)}>
              <TabsList className="w-full">
                <TabsTrigger className="flex-1" value="login">
                  Login
                </TabsTrigger>
                <TabsTrigger className="flex-1" value="register">
                  Register
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>

          <CardContent className="grid gap-4">
            <form className="grid gap-3" onSubmit={onSubmit} noValidate aria-label={title}>
              {mode === 'register' && (
                <TextField
                  label="Display name"
                  name="displayName"
                  autoComplete="name"
                  error={displayName.touched ? displayName.error : undefined}
                  {...displayName.inputProps}
                />
              )}
              <TextField
                label="Email"
                type="email"
                name="email"
                autoComplete="email"
                error={email.touched ? email.error : undefined}
                {...email.inputProps}
              />
              <TextField
                label="Password"
                type="password"
                name="password"
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                error={password.touched ? password.error : undefined}
                {...password.inputProps}
              />

              {submitError && <ErrorState title="Error" message={submitError} />}

              <Button type="submit" disabled={submitting} className="w-full">
                {mode === 'login' ? 'Login' : 'Create account'}
              </Button>
            </form>

            <Separator />

            <Button type="button" variant="secondary" onClick={onGoogle} disabled={submitting} className="w-full">
              {t('continueGoogle')}
            </Button>

            <p className="text-xs text-muted-foreground">
              Passwords are hashed with SHA-256 via Web Crypto (educational use only; no server-side security).
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
