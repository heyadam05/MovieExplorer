import { Heart, Search, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MovieGrid } from "../../components/ui/MovieGrid";
import { useFavorites } from "../../hooks/useFavorites";
import "./FavoritesPage.css";

export function FavoritesPage() {
  const { favorites, clearFavorites } = useFavorites();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("added");
  const [confirmClear, setConfirmClear] = useState(false);

  const visibleMovies = useMemo(() => {
    const filtered = favorites.filter((movie) =>
      movie.title.toLowerCase().includes(query.trim().toLowerCase()),
    );

    if (sort === "rating")
      return [...filtered].sort((a, b) => b.rating - a.rating);
    if (sort === "year") return [...filtered].sort((a, b) => b.year - a.year);
    if (sort === "title")
      return [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    return [...filtered].reverse();
  }, [favorites, query, sort]);

  return (
    <main className="favorites-page">
      <header className="favorites-header">
        <span className="eyebrow">
          <Heart size={14} fill="currentColor" /> Your collection
        </span>
        <h1>Favorite movies</h1>
        <p>All the stories you want to return to, saved in one place.</p>
      </header>

      {favorites.length === 0 ? (
        <section className="favorites-empty">
          <span className="favorites-empty__icon">
            <Heart size={34} aria-hidden="true" />
          </span>
          <h2>No favorites yet</h2>
          <p>
            Tap the heart on any movie and it will appear here—even after you
            close the browser.
          </p>
          <Link className="button button--primary" to="/search">
            Explore movies →
          </Link>
        </section>
      ) : (
        <>
          <section className="favorites-toolbar" aria-label="Filter favorites">
            <label className="favorites-search">
              <Search size={18} aria-hidden="true" />
              <span className="sr-only">Search favorites</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search your favorites..."
              />
            </label>
            <label className="favorites-sort">
              <span className="sr-only">Sort favorites</span>
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
              >
                <option value="added">Recently added</option>
                <option value="rating">Highest rated</option>
                <option value="year">Newest first</option>
                <option value="title">Title A–Z</option>
              </select>
            </label>
            <button
              className={
                confirmClear ? "clear-favorites confirming" : "clear-favorites"
              }
              type="button"
              onClick={() => {
                if (confirmClear) {
                  clearFavorites();
                  setConfirmClear(false);
                } else {
                  setConfirmClear(true);
                }
              }}
              onBlur={() => setConfirmClear(false)}
            >
              <Trash2 size={16} />{" "}
              {confirmClear ? "Confirm clear" : "Clear all"}
            </button>
          </section>

          <div className="favorites-summary">
            <h2>
              {visibleMovies.length}{" "}
              {visibleMovies.length === 1 ? "movie" : "movies"}
            </h2>
          </div>

          {visibleMovies.length > 0 ? (
            <MovieGrid movies={visibleMovies} />
          ) : (
            <section className="empty-state">
              <Search size={40} aria-hidden="true" />
              <h2>No matching favorites</h2>
              <p>Try a different movie title.</p>
            </section>
          )}
        </>
      )}
    </main>
  );
}
