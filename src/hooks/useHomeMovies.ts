import { useCallback, useEffect, useState } from 'react'
import { getHomeMovies, type HomeMovies } from '../api/tmdb'

export function useHomeMovies() {
  const [data, setData] = useState<HomeMovies | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadMovies = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      setData(await getHomeMovies())
    } catch {
      setError('We could not load movies right now. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    let active = true

    void getHomeMovies()
      .then((movies) => {
        if (active) setData(movies)
      })
      .catch(() => {
        if (active) setError('We could not load movies right now. Please try again.')
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  return { data, loading, error, retry: loadMovies }
}
