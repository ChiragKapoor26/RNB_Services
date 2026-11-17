import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'
import { apps } from '@/data/apps'
import { company } from '@/data/company'
import { locations } from '@/data/locations'
import { footerNav, ui } from '@/data/nav'
import { services } from '@/data/services'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="on-dark relative bg-ink text-white" aria-label="Site footer">
      <div className="container-x py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand + apps */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-flex items-center gap-3">
              <img src="/brand/rnb-main.webp" alt="" width={56} height={56} className="h-14 w-14 rounded-full bg-white p-1" loading="lazy" />
              <span className="font-display text-2xl font-semibold">R&amp;B Services</span>
              <span className="sr-only"> {ui.homeLink}</span>
            </Link>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-white/70">{ui.footerBlurb}</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/50">{ui.footerFee}</p>

            <h2 className="mt-8 font-sans text-xs font-bold uppercase tracking-[0.2em] text-white/50">{ui.footerApps}</h2>
            <ul className="mt-4 flex gap-3">
              {apps.map((a) => (
                <li key={a.id}>
                  <Link
                    to={{ pathname: '/', hash: '#apps' }}
                    aria-label={a.name}
                    className="block overflow-hidden rounded-2xl ring-1 ring-white/15 transition-transform duration-300 hover:-translate-y-1"
                  >
                    <img src={a.logoSmall} alt={a.name} width={96} height={83} loading="lazy" className="h-[72px] w-[84px] object-cover" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h2 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-white/50">{ui.footerServices}</h2>
            <ul className="mt-5 space-y-2.5 text-[15px]">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`} className="text-white/80 transition-colors hover:text-white">
                    {s.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company + legal */}
          <div className="lg:col-span-2">
            {footerNav.map((group) => (
              <div key={group.title} className="mb-8 last:mb-0">
                <h2 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-white/50">{group.title}</h2>
                <ul className="mt-5 space-y-2.5 text-[15px]">
                  {group.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        to={{ pathname: l.to, hash: l.hash ? `#${l.hash}` : '' }}
                        className="text-white/80 transition-colors hover:text-white"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Offices */}
          <div className="lg:col-span-3">
            <h2 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-white/50">{ui.footerOffices}</h2>
            <ul className="mt-5 space-y-6">
              {locations.map((l) => (
                <li key={l.id} className="text-[15px] leading-relaxed">
                  <p className="font-semibold text-white">{l.label}</p>
                  <p className="mt-1 flex gap-2 text-white/70">
                    <MapPin size={16} className="mt-1 shrink-0" aria-hidden="true" />
                    <span>{l.address}</span>
                  </p>
                  {l.phone && (
                    <p className="mt-1 flex gap-2 text-white/70">
                      <Phone size={16} className="mt-1 shrink-0" aria-hidden="true" />
                      <a href={`tel:${l.phone.replace(/\s/g, '')}`} className="hover:text-white">
                        {l.phone}
                      </a>
                    </p>
                  )}
                </li>
              ))}
              {company.contact.email && (
                <li className="flex gap-2 text-[15px] text-white/70">
                  <Mail size={16} className="mt-1 shrink-0" aria-hidden="true" />
                  <a href={`mailto:${company.contact.email}`} className="hover:text-white">
                    {company.contact.email}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {ui.footerCopyright}
          </p>
          <p>{company.domain}</p>
        </div>
      </div>
    </footer>
  )
}
