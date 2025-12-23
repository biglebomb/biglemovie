import type { ReactElement } from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AppProviders } from '../app/providers/AppProviders'

export function renderWithProviders(ui: ReactElement, options?: { route?: string }) {
  const route = options?.route ?? '/'
  return render(
    <AppProviders>
      <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    </AppProviders>,
  )
}
