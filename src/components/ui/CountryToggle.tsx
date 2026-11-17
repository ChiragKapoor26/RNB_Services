import { useCountry } from '@/context/countryContext'
import { countryMeta } from '@/data/company'
import { COUNTRY_CODES } from '@shared/constants'
import { cn } from '@/lib/cn'

/** Segmented control that switches the selected country (and with it GH₵ / CA$ pricing). */
export function CountryToggle({ tone = 'light', className }: { tone?: 'light' | 'dark'; className?: string }) {
  const { country, setCountry } = useCountry()
  const dark = tone === 'dark'
  return (
    <div
      role="group"
      aria-label="Choose country and currency"
      className={cn('inline-flex rounded-full p-1 text-sm font-semibold', dark ? 'bg-white/10' : 'bg-ink/[0.06]', className)}
    >
      {COUNTRY_CODES.map((code) => {
        const active = country === code
        return (
          <button
            key={code}
            type="button"
            aria-pressed={active}
            onClick={() => setCountry(code)}
            className={cn(
              'rounded-full px-3.5 py-1.5 transition-colors duration-300',
              active
                ? dark
                  ? 'bg-white text-ink shadow'
                  : 'bg-white text-ink shadow-[0_2px_8px_rgba(11,15,26,0.12)]'
                : dark
                  ? 'text-white/70 hover:text-white'
                  : 'text-muted hover:text-ink',
            )}
          >
            {countryMeta[code].label}
            <span className={cn('ml-1.5 text-xs font-medium', active ? 'text-muted' : dark ? 'text-white/80' : 'text-muted')}>
              {countryMeta[code].currencySymbol}
            </span>
          </button>
        )
      })}
    </div>
  )
}
