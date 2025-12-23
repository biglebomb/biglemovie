import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './providers/AuthProvider'

export function RequireAuth({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="grid min-h-dvh place-items-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }
  if (!isAuthenticated) {
    const next = encodeURIComponent(location.pathname + location.search)
    return <Navigate to={`/auth?next=${next}`} replace />
  }
  return <>{children}</>
}
