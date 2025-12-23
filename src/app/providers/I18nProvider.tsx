import { createContext, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import en from '@/i18n/en.json'
import id from '@/i18n/id.json'

export type Language = 'en' | 'id'

const LANG_KEY = 'biglemovie.lang'

const dict = { en, id } as const
type Keys = keyof typeof en

type I18nContextValue = {
  lang: Language
  t: (key: Keys) => string
  setLang: (lang: Language) => void
  toggleLang: () => void
}

const I18nContext = createContext<I18nContextValue | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    const stored = localStorage.getItem(LANG_KEY)
    return (stored === 'en' || stored === 'id' ? stored : 'en') as Language
  })

  const value = useMemo<I18nContextValue>(() => {
    const t = (key: Keys) => dict[lang][key] ?? dict.en[key]
    const setLang = (next: Language) => {
      setLangState(next)
      localStorage.setItem(LANG_KEY, next)
    }
    return { lang, t, setLang, toggleLang: () => setLang(lang === 'en' ? 'id' : 'en') }
  }, [lang])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
