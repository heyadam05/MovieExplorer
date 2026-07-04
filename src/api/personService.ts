import type { PersonDetails, PersonDetailsResponse } from '../types/movie'
import { assertAccessToken, tmdb } from './client'
import { toMovie } from './mappers'
import { getGenres } from './movieService'

export async function getPersonDetails(id: number): Promise<PersonDetails> {
  assertAccessToken()
  const [response, genres] = await Promise.all([
    tmdb.get<PersonDetailsResponse>(`/person/${id}`, {
      params: { append_to_response: 'movie_credits' },
    }),
    getGenres(),
  ])
  const person = response.data
  const genreMap = new Map(genres.map((genre) => [genre.id, genre.name]))
  const uniqueMovies = person.movie_credits.cast
    .filter((movie) => movie.release_date && movie.poster_path)
    .sort((first, second) => second.popularity - first.popularity)
    .filter((movie, index, movies) => movies.findIndex((item) => item.id === movie.id) === index)

  return {
    id: person.id,
    name: person.name,
    biography: person.biography,
    birthday: person.birthday,
    deathday: person.deathday,
    placeOfBirth: person.place_of_birth,
    profilePath: person.profile_path,
    department: person.known_for_department,
    movies: uniqueMovies.map((movie) => toMovie(movie, genreMap)),
  }
}

