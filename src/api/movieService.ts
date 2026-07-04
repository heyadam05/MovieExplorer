import type {
  Genre,
  GenresResponse,
  Movie,
  MovieDetails,
  MovieDetailsResponse,
  PersonSearchResponse,
  TmdbListResponse,
  TmdbMovie,
} from '../types/movie'
import { assertAccessToken, tmdb } from './client'
import { toMovie } from './mappers'

export interface MovieSearchParams {
  query?: string
  genre?: string
  year?: string
  rating?: string
  sort?: string
  language?: string
  page?: number
  category?: string
}

export interface MovieSearchResult {
  movies: Movie[]
  page: number
  totalPages: number
  totalResults: number
  genres: Genre[]
}

export interface HomeMovies {
  trending: Movie[]
  popular: Movie[]
  topRated: Movie[]
  upcoming: Movie[]
}

const CATEGORY_PATHS: Record<string, string> = {
  popular: '/movie/popular',
  'top-rated': '/movie/top_rated',
  upcoming: '/movie/upcoming',
}

export async function getGenres(): Promise<Genre[]> {
  const response = await tmdb.get<GenresResponse>('/genre/movie/list')
  return response.data.genres
}

async function searchByText(params: MovieSearchParams): Promise<TmdbListResponse> {
  const query = params.query?.trim() ?? ''
  const commonParams = { page: params.page ?? 1, include_adult: false }
  const [movieResponse, personResponse] = await Promise.all([
    tmdb.get<TmdbListResponse>('/search/movie', {
      params: { ...commonParams, query, year: params.year || undefined },
    }),
    tmdb.get<PersonSearchResponse>('/search/person', {
      params: { query, include_adult: false },
    }),
  ])

  const actor = personResponse.data.results
    .filter((person) => person.known_for_department === 'Acting')
    .sort((first, second) => second.popularity - first.popularity)[0]

  if (!actor) return movieResponse.data

  const credits = await tmdb.get<{ cast: Array<TmdbMovie & { popularity: number }> }>(
    `/person/${actor.id}/movie_credits`,
  )
  const actorMovies = credits.data.cast
    .filter((movie) => movie.release_date)
    .sort((first, second) => second.popularity - first.popularity)
  const merged = [...movieResponse.data.results]

  actorMovies.forEach((movie) => {
    if (!merged.some((item) => item.id === movie.id)) merged.push(movie)
  })

  return {
    ...movieResponse.data,
    results: merged,
    total_results: Math.max(movieResponse.data.total_results, merged.length),
    total_pages: Math.max(movieResponse.data.total_pages, 1),
  }
}

async function browseMovies(params: MovieSearchParams): Promise<TmdbListResponse> {
  const commonParams = { page: params.page ?? 1, include_adult: false }

  if (params.category === 'trending') {
    return (await tmdb.get<TmdbListResponse>('/trending/movie/week', { params: commonParams })).data
  }

  if (params.category && CATEGORY_PATHS[params.category]) {
    return (await tmdb.get<TmdbListResponse>(CATEGORY_PATHS[params.category], { params: commonParams })).data
  }

  return (await tmdb.get<TmdbListResponse>('/discover/movie', {
    params: {
      ...commonParams,
      with_genres: params.genre || undefined,
      with_original_language: params.language || undefined,
      primary_release_year: params.year || undefined,
      'vote_average.gte': params.rating || undefined,
      'vote_count.gte': params.rating ? 100 : undefined,
      sort_by: params.sort || 'popularity.desc',
    },
  })).data
}

function applyTextSearchFilters(movies: TmdbMovie[], params: MovieSearchParams): TmdbMovie[] {
  let filtered = movies

  if (params.genre) filtered = filtered.filter((movie) => movie.genre_ids.includes(Number(params.genre)))
  if (params.rating) filtered = filtered.filter((movie) => movie.vote_average >= Number(params.rating))
  if (params.language) filtered = filtered.filter((movie) => movie.original_language === params.language)

  return [...filtered].sort((first, second) => {
    if (params.sort === 'vote_average.desc') return second.vote_average - first.vote_average
    if (params.sort === 'primary_release_date.desc') return second.release_date.localeCompare(first.release_date)
    if (params.sort === 'title.asc') return first.title.localeCompare(second.title)
    return 0
  })
}

export async function searchMovies(params: MovieSearchParams): Promise<MovieSearchResult> {
  assertAccessToken()
  const genres = await getGenres()
  const genreMap = new Map(genres.map((genre) => [genre.id, genre.name]))
  const response = params.query?.trim() ? await searchByText(params) : await browseMovies(params)
  const rawMovies = params.query?.trim()
    ? applyTextSearchFilters(response.results, params)
    : response.results

  return {
    movies: rawMovies.map((movie) => toMovie(movie, genreMap)),
    page: response.page,
    totalPages: Math.min(response.total_pages, 500),
    totalResults: response.total_results,
    genres,
  }
}

export async function getHomeMovies(): Promise<HomeMovies> {
  assertAccessToken()
  const [genresResult, trendingResult, popularResult, topRatedResult, upcomingResult] = await Promise.all([
    tmdb.get<GenresResponse>('/genre/movie/list'),
    tmdb.get<TmdbListResponse>('/trending/movie/week'),
    tmdb.get<TmdbListResponse>('/movie/popular'),
    tmdb.get<TmdbListResponse>('/movie/top_rated'),
    tmdb.get<TmdbListResponse>('/movie/upcoming'),
  ])
  const genres = new Map(genresResult.data.genres.map((genre) => [genre.id, genre.name]))

  return {
    trending: trendingResult.data.results.map((movie) => toMovie(movie, genres)),
    popular: popularResult.data.results.map((movie) => toMovie(movie, genres)),
    topRated: topRatedResult.data.results.map((movie) => toMovie(movie, genres)),
    upcoming: upcomingResult.data.results.map((movie) => toMovie(movie, genres)),
  }
}

export async function getMovieDetails(id: number): Promise<MovieDetails> {
  assertAccessToken()
  const [response, genres] = await Promise.all([
    tmdb.get<MovieDetailsResponse>(`/movie/${id}`, {
      params: { append_to_response: 'credits,videos,recommendations,similar' },
    }),
    getGenres(),
  ])
  const movie = response.data
  const genreMap = new Map(genres.map((genre) => [genre.id, genre.name]))
  const trailer = movie.videos.results.find(
    (video) => video.site === 'YouTube' && video.type === 'Trailer' && video.official,
  ) ?? movie.videos.results.find(
    (video) => video.site === 'YouTube' && video.type === 'Trailer',
  )

  return {
    id: movie.id,
    title: movie.title,
    overview: movie.overview,
    tagline: movie.tagline,
    posterPath: movie.poster_path,
    backdropPath: movie.backdrop_path,
    releaseDate: movie.release_date,
    runtime: movie.runtime,
    rating: movie.vote_average,
    genres: movie.genres,
    status: movie.status,
    budget: movie.budget,
    revenue: movie.revenue,
    languages: movie.spoken_languages.map((language) => language.english_name),
    companies: movie.production_companies,
    cast: movie.credits.cast.slice(0, 12),
    director: movie.credits.crew.find((member) => member.job === 'Director'),
    trailer,
    recommendations: movie.recommendations.results.slice(0, 12).map((item) => toMovie(item, genreMap)),
    similar: movie.similar.results.slice(0, 12).map((item) => toMovie(item, genreMap)),
  }
}

