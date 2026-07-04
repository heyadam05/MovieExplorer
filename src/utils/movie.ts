import type { Movie, MovieDetails } from '../types/movie'

export function movieDetailsToMovie(movie: MovieDetails): Movie {
  return {
    id: movie.id,
    title: movie.title,
    year: Number(movie.releaseDate.slice(0, 4)) || 0,
    rating: movie.rating,
    genre: movie.genres.map((genre) => genre.name).join(' • ') || 'Movie',
    overview: movie.overview,
    posterPath: movie.posterPath,
    backdropPath: movie.backdropPath,
    releaseDate: movie.releaseDate,
  }
}

