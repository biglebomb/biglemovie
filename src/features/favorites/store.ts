import _ from 'lodash'
import { create } from 'zustand'
import { getFavoritesForUser, setFavoritesForUser } from './storage'

type FavoritesState = {
  userId: string | null
  favorites: number[]
  setUser: (userId: string | null) => void
  isFavorite: (movieId: number) => boolean
  toggleFavorite: (movieId: number) => void
  removeFavorite: (movieId: number) => void
  clearFavorites: () => void
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  userId: null,
  favorites: [],
  setUser(userId) {
    set({ userId, favorites: userId ? getFavoritesForUser(userId) : [] })
  },
  isFavorite(movieId) {
    return _.includes(get().favorites, movieId)
  },
  toggleFavorite(movieId) {
    const { userId, favorites } = get()
    if (!userId) return
    const next = _.includes(favorites, movieId) ? _.without(favorites, movieId) : [...favorites, movieId]
    setFavoritesForUser(userId, next)
    set({ favorites: next })
  },
  removeFavorite(movieId) {
    const { userId, favorites } = get()
    if (!userId) return
    const next = _.without(favorites, movieId)
    setFavoritesForUser(userId, next)
    set({ favorites: next })
  },
  clearFavorites() {
    const { userId } = get()
    if (!userId) return
    setFavoritesForUser(userId, [])
    set({ favorites: [] })
  },
}))
