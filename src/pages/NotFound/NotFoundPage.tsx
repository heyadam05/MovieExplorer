import { Clapperboard, Home, Search } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import './NotFoundPage.css'

export function NotFoundPage() {
  return (
    <motion.main className="not-found" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="not-found__art" aria-hidden="true">
        <span>4</span><Clapperboard size={76} /><span>4</span>
      </div>
      <h1>This scene didn’t make the final cut.</h1>
      <p>The page you are looking for has moved, never existed or wandered into another timeline.</p>
      <div className="hero-actions">
        <Link className="button button--primary" to="/"><Home size={17} /> Back home</Link>
        <Link className="button button--secondary" to="/search"><Search size={17} /> Find a movie</Link>
      </div>
    </motion.main>
  )
}
