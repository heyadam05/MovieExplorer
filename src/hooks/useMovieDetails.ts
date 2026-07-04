import { getMovieDetails } from '../api/tmdb'
import { useApiResource } from './useApiResource'

export function useMovieDetails(id: number | null) {
  const resource = useApiResource(
    id,
    getMovieDetails,
    'This movie could not be loaded. It may no longer be available.',
  )

  return {
    movie: resource.data,
    loading: resource.loading,
    error: resource.error,
    retry: resource.retry,
  }
}

