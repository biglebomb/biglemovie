import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'

const BASE_URL = 'https://api.themoviedb.org/3'
const cache = new Map<string, Promise<unknown>>()

const TmdbAxios: AxiosInstance = axios.create({
  baseURL: BASE_URL,
})

TmdbAxios.interceptors.request.use((config) => {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY as string | undefined
  if (!apiKey) {
    throw new Error('Missing VITE_TMDB_API_KEY')
  }
  
  const params = config.params || {}
  params.api_key = apiKey
  config.params = params
  
  return config
})

export function clearCache() {
  cache.clear()
}

export const tmdbApi = {
  get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const cacheKey = url
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey) as Promise<T>
    }
    
    const promise = TmdbAxios.get<T>(url, config)
      .then((res) => res.data)
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          throw new Error(`TMDB ${err.response?.status || 'error'}: ${err.message}`)
        }
        throw err
      })
    
    cache.set(cacheKey, promise)
    return promise
  },
  post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return TmdbAxios.post<T>(url, data, config)
      .then((res) => res.data)
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          throw new Error(`TMDB ${err.response?.status || 'error'}: ${err.message}`)
        }
        throw err
      })
  },
  patch<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return TmdbAxios.patch<T>(url, data, config)
      .then((res) => res.data)
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          throw new Error(`TMDB ${err.response?.status || 'error'}: ${err.message}`)
        }
        throw err
      })
  },
  put<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return TmdbAxios.put<T>(url, data, config)
      .then((res) => res.data)
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          throw new Error(`TMDB ${err.response?.status || 'error'}: ${err.message}`)
        }
        throw err
      })
  },
  delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return TmdbAxios.delete<T>(url, config)
      .then((res) => res.data)
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          throw new Error(`TMDB ${err.response?.status || 'error'}: ${err.message}`)
        }
        throw err
      })
  },
}

