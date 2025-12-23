import _ from 'lodash'
import { useMemo } from 'react'
import { useFavorites } from '@/features/favorites/useFavorites'
import { tmdb } from '../lib/tmdb/client'
import { useAsync } from '../lib/hooks/useAsync'
import { ErrorState } from '@/components/common/ErrorState'
import { MovieCard } from '../features/movies/MovieCard'
import { Skeleton } from '@/components/ui/skeleton'

export function FavoritesPage() {
  const { favorites } = useFavorites()
  const ids = useMemo(() => [...favorites], [favorites])

  const { data, error, loading } = useAsync(
    async () => {
      const results = await Promise.all(ids.map((id) => tmdb.getMovieDetails(id).catch(() => null)))
      return _.compact(results)
    },
    [ids.join(',')],
  )

  return (
    <div className="grid gap-4">
      <h1 className="text-2xl font-extrabold tracking-tight">Favorites</h1>
      {favorites.length === 0 && (
        <p className="m-0 text-sm text-muted-foreground">No favorites yet. Add some from movie cards.</p>
      )}

      {loading && favorites.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {Array.from({ length: Math.min(10, favorites.length) }).map((_, i) => (
            <Skeleton key={i} className="h-[260px] rounded-xl" />
          ))}
        </div>
      )}
      {error && <ErrorState title="Could not load favorites" message={error.message} />}
      {data && data.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {data.map((m) => (
            <MovieCard key={m.id} movie={m} />
          ))}
        </div>
      )}
    </div>
  )
}
