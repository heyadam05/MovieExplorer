import type { Movie, TmdbMovie } from '../types/movie'

export function toMovie(movie: TmdbMovie, genres: Map<number, string>): Movie {
  return {
    id: movie.id,
    title: movie.title,
    year: Number(movie.release_date?.slice(0, 4)) || 0,
    rating: movie.vote_average,
    genre: movie.genre_ids
      .slice(0, 2)
      .map((id) => genres.get(id))
      .filter(Boolean)
      .join(' • ') || 'Movie',
    overview: movie.overview,
    posterPath: movie.poster_path,
    backdropPath: movie.backdrop_path,
    releaseDate: movie.release_date,
  }
}

