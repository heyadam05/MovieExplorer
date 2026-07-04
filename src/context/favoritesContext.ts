import { createContext } from 'react'
import type { Movie } from '../types/movie'

export interface FavoritesContextValue {
  favorites: Movie[]
  isFavorite: (id: number) => boolean
  toggleFavorite: (movie: Movie) => void
  clearFavorites: () => void
}

export const FavoritesContext = createContext<FavoritesContextValue | null>(null)

