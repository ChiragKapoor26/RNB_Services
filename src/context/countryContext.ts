import { createContext, useContext } from 'react'
import type { CountryCode } from '@/data/types'

export interface CountryCtx {
  country: CountryCode
  setCountry: (c: CountryCode) => void
}

export const CountryContext = createContext<CountryCtx | null>(null)

export function useCountry(): CountryCtx {
  const ctx = useContext(CountryContext)
  if (!ctx) throw new Error('useCountry must be used inside <CountryProvider>')
  return ctx
}
