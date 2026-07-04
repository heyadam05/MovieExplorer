import { Filter, Search, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ErrorState } from "../../components/ui/ErrorState";
import { MovieGrid } from "../../components/ui/MovieGrid";
import { SearchSkeleton } from "../../components/ui/SearchSkeleton";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";
import { useMovieSearch } from "../../hooks/useMovieSearch";
import "./SearchPage.css";

const currentYear = new Date().getFullYear() + 2;
const years = Array.from({ length: 80 }, (_, index) => currentYear - index);

const categoryNames: Record<string, string> = {
  trending: "Trending Movies",
  popular: "Popular Movies",
  "top-rated": "Top Rated Movies",
  upcoming: "Upcoming Movies",
};

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const debouncedQuery = useDebouncedValue(query);

  const genre = searchParams.get("genre") ?? "";
  const year = searchParams.get("year") ?? "";
  const rating = searchParams.get("rating") ?? "";
  const sort = searchParams.get("sort") ?? "popularity.desc";
  const language = searchParams.get("language") ?? "";
  const category = searchParams.get("category") ?? "";
  const page = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    const currentQuery = searchParams.get("q") ?? "";
    if (debouncedQuery === currentQuery) return;

    setSearchParams(
      (current) => {
        const next = new URLSearchParams(current);
        if (debouncedQuery.trim()) next.set("q", debouncedQuery.trim());
        else next.delete("q");
        next.delete("page");
        next.delete("category");
        return next;
      },
      { replace: true },
    );
  }, [debouncedQuery, searchParams, setSearchParams]);

  const request = useMemo(
    () => ({
      query: searchParams.get("q") ?? "",
      genre,
      year,
      rating,
      sort,
      language,
      category,
      page,
    }),
    [searchParams, genre, year, rating, sort, language, category, page],
  );

  const {
    movies,
    genres,
    totalResults,
    totalPages,
    loading,
    loadingMore,
    error,
    retry,
  } = useMovieSearch(request);

  const updateFilter = (name: string, value: string) => {
    setSearchParams((current) => {
      const next = new URLSearchParams(current);
      if (value) next.set(name, value);
      else next.delete(name);
      next.delete("page");
      next.delete("category");
      return next;
    });
  };

  const clearFilters = () => {
    setQuery("");
    setSearchParams({});
  };

  const loadMore = () => {
    setSearchParams((current) => {
      const next = new URLSearchParams(current);
      next.set("page", String(page + 1));
      return next;
    });
  };

  const hasFilters = Boolean(
    query ||
    genre ||
    year ||
    rating ||
    language ||
    category ||
    sort !== "popularity.desc",
  );
  const title =
    categoryNames[category] ??
    (searchParams.get("q")
      ? `Results for “${searchParams.get("q")}”`
      : "Explore Movies");

  return (
    <main className="search-page">
      <header className="search-page__header">
        <span className="eyebrow">
          <Search size={14} /> Find your next favorite
        </span>
        <h1>Search movies</h1>
        <p>
          Explore thousands of stories and narrow the results to exactly what
          you feel like watching.
        </p>
      </header>

      <section className="search-panel" aria-label="Movie search and filters">
        <label className="search-field">
          <Search size={21} aria-hidden="true" />
          <input
            type="search"
            aria-label="Search movies"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by movie or actor..."
          />
          {query && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => setQuery("")}
            >
              <X size={18} />
            </button>
          )}
        </label>

        <button
          className="filter-toggle"
          type="button"
          aria-expanded={filtersOpen}
          aria-controls="search-filters"
          onClick={() => setFiltersOpen((open) => !open)}
        >
          <SlidersHorizontal size={18} /> Filters
        </button>

        <div
          id="search-filters"
          className={
            filtersOpen
              ? "search-filters search-filters--open"
              : "search-filters"
          }
        >
          <label>
            <span>Genre</span>
            <select
              value={genre}
              onChange={(event) => updateFilter("genre", event.target.value)}
            >
              <option value="">All genres</option>
              {genres?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>Year</span>
            <select
              value={year}
              onChange={(event) => updateFilter("year", event.target.value)}
            >
              <option value="">All years</option>
              {years.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>Minimum rating</span>
            <select
              value={rating}
              onChange={(event) => updateFilter("rating", event.target.value)}
            >
              <option value="">Any rating</option>
              <option value="8">8+ Excellent</option>
              <option value="7">7+ Great</option>
              <option value="6">6+ Good</option>
            </select>
          </label>
          <label>
            <span>Sort by</span>
            <select
              value={sort}
              onChange={(event) => updateFilter("sort", event.target.value)}
            >
              <option value="popularity.desc">Most popular</option>
              <option value="vote_average.desc">Highest rated</option>
              <option value="primary_release_date.desc">Newest first</option>
              <option value="title.asc">Title A–Z</option>
            </select>
          </label>
          <label>
            <span>Language</span>
            <select
              value={language}
              onChange={(event) => updateFilter("language", event.target.value)}
            >
              <option value="">All languages</option>
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="ja">Japanese</option>
              <option value="ko">Korean</option>
              <option value="it">Italian</option>
            </select>
          </label>
        </div>
      </section>

      <section className="search-results" aria-labelledby="results-title">
        <div className="results-heading">
          <div>
            <h2 id="results-title">{title}</h2>
            {!loading && !error && (
              <p>
                {totalResults?.toLocaleString() ?? movies.length} movies found
              </p>
            )}
          </div>
          {hasFilters && (
            <button
              className="clear-filters"
              type="button"
              onClick={clearFilters}
            >
              <Filter size={15} /> Clear filters
            </button>
          )}
        </div>

        {loading && <SearchSkeleton />}
        {error && <ErrorState message={error} onRetry={retry} />}
        {!loading && !error && movies.length === 0 && (
          <div className="empty-state">
            <Search size={42} aria-hidden="true" />
            <h2>No movies found</h2>
            <p>Try another title or loosen your filters.</p>
            <button
              className="button button--primary"
              type="button"
              onClick={clearFilters}
            >
              Explore all movies
            </button>
          </div>
        )}
        {!loading && movies.length > 0 && <MovieGrid movies={movies} />}

        {!loading && !error && page < (totalPages ?? 0) && (
          <div className="load-more">
            <button
              className="button button--secondary"
              type="button"
              onClick={loadMore}
              disabled={loadingMore}
            >
              {loadingMore ? "Loading…" : "Load more movies"}
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
