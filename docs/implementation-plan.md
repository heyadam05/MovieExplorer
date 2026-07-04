# MovieExplorer – implementačný plán

Tento checklist rozdeľuje projekt na menšie, samostatne testovateľné etapy.

## 1. Základ aplikácie a Home UI

- [x] Design tokeny, globálne štýly a responzívny kontajner
- [x] Responzívna navigácia s mobilným menu
- [x] Hero sekcia a základné CTA
- [x] Znovupoužiteľné `MovieCard`, `MovieSection` a demo dáta
- [x] Trending, Popular, Top Rated a Upcoming sekcie
- [x] Footer
- [x] Dark/light téma uložená v `localStorage`
- [x] Finálne filmové obrázky z TMDB

## 2. Architektúra, routing a API

- [x] Nainštalovať a nastaviť React Router, Axios a Lucide React
- [x] Vytvoriť route kostru pre Home, Search, MovieDetail, Favorites, About a NotFound
- [x] Zaviesť typy pre TMDB odpovede a centrálny API klient
- [x] Pridať `.env.example` a bezpečné načítanie TMDB tokenu
- [x] Loading skeletony, chybové stavy a retry pre Home

## 3. Vyhľadávanie a filtre

- [x] Realtime vyhľadávanie s debounce
- [x] Filtre žánru, roku, hodnotenia, jazyka a zoradenia
- [x] Stránkovanie cez Load More
- [x] Empty state a synchronizácia filtrov s URL

## 4. Detail filmu

- [x] Detail, credits, director a produkčné informácie
- [x] Trailer a zdieľanie
- [x] Similar Movies a Recommendations
- [x] Responzívne rozloženie detailu

## 5. Obľúbené a UX

- [x] Favorites context a perzistencia v `localStorage`
- [x] Samostatná Favorites stránka a empty state
- [x] Toast notifikácie
- [x] Lazy loading obrázkov, scroll-to-top a jemné animácie
- [x] Prístupnosť klávesnicou a reduced-motion režim

## 6. Finálne overenie

- [ ] Automatické testy (odstránené podľa rozhodnutia vlastníka projektu)
- [x] Browser E2E test hlavných používateľských ciest
- [x] Kontrola mobil/tablet/desktop breakpointov
- [ ] Lighthouse kontrola výkonu a prístupnosti
- [x] Produkčný build bez TypeScript a ESLint chýb

## 7. Rozšírenia

- [x] Profil herca s jeho filmografiou
- [x] Vyhľadávanie filmov podľa mena herca
- [x] Automatický hero carousel s ručným ovládaním
- [x] Rozdelenie štýlov podľa komponentov a stránok
