import { lazy } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AppLayout } from '../layouts/AppLayout'
import { HomePage } from '../pages/Home/HomePage'

const SearchPage = lazy(() =>
  import('../pages/Search/SearchPage').then((module) => ({ default: module.SearchPage })))
const FavoritesPage = lazy(() =>
  import('../pages/Favorites/FavoritesPage').then((module) => ({ default: module.FavoritesPage })))
const AboutPage = lazy(() =>
  import('../pages/About/AboutPage').then((module) => ({ default: module.AboutPage })))
const MovieDetailPage = lazy(() =>
  import('../pages/MovieDetail/MovieDetailPage').then((module) => ({ default: module.MovieDetailPage })))
const PersonPage = lazy(() =>
  import('../pages/Person/PersonPage').then((module) => ({ default: module.PersonPage })))
const NotFoundPage = lazy(() =>
  import('../pages/NotFound/NotFoundPage').then((module) => ({ default: module.NotFoundPage })))

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'search',
        element: <SearchPage />,
      },
      {
        path: 'favorites',
        element: <FavoritesPage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'movie/:id',
        element: <MovieDetailPage />,
      },
      {
        path: 'person/:id',
        element: <PersonPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}

