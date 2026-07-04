import { useEffect, useState } from 'react'
import { searchMovies, type MovieSearchParams, type MovieSearchResult } from '../api/tmdb'
import type { Movie } from '../types/movie'

export function useMovieSearch(params: MovieSearchParams) {
  const [movies, setMovies] = useState<Movie[]>([])
  const [meta, setMeta] = useState<Omit<MovieSearchResult, 'movies'> | null>(null)
  const [settledRequest, setSettledRequest] = useState('')
  const [errorState, setErrorState] = useState<{ key: string; message: string } | null>(null)
  const [retryKey, setRetryKey] = useState(0)
  const requestKey = `${JSON.stringify(params)}:${retryKey}`

  useEffect(() => {
    let active = true
    const isMore = (params.page ?? 1) > 1

    void searchMovies(params)
      .then((result) => {
        if (!active) return
        setMovies((current) => isMore ? [...current, ...result.movies.filter(
          (movie) => !current.some((existing) => existing.id === movie.id),
        )] : result.movies)
        setMeta({
          page: result.page,
          totalPages: result.totalPages,
          totalResults: result.totalResults,
          genres: result.genres,
        })
        setErrorState(null)
      })
      .catch(() => {
        if (active) {
          setErrorState({ key: requestKey, message: 'Movie results could not be loaded. Please try again.' })
        }
      })
      .finally(() => {
        if (active) setSettledRequest(requestKey)
      })

    return () => {
      active = false
    }
  }, [params, requestKey])

  const pending = settledRequest !== requestKey
  const loadingMore = pending && (params.page ?? 1) > 1
  const loading = pending && !loadingMore
  const error = errorState?.key === requestKey ? errorState.message : null

  return {
    movies,
    ...meta,
    loading,
    loadingMore,
    error,
    retry: () => setRetryKey((value) => value + 1),
  }
}
