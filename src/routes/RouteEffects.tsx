import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const PAGE_TITLES: Record<string, string> = {
  '/': 'Movie Explorer - Discover your next favorite',
  '/search': 'Search Movies - Movie Explorer',
  '/favorites': 'Favorites - Movie Explorer',
  '/about': 'About - Movie Explorer',
}

function getPageTitle(pathname: string): string {
  if (PAGE_TITLES[pathname]) return PAGE_TITLES[pathname]
  if (pathname.startsWith('/movie/')) return 'Movie Details - Movie Explorer'
  if (pathname.startsWith('/person/')) return 'Actor - Movie Explorer'
  return 'Page Not Found - Movie Explorer'
}

export function RouteEffects() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    document.title = getPageTitle(pathname)
  }, [pathname])

  return null
}

