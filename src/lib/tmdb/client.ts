import _ from 'lodash'
import type { Credits, MovieDetails, MovieSummary, PagedResponse, VideosResponse } from './types'
import { tmdbApi, clearCache } from './axios'

function toQuery(params: Record<string, string | number | undefined>) {
  const filtered = _.pickBy(params, (value) => value !== undefined && value !== '')
  const stringified = _.mapValues(filtered, String)
  return new URLSearchParams(stringified).toString()
}

export const tmdb = {
  clearCache,
  getPopular(page = 1) {
    return tmdbApi.get<PagedResponse<MovieSummary>>(`/movie/popular?${toQuery({ page })}`)
  },
  getNowPlaying(page = 1) {
    return tmdbApi.get<PagedResponse<MovieSummary>>(`/movie/now_playing?${toQuery({ page })}`)
  },
  getUpcoming(page = 1) {
    return tmdbApi.get<PagedResponse<MovieSummary>>(`/movie/upcoming?${toQuery({ page })}`)
  },
  getTopRated(page = 1) {
    return tmdbApi.get<PagedResponse<MovieSummary>>(`/movie/top_rated?${toQuery({ page })}`)
  },
  searchMovies(query: string, page = 1) {
    return tmdbApi.get<PagedResponse<MovieSummary>>(`/search/movie?${toQuery({ query, page, include_adult: 'false' })}`)
  },
  getMovieDetails(id: number) {
    return tmdbApi.get<MovieDetails>(`/movie/${id}`)
  },
  getCredits(id: number) {
    return tmdbApi.get<Credits>(`/movie/${id}/credits`)
  },
  getVideos(id: number) {
    return tmdbApi.get<VideosResponse>(`/movie/${id}/videos`)
  },
}

