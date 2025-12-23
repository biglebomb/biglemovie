import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/app/providers/AuthProvider'
import { useFavorites } from '@/features/favorites/useFavorites'
import { useTheme } from '@/app/providers/ThemeProvider'
import { useI18n } from '@/app/providers/I18nProvider'
import { cn } from '@/lib/utils'

export function AppHeader() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const auth = useAuth()
  const { favorites } = useFavorites()
  const { theme, toggleTheme } = useTheme()
  const { lang, toggleLang, t } = useI18n()
  const navigate = useNavigate()

  return (
    <>
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
        <a
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-md focus:border focus:bg-background focus:px-3 focus:py-2"
          href="#main"
        >
          Skip to content
        </a>
        <div className="relative mx-auto flex w-full max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:grid sm:grid-cols-[auto,1fr,auto]">
          {/* Mobile: Hamburger menu button */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="sm:hidden"
            onClick={() => setIsDrawerOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Desktop: App name on left */}
          <div className="hidden font-extrabold tracking-tight sm:block">BigleMovie</div>

          {/* Mobile: Centered app name */}
          <div className="absolute left-1/2 -translate-x-1/2 font-extrabold tracking-tight sm:hidden">BigleMovie</div>

          {/* Desktop: Navigation */}
          <nav className="hidden flex-wrap gap-1 sm:flex sm:justify-center" aria-label="Primary navigation">
            <NavLink
              to="/"
              className={({ isActive }) =>
                cn(
                  'rounded-md px-3 py-2 text-sm font-semibold text-foreground/80 hover:bg-accent hover:text-foreground',
                  isActive && 'bg-accent text-foreground',
                )
              }
            >
              {t('navHome')}
            </NavLink>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-foreground/80 hover:bg-accent hover:text-foreground',
                  isActive && 'bg-accent text-foreground',
                )
              }
            >
              {t('navFavorites')}
              <Badge variant="secondary">{favorites.length}</Badge>
            </NavLink>
          </nav>

          {/* Desktop: User actions */}
          <div className="hidden flex-wrap items-center gap-2 sm:flex sm:justify-end">
            <Button
              type="button"
              variant="ghost"
              onClick={toggleLang}
              aria-label={`${t('language')}: ${lang.toUpperCase()}`}
            >
              {lang.toUpperCase()}
            </Button>
            <Button type="button" variant="ghost" onClick={toggleTheme} aria-label={`${t('theme')}: ${theme}`}>
              {theme === 'dark' ? 'Dark' : 'Light'}
            </Button>
            <div className="flex items-center gap-2">
              <span className="max-w-[12ch] truncate text-sm text-muted-foreground">{auth.user?.displayName}</span>
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  auth.logout()
                  navigate('/auth', { replace: true })
                }}
              >
                {t('logout')}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={cn(
          'fixed inset-0 z-50 bg-black/50 transition-opacity sm:hidden',
          isDrawerOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={() => setIsDrawerOpen(false)}
        aria-hidden={!isDrawerOpen}
      >
        <div
          className={cn(
            'fixed left-0 top-0 h-full w-3/4 max-w-sm bg-background shadow-lg transition-transform',
            isDrawerOpen ? 'translate-x-0' : '-translate-x-full',
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b p-4">
              <h2 className="text-lg font-semibold">Menu</h2>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setIsDrawerOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="flex flex-1 flex-col gap-1 p-4" aria-label="Primary navigation">
              <NavLink
                to="/"
                onClick={() => setIsDrawerOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'rounded-md px-3 py-2 text-sm font-semibold text-foreground/80 hover:bg-accent hover:text-foreground',
                    isActive && 'bg-accent text-foreground',
                  )
                }
              >
                {t('navHome')}
              </NavLink>
              <NavLink
                to="/favorites"
                onClick={() => setIsDrawerOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-foreground/80 hover:bg-accent hover:text-foreground',
                    isActive && 'bg-accent text-foreground',
                  )
                }
              >
                {t('navFavorites')}
                <Badge variant="secondary">{favorites.length}</Badge>
              </NavLink>
            </nav>
            <div className="border-t p-4">
              <div className="flex flex-col gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={toggleLang}
                  className="justify-start"
                  aria-label={`${t('language')}: ${lang.toUpperCase()}`}
                >
                  {lang.toUpperCase()}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={toggleTheme}
                  className="justify-start"
                  aria-label={`${t('theme')}: ${theme}`}
                >
                  {theme === 'dark' ? 'Dark' : 'Light'}
                </Button>
                <div className="flex items-center justify-between gap-2 border-t pt-2">
                  <span className="max-w-[12ch] truncate text-sm text-muted-foreground">{auth.user?.displayName}</span>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      auth.logout()
                      navigate('/auth', { replace: true })
                    }}
                  >
                    {t('logout')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
