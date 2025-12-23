export function posterUrl(path: string | null, size: 'w185' | 'w342' | 'w500' = 'w342') {
  if (!path) return null
  return `https://image.tmdb.org/t/p/${size}${path}`
}

export function profileUrl(path: string | null, size: 'w185' | 'w342' = 'w185') {
  if (!path) return null
  return `https://image.tmdb.org/t/p/${size}${path}`
}

