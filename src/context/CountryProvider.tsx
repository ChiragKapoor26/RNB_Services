import { useCallback, useMemo, useState, type ReactNode } from 'react'
import type { CountryCode } from '@/data/types'
import { CountryContext } from './countryContext'

const KEY = 'rnb.country'

function initialCountry(): CountryCode {
  try {
    const saved = localStorage.getItem(KEY)
    if (saved === 'ghana' || saved === 'canada') return saved
  } catch {
    /* storage unavailable - fall through */
  }
  // Best-effort guess from the visitor's time zone; they can always switch.
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone ?? ''
    if (tz.startsWith('America/') || tz.startsWith('Canada/')) return 'canada'
  } catch {
    /* ignore */
  }
  return 'ghana'
}

export function CountryProvider({ children }: { children: ReactNode }) {
  const [country, setCountryState] = useState<CountryCode>(initialCountry)

  const setCountry = useCallback((c: CountryCode) => {
    setCountryState(c)
    try {
      localStorage.setItem(KEY, c)
    } catch {
      /* ignore */
    }
  }, [])

  const value = useMemo(() => ({ country, setCountry }), [country, setCountry])
  return <CountryContext.Provider value={value}>{children}</CountryContext.Provider>
}
