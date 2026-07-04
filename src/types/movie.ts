export interface Movie {
  id: number
  title: string
  year: number
  rating: number
  genre: string
  colors?: [string, string]
  label?: string
  overview?: string
  posterPath?: string | null
  backdropPath?: string | null
  releaseDate?: string
}

export interface TmdbMovie {
  id: number
  title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  genre_ids: number[]
  original_language: string
}

export interface TmdbListResponse {
  page: number
  results: TmdbMovie[]
  total_pages: number
  total_results: number
}

export interface Genre {
  id: number
  name: string
}

export interface GenresResponse {
  genres: Genre[]
}

export interface CastMember {
  id: number
  name: string
  character: string
  profile_path: string | null
}

export interface CrewMember {
  id: number
  name: string
  job: string
}

export interface Video {
  id: string
  key: string
  name: string
  site: string
  type: string
  official: boolean
}

export interface ProductionCompany {
  id: number
  name: string
  logo_path: string | null
}

export interface MovieDetailsResponse extends TmdbMovie {
  runtime: number | null
  status: string
  tagline: string
  budget: number
  revenue: number
  homepage: string
  genres: Genre[]
  spoken_languages: Array<{ english_name: string; iso_639_1: string }>
  production_companies: ProductionCompany[]
  credits: {
    cast: CastMember[]
    crew: CrewMember[]
  }
  videos: { results: Video[] }
  recommendations: TmdbListResponse
  similar: TmdbListResponse
}

export interface MovieDetails {
  id: number
  title: string
  overview: string
  tagline: string
  posterPath: string | null
  backdropPath: string | null
  releaseDate: string
  runtime: number | null
  rating: number
  genres: Genre[]
  status: string
  budget: number
  revenue: number
  languages: string[]
  companies: ProductionCompany[]
  cast: CastMember[]
  director?: CrewMember
  trailer?: Video
  recommendations: Movie[]
  similar: Movie[]
}

export interface TmdbPersonSearchResult {
  id: number
  name: string
  profile_path: string | null
  known_for_department: string
  popularity: number
}

export interface PersonSearchResponse {
  results: TmdbPersonSearchResult[]
}

export interface PersonDetailsResponse {
  id: number
  name: string
  biography: string
  birthday: string | null
  deathday: string | null
  place_of_birth: string | null
  profile_path: string | null
  known_for_department: string
  movie_credits: {
    cast: Array<TmdbMovie & { character?: string; popularity: number }>
  }
}

export interface PersonDetails {
  id: number
  name: string
  biography: string
  birthday: string | null
  deathday: string | null
  placeOfBirth: string | null
  profilePath: string | null
  department: string
  movies: Movie[]
}
