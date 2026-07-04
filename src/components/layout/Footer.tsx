import { Clapperboard } from 'lucide-react'
import { Link } from 'react-router-dom'
import './Footer.css'

export function Footer() {
  return (
    <footer className="footer">
      <Link className="brand" to="/">
        <span className="brand__icon" aria-hidden="true"><Clapperboard size={19} /></span>
        Movie Explorer
      </Link>
      <nav className="footer-links" aria-label="Footer navigation">
        <Link to="/search">Search</Link>
        <Link to="/favorites">Favorites</Link>
        <Link to="/about">About</Link>
      </nav>
      <p>© {new Date().getFullYear()} Movie Explorer</p>
    </footer>
  )
}
