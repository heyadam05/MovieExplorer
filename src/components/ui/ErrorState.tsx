import { RefreshCw } from 'lucide-react'
import './ErrorState.css'

interface ErrorStateProps {
  message: string
  onRetry: () => void
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <section className="error-state" role="alert">
      <span className="error-state__icon" aria-hidden="true">!</span>
      <h2>Something went off script</h2>
      <p>{message}</p>
      <button className="button button--primary" type="button" onClick={onRetry}>
        <RefreshCw size={17} /> Retry
      </button>
    </section>
  )
}
