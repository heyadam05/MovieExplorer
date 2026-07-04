import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  RotateCcw,
  Search,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { imageUrl } from "../../api/tmdb";
import { ErrorState } from "../../components/ui/ErrorState";
import { MovieGrid } from "../../components/ui/MovieGrid";
import { SearchSkeleton } from "../../components/ui/SearchSkeleton";
import { usePersonDetails } from "../../hooks/usePersonDetails";
import type { Movie } from "../../types/movie";
import "./PersonPage.css";

const EMPTY_MOVIES: Movie[] = [];

const formatDate = (date: string | null) => {
  if (!date) return "Unknown";
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
};

export function PersonPage() {
  const { id } = useParams();
  const personId = id && /^\d+$/.test(id) ? Number(id) : null;
  const { person, loading, error, retry } = usePersonDetails(personId);
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [rating, setRating] = useState("");
  const [sort, setSort] = useState("popular");
  const personMovies = person?.movies ?? EMPTY_MOVIES;
  const availableYears = useMemo(
    () =>
      [
        ...new Set(personMovies.map((movie) => movie.year).filter(Boolean)),
      ].sort((first, second) => second - first),
    [personMovies],
  );
  const availableGenres = useMemo(
    () =>
      [
        ...new Set(
          personMovies
            .flatMap((movie) => movie.genre.split(" • "))
            .filter(Boolean),
        ),
      ].sort((first, second) => first.localeCompare(second)),
    [personMovies],
  );

  const visibleMovies = useMemo(() => {
    const filtered = personMovies.filter((movie) => {
      const matchesTitle = movie.title
        .toLowerCase()
        .includes(query.trim().toLowerCase());
      const matchesGenre = !genre || movie.genre.split(" • ").includes(genre);
      const matchesYear = !year || movie.year === Number(year);
      const matchesRating = !rating || movie.rating >= Number(rating);
      return matchesTitle && matchesGenre && matchesYear && matchesRating;
    });

    if (sort === "rating")
      return [...filtered].sort(
        (first, second) => second.rating - first.rating,
      );
    if (sort === "year")
      return [...filtered].sort((first, second) => second.year - first.year);
    if (sort === "title")
      return [...filtered].sort((first, second) =>
        first.title.localeCompare(second.title),
      );
    return filtered;
  }, [personMovies, query, genre, year, rating, sort]);

  useEffect(() => {
    if (person) document.title = `${person.name} — Movie Explorer`;
  }, [person]);

  if (!personId) {
    return (
      <main className="person-state">
        <h1>Invalid person</h1>
        <Link className="button button--primary" to="/search">
          Back to search
        </Link>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="person-page">
        <SearchSkeleton />
      </main>
    );
  }

  if (error || !person) {
    return (
      <main className="person-state">
        <ErrorState message={error ?? "Person not found."} onRetry={retry} />
      </main>
    );
  }

  const profile = imageUrl(person.profilePath, "w500");

  const hasFilters = Boolean(
    query || genre || year || rating || sort !== "popular",
  );
  const clearFilters = () => {
    setQuery("");
    setGenre("");
    setYear("");
    setRating("");
    setSort("popular");
  };

  return (
    <main className="person-page">
      <Link className="person-back" to="/search">
        <ArrowLeft size={17} /> Back to search
      </Link>
      <section className="person-header">
        <div className="person-photo">
          {profile ? (
            <img src={profile} alt={person.name} />
          ) : (
            <span>{person.name.charAt(0)}</span>
          )}
        </div>
        <div>
          <span className="eyebrow">{person.department}</span>
          <h1>{person.name}</h1>
          <div className="person-meta">
            <span>
              <CalendarDays size={17} /> {formatDate(person.birthday)}
            </span>
            {person.placeOfBirth && (
              <span>
                <MapPin size={17} /> {person.placeOfBirth}
              </span>
            )}
          </div>
          <p>{person.biography || "No biography is currently available."}</p>
        </div>
      </section>

      <section
        className="person-filmography"
        aria-labelledby="filmography-title"
      >
        <div className="section-heading">
          <h2 id="filmography-title">Movies featuring {person.name}</h2>
        </div>
        <div className="person-filters" aria-label="Filter filmography">
          <label className="person-filters__search">
            <Search size={18} aria-hidden="true" />
            <span className="sr-only">Search filmography</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search this filmography..."
            />
          </label>
          <label>
            <span className="sr-only">Filter by genre</span>
            <select
              value={genre}
              onChange={(event) => setGenre(event.target.value)}
            >
              <option value="">All genres</option>
              {availableGenres.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span className="sr-only">Filter by year</span>
            <select
              value={year}
              onChange={(event) => setYear(event.target.value)}
            >
              <option value="">All years</option>
              {availableYears.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span className="sr-only">Filter by minimum rating</span>
            <select
              value={rating}
              onChange={(event) => setRating(event.target.value)}
            >
              <option value="">Any rating</option>
              <option value="8">8+ Excellent</option>
              <option value="7">7+ Great</option>
              <option value="6">6+ Good</option>
            </select>
          </label>
          <label>
            <span className="sr-only">Sort filmography</span>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
            >
              <option value="popular">Most popular</option>
              <option value="rating">Highest rated</option>
              <option value="year">Newest first</option>
              <option value="title">Title A-Z</option>
            </select>
          </label>
          {hasFilters && (
            <button
              type="button"
              className="person-filters__clear"
              onClick={clearFilters}
            >
              <RotateCcw size={16} /> Reset
            </button>
          )}
        </div>
        <p className="person-filmography__count">
          {visibleMovies.length}{" "}
          {visibleMovies.length === 1 ? "movie" : "movies"}
        </p>
        {visibleMovies.length > 0 ? (
          <MovieGrid movies={visibleMovies} />
        ) : (
          <div className="person-filmography__empty">
            <Search size={36} aria-hidden="true" />
            <h3>No matching movies</h3>
            <p>Try changing or resetting the filmography filters.</p>
            <button
              className="button button--primary"
              type="button"
              onClick={clearFilters}
            >
              Reset filters
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
