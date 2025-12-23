# Architecture

## Tech

- React + TypeScript + Vite
- React Router for routing
- Tailwind CSS + shadcn/ui (built on Radix primitives)
- TMDB API v3 (all client-side, no backend)
- Everything persists in `localStorage` (auth, session, theme, language, favorites)
- TMDB requests are cached in memory during the session, but it clears on refresh

## Folder structure

- `src/app/`: app shell stuff - routing and global providers (auth, theme, i18n)
- `src/components/`: shared UI components (the `components/ui/*` stuff is from shadcn)
- `src/features/`: feature modules (`auth`, `movies`, `favorites`)
- `src/lib/`: utilities (hooks, TMDB client, storage helpers, `cn` function)
- `src/pages/`: route-level pages
- `src/test/`: test helpers

## Data flow

### Auth

`AuthProvider` reads the session from localStorage (migrates from old key if needed), loads the user, and handles:
- Email register/login (password hashed with SHA-256 via Web Crypto API)
- Fake Google login (just prompts for name and generates a random provider id)
- Logout (clears session)

`RequireAuth` wraps protected routes and redirects to `/auth?next=...` if not logged in.

### Favorites

Uses a small Zustand store at `src/features/favorites/store.ts`. When you log in/register/logout, `AuthProvider` updates the store with the current `userId`. Each user's favorites are saved in localStorage at `biglemovie.favorites.<userId>`.

### TMDB client + cache

`src/lib/tmdb/client.ts` has typed helpers for the TMDB endpoints. There's a simple in-memory `Map` that caches responses by URL - stores the Promise itself so concurrent requests for the same thing get deduped. Cache intentionally doesn't persist, so it resets every page refresh.
