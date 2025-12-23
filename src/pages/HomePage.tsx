import { useState } from 'react'
import type { FormEvent } from 'react'
import { Search } from 'lucide-react'
import { useAsync } from '../lib/hooks/useAsync'
import { useDebouncedValue } from '../lib/hooks/useDebouncedValue'
import { tmdb } from '../lib/tmdb/client'
import type { MovieSummary, PagedResponse } from '../lib/tmdb/types'
import { ErrorState } from '@/components/common/ErrorState'
import { MovieCard } from '../features/movies/MovieCard'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'

type SectionProps = { title: string; query: () => Promise<PagedResponse<MovieSummary>> }

function Section({ title, query }: SectionProps) {
  const { data, error, loading } = useAsync(query, [title])
  return (
    <section className="grid gap-3" aria-label={title}>
      <h2 className="text-lg font-bold tracking-tight">{title}</h2>
      {loading && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-[260px] rounded-xl" />
          ))}
        </div>
      )}
      {error && <ErrorState title="Error" message={error.message} />}
      {data && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {data.results.slice(0, 12).map((m) => (
            <MovieCard key={m.id} movie={m} />
          ))}
        </div>
      )}
    </section>
  )
}

export function HomePage() {
  const [query, setQuery] = useState('')
  const debounced = useDebouncedValue(query, 350)

  const shouldSearch = debounced.trim().length >= 2
  const { data: searchData, error: searchError, loading: searchLoading } = useAsync(
    () => (shouldSearch ? tmdb.searchMovies(debounced.trim()) : Promise.resolve(null)),
    [debounced, shouldSearch],
  )

  const searchHeading = shouldSearch ? `Results for "${debounced.trim()}"` : null

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={onSubmit} className="flex justify-center" role="search" aria-label="Search movies">
        <div className="relative w-full max-w-xl">
          <Input
            name="keywords"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            className="pr-10"
          />
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>
      </form>

      {shouldSearch ? (
        <>
          {searchHeading && <h2 className="text-lg font-bold tracking-tight">{searchHeading}</h2>}
          {searchLoading && (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {Array.from({ length: 10 }).map((_, i) => (
                <Skeleton key={i} className="h-[260px] rounded-xl" />
              ))}
            </div>
          )}
          {searchError && <ErrorState title="Error" message={searchError.message} />}
          {searchData?.results && (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {searchData.results.slice(0, 12).map((m) => (
                <MovieCard key={m.id} movie={m} />
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          <Section title="Popular" query={() => tmdb.getPopular()} />
          <Section title="Now Playing" query={() => tmdb.getNowPlaying()} />
          <Section title="Upcoming" query={() => tmdb.getUpcoming()} />
          <Section title="Top Rated" query={() => tmdb.getTopRated()} />
        </>
      )}
    </div>
  )
}
