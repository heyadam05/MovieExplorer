import './Loading.css'

export function PageFallback() {
  return (
    <main className="page-fallback" aria-label="Loading page" aria-busy="true">
      <div className="skeleton page-fallback__block" />
    </main>
  )
}

