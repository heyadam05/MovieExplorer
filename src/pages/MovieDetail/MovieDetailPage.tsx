import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  Heart,
  Play,
  Share2,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { imageUrl } from "../../api/tmdb";
import { ErrorState } from "../../components/ui/ErrorState";
import { LoadingSection } from "../../components/ui/LoadingSection";
import { MovieSection } from "../../components/ui//MovieSection";
import { useMovieDetails } from "../../hooks/useMovieDetails";
import { useFavorites } from "../../hooks/useFavorites";
import toast from "react-hot-toast";
import { movieDetailsToMovie } from "../../utils/movie";
import "./MovieDetailPage.css";

const formatMoney = (value: number) =>
  value
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        notation: "compact",
      }).format(value)
    : "Not available";

const formatRuntime = (minutes: number | null) => {
  if (!minutes) return "N/A";
  return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
};

export function MovieDetailPage() {
  const { id } = useParams();
  const movieId = id && /^\d+$/.test(id) ? Number(id) : null;
  const { movie, loading, error, retry } = useMovieDetails(movieId);
  const [shared, setShared] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    if (movie) document.title = `${movie.title} — Movie Explorer`;
  }, [movie]);

  const shareMovie = async () => {
    const shareData = {
      title: movie?.title ?? "Movie Explorer",
      url: window.location.href,
    };
    try {
      const usedShareMenu = "share" in navigator;
      if (usedShareMenu) await navigator.share(shareData);
      else await navigator.clipboard.writeText(window.location.href);
      setShared(true);
      toast.success(usedShareMenu ? "Movie shared" : "Movie link copied");
      window.setTimeout(() => setShared(false), 1800);
    } catch {
      setShared(false);
    }
  };

  if (!movieId) {
    return (
      <main className="detail-state">
        <h1>Invalid movie</h1>
        <p>The movie address is not valid.</p>
        <Link className="button button--primary" to="/search">
          Explore movies
        </Link>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="detail-loading">
        <div className="skeleton detail-loading__hero" />
        <LoadingSection />
      </main>
    );
  }

  if (error || !movie) {
    return (
      <main className="detail-state">
        <ErrorState message={error ?? "Movie not found."} onRetry={retry} />
      </main>
    );
  }

  const backdrop = imageUrl(movie.backdropPath, "w1280");
  const poster = imageUrl(movie.posterPath, "w500");
  const favorite = isFavorite(movie.id);
  const favoriteMovie = movieDetailsToMovie(movie);

  return (
    <main className="movie-detail">
      <section
        className="detail-hero"
        style={
          backdrop
            ? {
                backgroundImage: `linear-gradient(90deg, rgba(5, 9, 20, .98) 0%, rgba(5, 9, 20, .82) 46%, rgba(5, 9, 20, .45)), url(${backdrop})`,
              }
            : undefined
        }
      >
        <Link className="detail-back" to="/search">
          <ArrowLeft size={17} /> Back to movies
        </Link>
        <div className="detail-hero__content">
          <div className="detail-poster">
            {poster ? (
              <img
                src={poster}
                alt={`${movie.title} poster`}
                decoding="async"
              />
            ) : (
              <span>No poster available</span>
            )}
          </div>
          <div className="detail-copy">
            {movie.tagline && <p className="detail-tagline">{movie.tagline}</p>}
            <h1>{movie.title}</h1>
            <div className="detail-meta">
              <span>
                <CalendarDays size={17} />{" "}
                {movie.releaseDate?.slice(0, 4) || "TBA"}
              </span>
              <span>
                <Clock3 size={17} /> {formatRuntime(movie.runtime)}
              </span>
              <span className="rating">
                <Star size={17} fill="currentColor" /> {movie.rating.toFixed(1)}
              </span>
            </div>
            <div className="detail-genres">
              {movie.genres.map((genre) => (
                <span key={genre.id}>{genre.name}</span>
              ))}
            </div>
            <p className="detail-overview">
              {movie.overview || "No overview is available for this movie."}
            </p>
            <div className="hero-actions">
              {movie.trailer && (
                <a className="button button--primary" href="#trailer">
                  <Play size={17} fill="currentColor" /> Watch trailer
                </a>
              )}
              <button
                className={
                  favorite
                    ? "button button--favorite active"
                    : "button button--favorite"
                }
                type="button"
                onClick={() => toggleFavorite(favoriteMovie)}
              >
                <Heart size={18} fill={favorite ? "currentColor" : "none"} />{" "}
                {favorite ? "Saved" : "Favorite"}
              </button>
              <button
                className="button button--secondary"
                type="button"
                onClick={() => void shareMovie()}
              >
                <Share2 size={18} /> {shared ? "Link copied!" : "Share"}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="detail-section" aria-labelledby="cast-title">
        <div className="section-heading">
          <h2 id="cast-title">Cast & crew</h2>
        </div>
        {movie.director && (
          <p className="director-line">
            Directed by <strong>{movie.director.name}</strong>
          </p>
        )}
        <div className="cast-row">
          {movie.cast.map((person) => {
            const profile = imageUrl(person.profile_path, "w342");
            return (
              <Link
                className="cast-card"
                to={`/person/${person.id}`}
                key={`${person.id}-${person.character}`}
              >
                <div className="cast-card__photo">
                  {profile ? (
                    <img src={profile} alt="" loading="lazy" decoding="async" />
                  ) : (
                    <span>{person.name.charAt(0)}</span>
                  )}
                </div>
                <h3>{person.name}</h3>
                <p>{person.character || "Cast"}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section
        className="detail-section facts-section"
        aria-labelledby="facts-title"
      >
        <div className="section-heading">
          <h2 id="facts-title">Movie facts</h2>
        </div>
        <dl className="facts-grid">
          <div>
            <dt>Status</dt>
            <dd>{movie.status}</dd>
          </div>
          <div>
            <dt>Original language</dt>
            <dd>{movie.languages.join(", ") || "N/A"}</dd>
          </div>
          <div>
            <dt>Budget</dt>
            <dd>{formatMoney(movie.budget)}</dd>
          </div>
          <div>
            <dt>Revenue</dt>
            <dd>{formatMoney(movie.revenue)}</dd>
          </div>
          <div className="facts-grid__wide">
            <dt>Production</dt>
            <dd>
              {movie.companies.map((company) => company.name).join(", ") ||
                "N/A"}
            </dd>
          </div>
        </dl>
      </section>

      {movie.trailer && (
        <section
          className="detail-section"
          id="trailer"
          aria-labelledby="trailer-title"
        >
          <div className="section-heading">
            <h2 id="trailer-title">Official trailer</h2>
          </div>
          <div className="trailer-frame">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${movie.trailer.key}`}
              title={`${movie.title} trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </section>
      )}

      {movie.recommendations.length > 0 && (
        <MovieSection
          id="recommendations"
          title="Recommended for you"
          movies={movie.recommendations}
        />
      )}
      {movie.similar.length > 0 && (
        <MovieSection
          id="similar"
          title="Similar Movies"
          movies={movie.similar}
        />
      )}
    </main>
  );
}
