Výborný výber. **Movie Explorer** je presne ten typ projektu, ktorý vyzerá moderne, naučí ťa veľa Reactu a TypeScriptu a zároveň sa dá dokončiť za rozumný čas. Cieľ by mal byť vytvoriť aplikáciu, ktorá pôsobí ako menšia verzia Netflixu alebo IMDb.

---

# 🎯 Cieľ projektu

Vytvoriť modernú webovú aplikáciu, v ktorej môže používateľ:

* vyhľadávať filmy,
* prezerať detaily,
* ukladať si obľúbené,
* objavovať trendy,
* filtrovať filmy,
* a mať pekné používateľské rozhranie.

Nebude to klon Netflixu. Bude to vlastný produkt.

---

# 🎨 Design System

## Style

Moderný
Minimalistický
Tmavý (Dark First)

Inšpirácia:

* Netflix
* Letterboxd
* TMDB
* Spotify

---

# 🎨 Farebná paleta

### Background

```
#0F172A
```

---

### Secondary Background

```
#1E293B
```

---

### Cards

```
#334155
```

---

### Primary

```
#6366F1
```

(indigo)

---

### Hover

```
#818CF8
```

---

### Success

```
#22C55E
```

---

### Warning

```
#F59E0B
```

---

### Error

```
#EF4444
```

---

### White

```
#F8FAFC
```

---

### Gray text

```
#94A3B8
```

---

# Font

Google Font

**Poppins**

Alternatíva:

Inter

---

# Border Radius

Buttons

```
12px
```

Inputs

```
12px
```

Cards

```
18px
```

Movie Poster

```
16px
```

Modal

```
20px
```

---

# Shadows

Veľmi jemné.

Nie Material Design.

```
0 10px 30px rgba(0,0,0,.25)
```

---

# Ikony

Lucide React

Používať outline štýl.

---

# Animácie

Použiť:

Framer Motion

Animácie:

* fade
* slide
* hover scale
* card lift
* page transition

Žiadne prehnané efekty.

---

# Rozloženie

```
Navbar

Hero

Trending Movies

Popular Movies

Top Rated

Upcoming

Footer
```

---

# ROUTES

```
/

Home

/movie/:id

Search

Favorites

About

404
```

---

# Navbar

Vľavo:

🎬 logo

Movie Explorer

Vpravo

```
Home

Search

Favorites

About

Theme Toggle
```

Mobil:

Hamburger menu.

---

# HOME

Obsahuje:

---

## Hero Section

Veľký banner.

Pozadie:

náhodný populárny film.

Gradient.

Obsah:

```
Movie title

Overview

Watch Details
```

Veľké CTA tlačidlo.

---

## Trending

Horizontálny slider.

---

## Popular

Grid.

---

## Top Rated

Grid.

---

## Upcoming

Grid.

---

Každá sekcia:

```
See all →
```

---

# Movie Card

Obsahuje

Poster

Title

Year

Rating ⭐

Genres

Hover:

```
scale

shadow

overlay

Details button
```

---

# SEARCH PAGE

Veľký input.

```
Search movies...
```

Realtime search.

---

Filtre

Genre

Year

Sort

Rating

Language

---

Výsledky

Grid kariet.

---

# MOVIE DETAIL

Veľký banner.

Poster

Title

Release date

Runtime

Genres

Rating

Overview

Cast

Director

Trailer

Production

Language

Budget

Revenue

Similar Movies

Recommendations

---

Buttons

❤️ Favorite

🔗 Share

---

# FAVORITES

Lokálne uložené.

Grid.

Ak nič:

```
No favorites yet.

Explore movies →
```

---

# ABOUT

Krátky popis.

Použité technológie.

React

TypeScript

Vite

TMDB API

Framer Motion

React Router

---

# FOOTER

Logo

Github

LinkedIn

Copyright

---

# API

TMDB

Použiť endpointy:

Trending

Popular

Upcoming

Top Rated

Movie Detail

Movie Credits

Recommendations

Genres

Search

---

# Loading

Skeleton Cards.

Nie spinner.

---

# Error State

Veľká ilustrácia.

Retry button.

---

# Empty Search

```
No movies found.

Try another search.
```

---

# Components

```
Navbar

Footer

Button

MovieCard

MovieGrid

MovieCarousel

SearchInput

GenreBadge

RatingBadge

LoadingSkeleton

Modal

Pagination

Hero

SectionTitle

ThemeToggle

EmptyState
```

---

# State

```
Search

Favorites

Theme

Movies

Filters

Loading

Error
```

---

# LocalStorage

```
Favorites

Theme
```

---

# TypeScript Interfaces

```
Movie

Genre

Cast

Crew

ApiResponse

SearchResponse
```

---

# UX

✅ Hover na všetko

✅ Pekné loadingy

✅ Plynulé animácie

✅ Infinite scroll alebo Load More

✅ Scroll To Top

✅ Lazy Loading obrázkov

✅ Responsive

---

# Breakpoints

```
Mobile

<640px

Tablet

640–1024px

Desktop

>1024px
```

---

# Štruktúra projektu

```
src/

├── assets/
│
├── components/
│   ├── ui/
│   ├── movie/
│   ├── layout/
│   └── common/
│
├── pages/
│   ├── Home/
│   ├── Search/
│   ├── MovieDetail/
│   ├── Favorites/
│   ├── About/
│   └── NotFound/
│
├── layouts/
│
├── hooks/
│
├── services/
│
├── api/
│
├── types/
│
├── utils/
│
├── styles/
│
├── context/
│
├── routes/
│
└── App.tsx
```

---

# Knižnice

* React Router DOM
* Axios
* Framer Motion
* Lucide React
* React Hot Toast
* React Loading Skeleton

---

# Čo sa na tomto projekte naučíš

* Komponentová architektúra v Reacte
* Typovanie dát pomocou TypeScriptu
* Prácu s externým REST API
* Dynamické routovanie (`/movie/:id`)
* Správu globálneho stavu (napr. Context API)
* Ukladanie dát do `localStorage`
* Prácu s asynchrónnymi požiadavkami a loading/error stavmi
* Responzívny dizajn a moderné UI princípy
* Základy animácií pomocou Framer Motion

Ak tento projekt dotiahneš do detailov (kvalitný dizajn, čistý kód, responzivita a dobré UX), bude to veľmi silná ukážka do portfólia pre junior React/TypeScript pozície.
