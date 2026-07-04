# Movie Explorer

Movie Explorer is a responsive movie discovery application built with React and TypeScript. It uses the TMDB API to provide current movie data, artwork, trailers, cast information, recommendations, and actor filmographies.

The project focuses on a clean user experience, maintainable architecture, strict typing, accessibility, and responsive design.

## Live Demo

[Open Movie Explorer](https://heymovieexplorer.netlify.app/)

## Features

- Browse trending, popular, top-rated, and upcoming movies
- Automatically rotating featured movie carousel with manual navigation
- Search by movie title or actor name
- Filter movies by genre, year, rating, language, and sorting preference
- View detailed movie information, including:
  - overview and release information
  - runtime, genres, rating, budget, and revenue
  - cast and director
  - official trailer
  - production companies
  - similar movies and recommendations
- Open actor profiles and browse their movie filmographies
- Filter actor filmographies by title, genre, year, and rating
- Save favorite movies to local storage
- Search and sort saved favorites
- Switch between dark and light themes
- Responsive navigation and layouts for mobile, tablet, and desktop
- Loading skeletons, empty states, error states, and retry actions
- Lazy-loaded route pages and images
- Keyboard-accessible controls and reduced-motion support

## Technology Stack

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [React Router](https://reactrouter.com/)
- [Axios](https://axios-http.com/)
- [Framer Motion](https://motion.dev/)
- [Lucide React](https://lucide.dev/)
- [React Hot Toast](https://react-hot-toast.com/)
- [TMDB API](https://developer.themoviedb.org/)

## Architecture

The application uses a route-based architecture with a shared layout and nested routes.

- `createBrowserRouter` defines the application routes
- `AppLayout` provides the shared navigation, footer, toast container, and `Outlet`
- route pages are loaded lazily where appropriate
- API access is separated into the client, mappers, and domain services
- reusable stateful behavior is extracted into custom hooks
- component and page styles are colocated with their corresponding React files
- shared design tokens and global styles are stored separately

## Project Structure

```text
src/
├── api/          # TMDB client, data mappers, and domain services
├── components/   # Reusable UI components and colocated styles
├── context/      # Application-wide context providers
├── hooks/        # Reusable React hooks
├── layouts/      # Shared route layouts
├── pages/        # Route-level pages and page-specific styles
├── routes/       # Router configuration and route effects
├── styles/       # Global styles, reset, variables, and utilities
├── types/        # Domain and API type definitions
├── utils/        # Framework-independent helper functions
└── main.tsx      # Application entry point
```

## Routes

| Route         | Description                                       |
| ------------- | ------------------------------------------------- |
| `/`           | Home page with featured and categorized movies    |
| `/search`     | Movie and actor search with filters               |
| `/movie/:id`  | Movie details, cast, trailer, and recommendations |
| `/person/:id` | Actor profile and filterable filmography          |
| `/favorites`  | Locally saved favorite movies                     |
| `/about`      | Project information and TMDB attribution          |
| `*`           | Custom not-found page                             |

## Getting Started

### Prerequisites

- Node.js 20 or newer
- pnpm
- TMDB API read access token

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd movieexplorer
   ```

2. Install the dependencies:

   ```bash
   pnpm install
   ```

3. Create a local environment file:

   ```bash
   cp .env.example .env.local
   ```

4. Add your TMDB read access token to `.env.local`:

   ```env
   VITE_TMDB_ACCESS_TOKEN=your_tmdb_read_access_token
   ```

5. Start the development server:

   ```bash
   pnpm dev
   ```

## Available Scripts

| Command        | Description                                  |
| -------------- | -------------------------------------------- |
| `pnpm dev`     | Start the local development server           |
| `pnpm build`   | Run TypeScript and create a production build |
| `pnpm lint`    | Run type-aware ESLint checks                 |
| `pnpm preview` | Preview the production build locally         |

## Environment Variables

| Variable                 | Required | Description                |
| ------------------------ | -------- | -------------------------- |
| `VITE_TMDB_ACCESS_TOKEN` | Yes      | TMDB API read access token |

Never commit `.env.local` or expose private credentials in the repository.

## Data Persistence

The application stores the following information in the browser:

- favorite movies
- selected color theme

No user account or external database is required.

## Quality

- Strict TypeScript configuration
- Type-aware ESLint rules
- Reusable domain services and data mappers
- Route-level code splitting
- Responsive layouts
- Accessible labels and keyboard interactions
- Reduced-motion support
- No known production dependency vulnerabilities at the time of the latest audit

## TMDB Attribution

Movie data and images are provided by [The Movie Database (TMDB)](https://www.themoviedb.org/).

This product uses the TMDB API but is not endorsed or certified by TMDB.
