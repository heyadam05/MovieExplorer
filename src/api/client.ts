import axios from 'axios'

const envAccessToken: unknown = import.meta.env.VITE_TMDB_ACCESS_TOKEN
const accessToken = typeof envAccessToken === 'string' ? envAccessToken : ''

export function assertAccessToken(): void {
  if (!accessToken) {
    throw new Error('TMDB access token is missing.')
  }
}

export const tmdb = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${accessToken}`,
    accept: 'application/json',
  },
  params: {
    language: 'en-US',
  },
})

export const imageUrl = (
  path: string | null | undefined,
  size: 'w342' | 'w500' | 'w780' | 'w1280' | 'original' = 'w500',
) => path ? `https://image.tmdb.org/t/p/${size}${path}` : null
