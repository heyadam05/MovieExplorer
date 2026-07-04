import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import toast from 'react-hot-toast'
import { getMovieDetails } from '../api/tmdb'
import type { Movie } from '../types/movie'
import { movieDetailsToMovie } from '../utils/movie'
import { FavoritesContext } from './favoritesContext'

const STORAGE_KEY = 'movie-explorer-favorites'
const LEGACY_KEY = 'movie-explorer-favorite-ids'

function isMovie(value: unknown): value is Movie {
  if (!value || typeof value !== 'object') return false
  const candidate = value as Partial<Movie>
  return typeof candidate.id === 'number'
    && typeof candidate.title === 'string'
    && typeof candidate.rating === 'number'
    && typeof candidate.genre === 'string'
}

function readFavorites(): Movie[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
    return Array.isArray(value) ? value.filter(isMovie) : []
  } catch {
    return []
  }
}

function readLegacyIds(): number[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(LEGACY_KEY) ?? '[]')
    return Array.isArray(value) ? value.filter((id): id is number => typeof id === 'number') : []
  } catch {
    return []
  }
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Movie[]>(readFavorites)
  const migrationStarted = useRef(false)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    if (migrationStarted.current) return
    migrationStarted.current = true
    let active = true
    const legacyIds = readLegacyIds()
    const missingIds = legacyIds.filter((id) => !favorites.some((movie) => movie.id === id))
    if (missingIds.length === 0) return

    void Promise.all(missingIds.map((id) => getMovieDetails(id)))
      .then((details) => {
        if (!active) return
        const migrated = details.map(movieDetailsToMovie)
        setFavorites((current) => [
          ...current,
          ...migrated.filter((movie) => !current.some((saved) => saved.id === movie.id)),
        ])
        localStorage.removeItem(LEGACY_KEY)
      })
      .catch(() => undefined)

    return () => {
      active = false
    }
  }, [favorites])

  const value = useMemo(() => ({
    favorites,
    isFavorite: (id: number) => favorites.some((movie) => movie.id === id),
    toggleFavorite: (movie: Movie) => {
      const exists = favorites.some((item) => item.id === movie.id)

      setFavorites((current) => {
        if (exists) return current.filter((item) => item.id !== movie.id)
        return current.some((item) => item.id === movie.id) ? current : [...current, movie]
      })
      toast.success(exists ? `${movie.title} removed from favorites` : `${movie.title} added to favorites`, {
        id: `favorite-${movie.id}`,
        icon: exists ? '💔' : '❤️',
      })
    },
    clearFavorites: () => {
      setFavorites([])
      toast.success('Favorites cleared')
    },
  }), [favorites])

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}
