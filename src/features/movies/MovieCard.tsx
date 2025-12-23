import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Star, Heart } from 'lucide-react'
import type { MovieSummary } from '../../lib/tmdb/types'
import { useFavorites } from '@/features/favorites/useFavorites'
import { posterUrl } from './image'
import { getGenreNames } from './genres'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export function MovieCard({ movie }: { movie: MovieSummary }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const favorite = isFavorite(movie.id)
  const year = movie.release_date?.slice(0, 4) || '—'
  const poster = posterUrl(movie.poster_path, 'w342')

  const [showOverlay, setShowOverlay] = useState(false)

  const handleMouseEnter = () => setShowOverlay(true)
  const handleMouseLeave = () => setShowOverlay(false)
  
  function handleFavoriteClick(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(movie.id)
  }

  const hasOverview = movie.overview && movie.overview.trim().length > 0
  const genres = movie.genre_ids ? getGenreNames(movie.genre_ids).slice(0, 3) : []

  return (
    <Card className={cn('overflow-hidden transition-all duration-300', favorite && 'outline-2 outline-primary outline')}>
      <Link className="block text-inherit no-underline h-full" to={`/movie/${movie.id}`} aria-label={`Open details for ${movie.title}`}>
        <div className="flex sm:flex-col sm:aspect-[2/3] sm:h-auto">
          <div
            className="relative w-1/2 sm:w-full h-[280px] sm:aspect-[2/3] bg-muted shrink-0 flex items-center justify-center"
            aria-hidden="true"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {poster ? (
              <img className="h-full w-full object-contain sm:object-cover" src={poster} alt="" loading="lazy" />
            ) : (
              <div className="grid h-full w-full place-items-center text-sm text-muted-foreground">No poster</div>
            )}
            {hasOverview && (
              <div className={cn(
                'hidden sm:flex absolute inset-0 rounded-t-xl bg-background/90 backdrop-blur-sm transition-opacity duration-300',
                showOverlay ? 'opacity-100' : 'opacity-0 pointer-events-none'
              )}>
                <div className="w-full h-full overflow-y-auto p-4">
                  <p className="text-sm leading-relaxed text-foreground">{movie.overview}</p>
                </div>
              </div>
            )}
          </div>

          <div className="w-1/2 sm:w-full flex flex-col">
            {hasOverview && (
              <div className="flex-[0.7] sm:hidden overflow-y-auto p-3 bg-muted/30">
                <p className="text-sm leading-relaxed text-foreground">{movie.overview}</p>
              </div>
            )}

            <div className="flex-[0.3] sm:flex-none grid gap-2 p-3">
              <div className="flex items-center gap-2">
                <h3 className="flex-1 line-clamp-2 text-sm font-semibold leading-snug min-h-[2.75rem] sm:min-h-0">{movie.title}</h3>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className={cn(
                    'shrink-0 h-8 w-8 ml-auto',
                    favorite && 'text-primary hover:text-primary',
                  )}
                  aria-pressed={favorite}
                  aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
                  onClick={handleFavoriteClick}
                >
                  <Heart className={cn('h-5 w-5', favorite && 'fill-current')} />
                </Button>
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {year}
                </span>
                <span className="flex items-center gap-1.5" aria-label={`Rating ${movie.vote_average.toFixed(1)} out of 10`}>
                  <Star className="h-3.5 w-3.5" />
                  {movie.vote_average.toFixed(1)}
                </span>
              </div>
              {genres.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {genres.map((genre) => (
                    <Badge key={genre} variant="outline" className="text-sm py-0.5">
                      {genre}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </Card>
  )
}
