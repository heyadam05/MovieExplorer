import './Loading.css'

export function LoadingSection() {
  return (
    <section className="movie-section loading-section" aria-label="Loading movies" aria-busy="true">
      <div className="skeleton skeleton--heading" />
      <div className="movie-row">
        {Array.from({ length: 6 }, (_, index) => (
          <div className="movie-card skeleton-card" key={index}>
            <div className="skeleton skeleton--poster" />
            <div className="movie-card__body">
              <div className="skeleton skeleton--title" />
              <div className="skeleton skeleton--meta" />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
