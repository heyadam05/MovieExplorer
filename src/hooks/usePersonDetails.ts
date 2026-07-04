import { getPersonDetails } from '../api/tmdb'
import { useApiResource } from './useApiResource'

export function usePersonDetails(id: number | null) {
  const resource = useApiResource(id, getPersonDetails, 'This person could not be loaded.')

  return {
    person: resource.data,
    loading: resource.loading,
    error: resource.error,
    retry: resource.retry,
  }
}
