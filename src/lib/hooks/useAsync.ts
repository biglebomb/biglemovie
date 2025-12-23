import { useEffect, useState } from 'react'

export function useAsync<T>(fn: () => Promise<T>, deps: unknown[]) {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    setLoading(true)
    setError(null)
    fn()
      .then((result) => {
        if (!active) return
        setData(result)
      })
      .catch((err: unknown) => {
        if (!active) return
        setError(err instanceof Error ? err : new Error('Unknown error'))
      })
      .finally(() => {
        if (!active) return
        setLoading(false)
      })
    return () => {
      active = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return { data, error, loading }
}

