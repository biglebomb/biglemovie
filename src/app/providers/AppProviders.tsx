import type { ReactNode } from 'react'
import { AuthProvider } from './AuthProvider'
import { ThemeProvider } from './ThemeProvider'
import { I18nProvider } from './I18nProvider'

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <I18nProvider>
        <AuthProvider>{children}</AuthProvider>
      </I18nProvider>
    </ThemeProvider>
  )
}
