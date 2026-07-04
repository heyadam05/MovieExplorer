import { Clapperboard, Menu, Moon, Search, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useFavorites } from "../../hooks/useFavorites";
import "./Navbar.css";

type Theme = "dark" | "light";

export function Navbar() {
  const { favorites } = useFavorites();
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>(() =>
    localStorage.getItem("movie-explorer-theme") === "light" ? "light" : "dark",
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("movie-explorer-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar">
      <Link
        className="brand"
        to="/"
        onClick={closeMenu}
        aria-label="Movie Explorer home"
      >
        <span className="brand__icon" aria-hidden="true">
          <Clapperboard size={19} />
        </span>
        <span>Movie Explorer</span>
      </Link>

      <button
        type="button"
        className="menu-toggle"
        aria-expanded={menuOpen}
        aria-controls="main-navigation"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label="Toggle navigation"
      >
        {menuOpen ? <X size={21} /> : <Menu size={21} />}
      </button>

      <nav
        id="main-navigation"
        className={menuOpen ? "nav nav--open" : "nav"}
        aria-label="Main navigation"
      >
        <NavLink to="/" onClick={closeMenu}>
          Home
        </NavLink>
        <NavLink to="/search" onClick={closeMenu}>
          Search
        </NavLink>
        <NavLink to="/favorites" onClick={closeMenu}>
          <span>Favorites</span>
          {favorites.length > 0 && (
            <span className="nav-count">{favorites.length}</span>
          )}
        </NavLink>
        <NavLink to="/about" onClick={closeMenu}>
          About
        </NavLink>
      </nav>

      <div className="navbar__actions">
        <Link className="navbar__search" to="/search">
          <span>Search movies...</span>
          <Search size={18} aria-hidden="true" />
        </Link>
        <button
          type="button"
          className="theme-toggle"
          onClick={() =>
            setTheme((current) => (current === "dark" ? "light" : "dark"))
          }
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
        >
          {theme === "dark" ? <Moon size={19} /> : <Sun size={19} />}
        </button>
      </div>
    </header>
  );
}
