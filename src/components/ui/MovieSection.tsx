import type { Movie } from "../../types/movie";
import { MovieCard } from "./MovieCard";
import { Link } from "react-router-dom";
import "./MovieSection.css";

interface MovieSectionProps {
  id: string;
  title: string;
  movies: Movie[];
}

export function MovieSection({ id, title, movies }: MovieSectionProps) {
  return (
    <section className="movie-section" id={id} aria-labelledby={`${id}-title`}>
      <div className="section-heading">
        <h2 id={`${id}-title`}>{title}</h2>
        <Link to={`/search?category=${id}`} aria-label={`See all ${title}`}>
          See all <span aria-hidden="true">→</span>
        </Link>
      </div>
      <div className="movie-row">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}
