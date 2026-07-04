import './Loading.css'
import './MovieGrid.css'

export function SearchSkeleton() {
  return (
    <div className="movie-grid" aria-label="Loading search results" aria-busy="true">
      {Array.from({ length: 12 }, (_, index) => (
        <div className="movie-card skeleton-card" key={index}>
          <div className="skeleton skeleton--grid-poster" />
          <div className="movie-card__body">
            <div className="skeleton skeleton--title" />
            <div className="skeleton skeleton--meta" />
          </div>
        </div>
      ))}
    </div>
  )
}
