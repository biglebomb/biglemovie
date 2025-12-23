import userEvent from '@testing-library/user-event'
import { screen } from '@testing-library/react'
import { MovieCard } from './MovieCard'
import { renderWithProviders } from '../../test/render'
import { useFavoritesStore } from '@/features/favorites/store'

describe('MovieCard', () => {
  beforeEach(() => {
    useFavoritesStore.setState({ userId: null, favorites: [] })
    localStorage.clear()
    localStorage.setItem(
      'biglemovie.users',
      JSON.stringify([
        {
          id: 'email:test@example.com',
          provider: 'email',
          email: 'test@example.com',
          displayName: 'Tester',
          createdAt: 1,
          passwordHash: 'x',
        },
      ]),
    )
    localStorage.setItem('biglemovie.session', JSON.stringify({ userId: 'email:test@example.com', createdAt: 1 }))
    useFavoritesStore.getState().setUser('email:test@example.com')
  })

  it('renders title and toggles favorite', async () => {
    renderWithProviders(
      <MovieCard
        movie={{
          id: 42,
          title: 'The Answer',
          poster_path: null,
          backdrop_path: null,
          release_date: '2020-01-01',
          vote_average: 8.2,
          vote_count: 10,
          overview: 'Test',
        }}
      />,
      { route: '/' },
    )

    expect(screen.getByText('The Answer')).toBeInTheDocument()

    const favButton = screen.getByRole('button', { name: /add to favorites/i })
    expect(favButton).toHaveAttribute('aria-pressed', 'false')

    await userEvent.click(favButton)
    expect(screen.getByRole('button', { name: /remove from favorites/i })).toHaveAttribute('aria-pressed', 'true')
  })
})
