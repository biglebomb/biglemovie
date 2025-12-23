export type PagedResponse<T> = {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}

export type MovieSummary = {
  id: number
  title: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  vote_count: number
  overview: string
  genre_ids?: number[]
}

export type Genre = { id: number; name: string }

export type MovieDetails = MovieSummary & {
  genres: Genre[]
  runtime: number | null
  tagline: string | null
  status: string
}

export type CastMember = {
  id: number
  name: string
  character: string
  profile_path: string | null
  order: number
}

export type Credits = {
  id: number
  cast: CastMember[]
}

export type Video = {
  id: string
  key: string
  site: string
  type: string
  name: string
}

export type VideosResponse = {
  id: number
  results: Video[]
}

