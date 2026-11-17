import { useEffect, useId, useRef, useState, useSyncExternalStore } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, m } from 'framer-motion'
import { ChevronDown, Menu, X } from 'lucide-react'
import { mainNav, ui, type NavLink } from '@/data/nav'
import { services } from '@/data/services'
import { cn } from '@/lib/cn'
import { getLenis } from '@/lib/lenis'
import { enquiryHref } from '@/lib/format'
import { accentStyles } from '@/lib/accent'
import { useCountry } from '@/context/countryContext'
import { Button } from '@/components/ui/Button'
import { CountryToggle } from '@/components/ui/CountryToggle'
import { Icon } from '@/components/ui/Icon'

function useScrolled(threshold = 8) {
  return useSyncExternalStore(
    (cb) => {
      window.addEventListener('scroll', cb, { passive: true })
      return () => window.removeEventListener('scroll', cb)
    },
    () => window.scrollY > threshold,
    () => false,
  )
}

function NavItem({ link, onNavigate, className }: { link: NavLink; onNavigate?: () => void; className?: string }) {
  return (
    <Link
      to={{ pathname: link.to, hash: link.hash ? `#${link.hash}` : '' }}
      onClick={onNavigate}
      className={className}
    >
      {link.label}
    </Link>
  )
}

export function Header() {
  const scrolled = useScrolled()
  const location = useLocation()
  const { country } = useCountry()
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const servicesRef = useRef<HTMLDivElement>(null)
  const servicesPanelId = useId()
  const menuId = useId()

  // Close the services mega-menu on outside click / Escape
  useEffect(() => {
    if (!servicesOpen) return
    const onDown = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) setServicesOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setServicesOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [servicesOpen])

  // Lock page scroll while the mobile menu is open
  useEffect(() => {
    if (!menuOpen) return
    getLenis()?.stop()
    document.documentElement.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => {
      getLenis()?.start()
      document.documentElement.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  const closeAll = () => {
    setMenuOpen(false)
    setServicesOpen(false)
  }

  const linkClass =
    'rounded-full px-3.5 py-2 text-[15px] font-medium text-ink/80 transition-colors hover:bg-ink/5 hover:text-ink'

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500',
        scrolled || menuOpen
          ? 'bg-paper/85 shadow-[0_1px_0_rgba(11,15,26,0.08)] backdrop-blur-xl'
          : 'bg-transparent',
      )}
    >
      <div className="container-x flex h-16 items-center justify-between gap-4 lg:h-[72px]">
        <Link
          to="/"
          onClick={closeAll}
          className="flex items-center gap-2.5"
        >
          <img
            src="/brand/rnb-main.webp"
            alt=""
            width={44}
            height={44}
            className="h-10 w-10 rounded-full bg-white p-[2px] shadow-sm ring-1 ring-ink/10 lg:h-11 lg:w-11"
          />
          <span className="leading-none">
            <span className="block whitespace-nowrap font-display text-xl font-semibold tracking-tight text-ink">R&amp;B Services </span>
            <span className="mt-0.5 block text-[10px] font-bold uppercase tracking-[0.22em] text-royal">Online</span>
            <span className="sr-only"> {ui.homeLink}</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          <div ref={servicesRef} className="relative">
            <button
              type="button"
              aria-expanded={servicesOpen}
              aria-controls={servicesPanelId}
              onClick={() => setServicesOpen((o) => !o)}
              className={cn(linkClass, 'inline-flex items-center gap-1', servicesOpen && 'bg-ink/5 text-ink')}
            >
              {ui.servicesMenu}
              <ChevronDown
                size={16}
                aria-hidden="true"
                className={cn('transition-transform duration-300', servicesOpen && 'rotate-180')}
              />
            </button>
            <AnimatePresence>
              {servicesOpen && (
                <m.div
                  id={servicesPanelId}
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-1/2 top-full mt-3 w-[min(860px,92vw)] -translate-x-1/2 rounded-3xl border border-ink/10 bg-white/95 p-3 shadow-[0_40px_80px_-30px_rgba(11,15,26,0.35)] backdrop-blur-xl"
                >
                  <ul className="grid grid-cols-3 gap-1">
                    {services.map((s) => (
                      <li key={s.slug}>
                        <Link
                          to={`/services/${s.slug}`}
                          onClick={closeAll}
                          className="group flex items-start gap-3 rounded-2xl p-3 transition-colors hover:bg-paper"
                        >
                          <span
                            className={cn(
                              'mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl',
                              accentStyles[s.accent].soft,
                            )}
                          >
                            <Icon name={s.icon} size={18} />
                          </span>
                          <span>
                            <span className="block text-sm font-semibold text-ink">{s.shortTitle}</span>
                            <span className="mt-0.5 line-clamp-2 block text-xs leading-snug text-muted">{s.summary}</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </m.div>
              )}
            </AnimatePresence>
          </div>
          {mainNav.map((l) => (
            <NavItem key={l.label} link={l} onNavigate={closeAll} className={linkClass} />
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden md:block">
            <CountryToggle />
          </div>
          <div className="hidden sm:block">
            <Button to={enquiryHref({ country })} size="sm" onClick={closeAll}>
              {ui.headerCta}
            </Button>
          </div>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-ink/5 lg:hidden"
            aria-label={menuOpen ? ui.menuClose : ui.menuOpen}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <m.div
            id={menuId}
            key={location.key}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            data-lenis-prevent
            className="fixed inset-x-0 top-16 bottom-0 overflow-y-auto overscroll-contain bg-paper px-5 pb-12 pt-4 lg:hidden"
          >
            <div className="mb-5 flex items-center justify-between gap-3">
              <CountryToggle />
              <Button to={enquiryHref({ country })} size="sm" onClick={closeAll}>
                {ui.headerCta}
              </Button>
            </div>
            <nav aria-label="Mobile">
              <p className="mb-2 px-1 text-xs font-bold uppercase tracking-[0.2em] text-muted">{ui.servicesMenu}</p>
              <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link
                      to={`/services/${s.slug}`}
                      onClick={closeAll}
                      className="flex items-center gap-3 rounded-2xl p-3 hover:bg-white"
                    >
                      <span className={cn('flex h-10 w-10 items-center justify-center rounded-xl', accentStyles[s.accent].soft)}>
                        <Icon name={s.icon} size={20} />
                      </span>
                      <span className="text-[15px] font-semibold text-ink">{s.shortTitle}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="mt-6 border-t border-ink/10 pt-4">
                {mainNav.map((l) => (
                  <li key={l.label}>
                    <NavItem
                      link={l}
                      onNavigate={closeAll}
                      className="block rounded-2xl px-3 py-3 font-display text-2xl text-ink hover:bg-white"
                    />
                  </li>
                ))}
              </ul>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  )
}
