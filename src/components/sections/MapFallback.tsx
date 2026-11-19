import { ExternalLink, MapPin } from 'lucide-react'
import { useCountry } from '@/context/countryContext'
import { home } from '@/data/home'
import { getLocation, locations } from '@/data/locations'
import { hasGoogleMapsKey } from '@/lib/env'
import { cn } from '@/lib/cn'
import { mapsSearchUrl } from '@/lib/format'

/**
 * Elegant static stand-in for the Google Map (no API key yet, or still loading).
 * Always offers an "Open in Google Maps" link so visitors can still find us.
 */
export function MapFallback({ loading = false }: { loading?: boolean }) {
  const { country, setCountry } = useCountry()
  const active = getLocation(country)

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#e9edf7] py-3 md:py-4">
      {/* subtle map-like grid + roads */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'linear-gradient(rgba(47,95,224,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(47,95,224,0.10) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />
      <svg aria-hidden="true" viewBox="0 0 400 300" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
        <path d="M-20 220 C 80 180, 140 250, 230 190 S 360 130, 430 160" fill="none" stroke="#fff" strokeWidth="14" strokeLinecap="round" />
        <path d="M60 -10 C 90 80, 70 150, 140 320" fill="none" stroke="#fff" strokeWidth="10" strokeLinecap="round" />
        <path d="M300 -10 C 280 70, 330 140, 300 320" fill="none" stroke="#fff" strokeWidth="8" strokeLinecap="round" />
        <circle cx="210" cy="140" r="70" fill="rgba(62,119,66,0.14)" />
      </svg>

      <div className="relative z-10 mx-5 flex max-w-sm flex-col items-center text-center">
        <div className="relative">
          <span className="absolute inset-0 animate-pulse-ring rounded-full" aria-hidden="true" />
          <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-xl ring-[3px] ring-royal md:h-[68px] md:w-[68px] md:ring-4">
            <img src="/brand/rnb-main.webp" alt="" width={64} height={64} className="h-9 w-9 rounded-full md:h-[52px] md:w-[52px]" />
          </div>
        </div>
        <p className="mt-2 font-display text-xl font-semibold text-ink sm:text-2xl md:mt-3 md:text-3xl">{active.city}, {active.country}</p>
        <p className="mt-0.5 flex items-center gap-1.5 text-sm text-muted md:mt-1">
          <MapPin size={14} aria-hidden="true" />
          {loading ? home.map.loading : home.map.staticLabel}
        </p>

        <div className="mt-3 flex flex-wrap justify-center gap-2 md:mt-4">
          {locations.map((l) => (
            <button
              key={l.id}
              type="button"
              aria-pressed={l.id === country}
              onClick={() => setCountry(l.id)}
              className={cn(
                'rounded-full px-4 py-1.5 text-sm font-semibold transition-colors md:py-2',
                l.id === country ? 'bg-ink text-white' : 'bg-white text-ink hover:bg-paper',
              )}
            >
              {l.city}
            </button>
          ))}
        </div>

        <a
          href={mapsSearchUrl(`${active.city}, ${active.country}`)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-2 rounded-full bg-royal px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-royal-deep md:mt-4"
        >
          {home.map.openInMaps}
          <ExternalLink size={15} aria-hidden="true" />
        </a>
        {!hasGoogleMapsKey && <p className="mt-2 hidden text-xs text-muted md:block">{home.map.fallbackNote}</p>}
      </div>
    </div>
  )
}
