function getKey(userId: string) {
  return `biglemovie.favorites.${userId}`
}

export function getFavoritesForUser(userId: string): number[] {
  const key = getKey(userId)
  const data = localStorage.getItem(key)
  if (!data) return []
  try {
    return JSON.parse(data) as number[]
  } catch {
    return []
  }
}

export function setFavoritesForUser(userId: string, favorites: number[]) {
  localStorage.setItem(getKey(userId), JSON.stringify(favorites))
}
