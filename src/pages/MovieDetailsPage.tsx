import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { Star } from 'lucide-react'
import { tmdb } from '../lib/tmdb/client'
import { useAsync } from '../lib/hooks/useAsync'
import { ErrorState } from '@/components/common/ErrorState'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { profileUrl } from '../features/movies/image'

function pickTrailer(videos: { site: string; type: string; key: string }[]) {
  const youtube = videos.find((v) => v.site === 'YouTube' && v.type === 'Trailer')
  return youtube?.key ?? null
}

export function MovieDetailsPage() {
  const params = useParams()
  const id = Number(params.id)

  const { data, error, loading } = useAsync(
    async () => {
      if (!Number.isFinite(id)) throw new Error('Invalid movie id')
      const [details, credits, videos] = await Promise.all([
        tmdb.getMovieDetails(id),
        tmdb.getCredits(id),
        tmdb.getVideos(id),
      ])
      return { details, credits, videos }
    },
    [id],
  )

  const trailerKey = useMemo(() => (data ? pickTrailer(data.videos.results) : null), [data])

  if (loading) {
    return (
      <div className="grid gap-5" aria-label="Loading movie details">
        <Skeleton className="h-[220px] w-full rounded-xl" />
        <Skeleton className="h-[420px] w-full rounded-xl" />
      </div>
    )
  }
  if (error) return <ErrorState title="Could not load movie" message={error.message} />
  if (!data) return null

  const year = data.details.release_date?.slice(0, 4) || '—'
  const genres = data.details.genres || []
  const cast = [...data.credits.cast].sort((a, b) => a.order - b.order).slice(0, 12)

  return (
    <div className="grid gap-6">
      <header className="grid gap-2">
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          {data.details.title} <span className="text-muted-foreground">({year})</span>
        </h1>
        <div className="m-0 flex flex-wrap items-center gap-x-4 gap-y-2">
          {genres.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {genres.map((genre) => (
                <Badge key={genre.id} variant="outline" className="text-sm py-0.5">
                  {genre.name}
                </Badge>
              ))}
            </div>
          ) : (
            <span className="text-sm text-muted-foreground">—</span>
          )}
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground" aria-label={`Rating ${data.details.vote_average.toFixed(1)} out of 10`}>
            <Star className="h-3.5 w-3.5" />
            {data.details.vote_average.toFixed(1)}
          </span>
        </div>
        <p className="m-0 leading-relaxed">{data.details.overview}</p>
      </header>

      {trailerKey && (
        <section className="grid gap-3" aria-label="Trailer">
          <h2 className="text-lg font-bold tracking-tight">Trailer</h2>
          <div className="relative overflow-hidden rounded-xl border bg-muted pt-[56.25%]">
            <iframe
              title="Trailer"
              className="absolute inset-0 h-full w-full border-0"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </section>
      )}

      <section className="grid gap-3" aria-label="Cast">
        <h2 className="text-lg font-bold tracking-tight">Cast</h2>
        <ul className="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2">
          {cast.map((c) => {
            const img = profileUrl(c.profile_path)
            return (
              <li key={c.id} className="grid grid-cols-[56px,1fr] items-center gap-3 rounded-xl border bg-card p-3">
                {img ? (
                  <img src={img} alt="" className="h-14 w-14 rounded-xl bg-muted object-cover" loading="lazy" />
                ) : (
                  <div className="h-14 w-14 rounded-xl bg-muted" />
                )}
                <div>
                  <div className="font-semibold">{c.name}</div>
                  <div className="text-sm text-muted-foreground">{c.character}</div>
                </div>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}

