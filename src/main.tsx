import { createRoot } from 'react-dom/client'
import { FavoritesProvider } from './context/FavoritesProvider'
import { AppRouter } from './routes/AppRouter'
import './styles/globals.css'

createRoot(document.getElementById('root')!).render(
  <FavoritesProvider>
    <AppRouter />
  </FavoritesProvider>
)
