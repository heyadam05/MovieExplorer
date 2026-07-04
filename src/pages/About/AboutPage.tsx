import { Code2, Database, Film, Heart, Search, ShieldCheck, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import './AboutPage.css'

const technologies = [
  { name: 'React', description: 'Component-driven interface and state', icon: Code2 },
  { name: 'TypeScript', description: 'Predictable, strongly typed data', icon: ShieldCheck },
  { name: 'TMDB API', description: 'Movie data, artwork and discovery', icon: Database },
  { name: 'Framer Motion', description: 'Subtle and purposeful animation', icon: Sparkles },
]

export function AboutPage() {
  return (
    <motion.main className="about-page" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <section className="about-hero">
        <span className="eyebrow"><Film size={14} /> Behind the screen</span>
        <h1>Built for people who love finding great stories.</h1>
        <p>
          Movie Explorer makes discovery feel simple: browse what is trending,
          search with useful filters and keep a personal collection for later.
        </p>
        <div className="hero-actions">
          <Link className="button button--primary" to="/search"><Search size={17} /> Explore movies</Link>
          <Link className="button button--secondary" to="/favorites"><Heart size={17} /> Your favorites</Link>
        </div>
      </section>

      <section className="about-section" aria-labelledby="principles-title">
        <div className="section-heading"><h2 id="principles-title">The idea</h2></div>
        <div className="about-copy-grid">
          <p>
            This is not a streaming service or a Netflix clone. It is a focused
            movie discovery experience built around fast exploration, clear information
            and a calm cinematic interface.
          </p>
          <p>
            The app is dark-first, responsive and keyboard-friendly. Favorites and
            theme settings stay on your device, while live movie information comes
            directly from The Movie Database.
          </p>
        </div>
      </section>

      <section className="about-section" aria-labelledby="technology-title">
        <div className="section-heading"><h2 id="technology-title">Technology</h2></div>
        <div className="technology-grid">
          {technologies.map(({ name, description, icon: Icon }, index) => (
            <motion.article
              className="technology-card"
              key={name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
            >
              <Icon size={22} aria-hidden="true" />
              <h3>{name}</h3>
              <p>{description}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="tmdb-credit" aria-labelledby="data-credit-title">
        <a href="https://www.themoviedb.org" target="_blank" rel="noreferrer">
          <img
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
            alt="The Movie Database (TMDB)"
            loading="lazy"
          />
        </a>
        <div>
          <h2 id="data-credit-title">Data attribution</h2>
          <p>This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
        </div>
      </section>
    </motion.main>
  )
}
