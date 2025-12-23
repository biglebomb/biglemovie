import { Navigate, Route, Routes } from 'react-router-dom'
import { RequireAuth } from './RequireAuth'
import { AppLayout } from './AppLayout'
import { AuthPage } from '../pages/AuthPage'
import { HomePage } from '../pages/HomePage'
import { MovieDetailsPage } from '../pages/MovieDetailsPage'
import { FavoritesPage } from '../pages/FavoritesPage'
import { NotFoundPage } from '../pages/NotFoundPage'

export function App() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route
        element={
          <RequireAuth>
            <AppLayout />
          </RequireAuth>
        }
      >
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:id" element={<MovieDetailsPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Route>
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  )
}

