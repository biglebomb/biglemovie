import { useFavoritesStore } from './store'

export function useFavorites() {
  const store = useFavoritesStore()
  return {
    favorites: store.favorites,
    isFavorite: store.isFavorite,
    toggleFavorite: store.toggleFavorite,
    removeFavorite: store.removeFavorite,
    clearFavorites: store.clearFavorites,
  }
}

