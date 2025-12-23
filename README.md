# BigleMovie (Senior Frontend Assignment)

React + TypeScript + Vite app that uses TMDB API v3. There's no backend - everything like registration, session, theme, and favorites gets saved in `localStorage`. The TMDB stuff is cached in memory but that gets cleared when you refresh.

## Requirements

- Node.js 20+
- You'll need a TMDB API key (v3)

## Setup

1) Install dependencies:

```bash
bun install
```

If Bun gives you an `EPERM` error on Windows during package extraction, try this instead:

```bash
bun install --no-cache --backend=copyfile
```

2) Copy the `.env.example` file and add your API key:

```bash
cp .env.example .env
```

Then set your key:

```bash
VITE_TMDB_API_KEY=...
```

## Run

```bash
bun run dev
```

## Test

```bash
bun run test
```

## Lint / Format / Build

```bash
bun run lint
bun run format
bun run build
bun run preview
```

## Notes

- Email registration hashes passwords with SHA-256 using Web Crypto (`crypto.subtle`). This is just for the assignment, don't use this in production.
- Favorites are stored per user under `biglemovie.favorites.<userId>`.
- Using Tailwind + shadcn/ui for the UI. shadcn is set up via `components.json` - add new components with `bunx --bun shadcn@latest add <component>`.
- Favorites use Zustand for state management (should be easy to swap out the persistence layer later if needed).

## Docs

- `docs/ARCHITECTURE.md`
- `docs/DECISIONS.md`
- `docs/MISSING_FEATURES.md`
