# Decisions & Tradeoffs

## State management

Auth stayed as a provider since it needs to handle routing (protected routes) and manage session lifecycle. Favorites use Zustand (`src/features/favorites/store.ts`) - just wanted the store ergonomics (selectors, smaller API surface). Having that store boundary also makes it easy to swap out localStorage for a real backend later if needed.

## Caching & performance

TMDB requests get cached in memory using a `Map` keyed by the full URL. The cache stores the Promise, which dedupes concurrent fetches for the same thing. We don't persist the cache - it resets on refresh by design. Keeps things predictable and avoids stale data issues.

## Accessibility

Inputs have visible labels and error messages use `role="alert"`. Navigation uses proper `<nav>` elements and there's a "Skip to content" link. Favorite buttons use `aria-pressed` for toggle state and descriptive `aria-label`s since they're icon-only.

## Styling

Tailwind + CSS variables (via shadcn/ui) handle theming. Dark mode is just a `.dark` class on `html`. Theme preference gets saved to localStorage. Using shadcn primitives keeps the UI consistent without pulling in a heavy framework.

## Testing approach

Vitest + React Testing Library. Keeping tests minimal - just covering:
- `useFormField` behavior
- Auth validation functions
- `MovieCard` rendering and favorite toggle interaction
