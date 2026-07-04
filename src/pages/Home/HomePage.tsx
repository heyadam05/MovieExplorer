import { AnimatePresence, motion } from "framer-motion";
import { Play, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { imageUrl } from "../../api/tmdb";
import { ErrorState } from "../../components/ui/ErrorState";
import { LoadingSection } from "../../components/ui/LoadingSection";
import { MovieSection } from "../../components/ui/MovieSection";
import { useHomeMovies } from "../../hooks/useHomeMovies";
import { useFavorites } from "../../hooks/useFavorites";
import "./HomePage.css";

export function HomePage() {
  const { data, loading, error, retry } = useHomeMovies();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [heroIndex, setHeroIndex] = useState(0);
  const heroMovies =
    data?.trending.filter((movie) => movie.backdropPath).slice(0, 5) ?? [];
  const heroMovie = heroMovies[heroIndex] ?? data?.trending[0];
  const backdrop = imageUrl(heroMovie?.backdropPath, "w1280");
  const heroIsFavorite = heroMovie ? isFavorite(heroMovie.id) : false;

  useEffect(() => {
    if (heroMovies.length < 2) return;
    const interval = window.setInterval(() => {
      setHeroIndex((current) => (current + 1) % heroMovies.length);
    }, 7000);
    return () => window.clearInterval(interval);
  }, [heroMovies.length]);

  const sections = data
    ? [
        { id: "trending", title: "Trending Movies", movies: data.trending },
        { id: "popular", title: "Popular Movies", movies: data.popular },
        { id: "top-rated", title: "Top Rated", movies: data.topRated },
        { id: "upcoming", title: "Coming Soon", movies: data.upcoming },
      ]
    : [];

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      <section
        className="hero-banner"
        aria-labelledby="hero-title"
        style={
          backdrop
            ? {
                backgroundImage: `linear-gradient(90deg, rgba(4, 8, 18, .98) 0%, rgba(4, 8, 18, .82) 38%, rgba(4, 8, 18, .2) 75%), url(${backdrop})`,
              }
            : undefined
        }
      >
        {!backdrop && (
          <div className="hero-banner__art" aria-hidden="true">
            <span className="film-ring film-ring--one" />
            <span className="film-ring film-ring--two" />
            <span className="film-person" />
          </div>
        )}
        <AnimatePresence mode="wait">
          <motion.div
            className="hero-banner__content"
            key={heroMovie?.id ?? "fallback"}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 16 }}
            transition={{ duration: 0.3 }}
          >
            <span className="eyebrow">🔥 Trending Now</span>
            <h1 id="hero-title">
              {heroMovie?.title ?? "Discover great movies"}
            </h1>
            {heroMovie && (
              <div className="hero-meta" aria-label="Movie information">
                <span>{heroMovie.year || "TBA"}</span>
                <span>•</span>
                <span>{heroMovie.genre}</span>
                <span>•</span>
                <span className="rating">★ {heroMovie.rating.toFixed(1)}</span>
              </div>
            )}
            <p>
              {heroMovie?.overview ||
                "Explore what is trending, popular and coming soon—all in one place."}
            </p>
            <div className="hero-actions">
              <Link
                className="button button--primary"
                to={heroMovie ? `/movie/${heroMovie.id}` : "/search"}
              >
                <Play size={17} fill="currentColor" /> View Details
              </Link>
              {heroMovie && (
                <button
                  className={
                    heroIsFavorite
                      ? "button button--favorite active"
                      : "button button--secondary"
                  }
                  type="button"
                  onClick={() => toggleFavorite(heroMovie)}
                >
                  <Plus size={19} />{" "}
                  {heroIsFavorite ? "Saved to Favorites" : "Add to Favorites"}
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
        {heroMovies.length > 1 && (
          <div className="hero-dots" aria-label="Choose featured movie">
            {heroMovies.map((movie, index) => (
              <button
                className={index === heroIndex ? "active" : ""}
                type="button"
                key={movie.id}
                aria-label={`Show ${movie.title}`}
                aria-current={index === heroIndex ? "true" : undefined}
                onClick={() => setHeroIndex(index)}
              />
            ))}
          </div>
        )}
      </section>

      {loading &&
        Array.from({ length: 3 }, (_, index) => <LoadingSection key={index} />)}
      {error && <ErrorState message={error} onRetry={() => void retry()} />}
      {sections.map((section) => (
        <MovieSection key={section.id} {...section} />
      ))}
    </motion.main>
  );
}
