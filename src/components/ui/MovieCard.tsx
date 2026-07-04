import type { Movie } from "../../types/movie";
import { imageUrl } from "../../api/tmdb";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useFavorites } from "../../hooks/useFavorites";
import "./MovieCard.css";

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  const poster = imageUrl(movie.posterPath, "w342");
  const colors = movie.colors ?? ["#475569", "#0f172a"];
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(movie.id);

  return (
    <article className="movie-card">
      <div
        className="movie-card__poster"
        style={
          !poster
            ? {
                background: `radial-gradient(circle at 60% 20%, ${colors[0]} 0, transparent 38%), linear-gradient(145deg, ${colors[0]}, ${colors[1]} 72%)`,
              }
            : undefined
        }
      >
        {poster && <img src={poster} alt="" loading="lazy" decoding="async" />}
        <button
          className={
            favorite ? "movie-card__favorite active" : "movie-card__favorite"
          }
          type="button"
          aria-label={
            favorite
              ? `Remove ${movie.title} from favorites`
              : `Add ${movie.title} to favorites`
          }
          onClick={() => toggleFavorite(movie)}
        >
          <Heart size={16} fill={favorite ? "currentColor" : "none"} />
        </button>
        <span className="movie-card__genre">{movie.genre}</span>
        {!poster && <strong>{movie.label ?? movie.title}</strong>}
        <Link
          className="movie-card__details"
          to={`/movie/${movie.id}`}
          aria-label={`View details for ${movie.title}`}
        >
          View details
        </Link>
      </div>
      <div className="movie-card__body">
        <h3>
          <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
        </h3>
        <div className="movie-card__meta">
          <span>{movie.year || "TBA"}</span>
          <span
            className="rating"
            aria-label={`Rating ${movie.rating.toFixed(1)} out of 10`}
          >
            <span aria-hidden="true">★</span> {movie.rating.toFixed(1)}
          </span>
        </div>
      </div>
    </article>
  );
}
