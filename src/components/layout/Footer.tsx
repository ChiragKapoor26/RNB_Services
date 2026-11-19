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
      {/* extra bottom padding on phones keeps the last links clear of the floating Enquire / chat buttons */}
      <div className="container-x pb-24 pt-10 md:py-16 lg:py-20">
        {/* phones: 2-column grid (brand + services span both columns, Company/Legal sit side by side) */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:gap-12 lg:grid-cols-12">
          {/* Brand + apps */}
          <div className="col-span-2 lg:col-span-4">
            <Link to="/" className="inline-flex items-center gap-3">
              <img src="/brand/rnb-main.webp" alt="" width={56} height={56} className="h-12 w-12 rounded-full bg-white p-1 md:h-14 md:w-14" loading="lazy" />
              <span className="font-display text-2xl font-semibold">R&amp;B Services</span>
              <span className="sr-only"> {ui.homeLink}</span>
            </Link>
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-white/70 md:mt-5">{ui.footerBlurb}</p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/50 md:mt-3">{ui.footerFee}</p>

            <h2 className="mt-6 font-sans text-xs font-bold uppercase tracking-[0.2em] text-white/50 md:mt-8">{ui.footerApps}</h2>
            <ul className="mt-3 flex gap-3 md:mt-4">
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

          {/* Services (two columns of links on phones) */}
          <div className="col-span-2 lg:col-span-3">
            <h2 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-white/50">{ui.footerServices}</h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-1 text-[15px] md:mt-5 md:block md:space-y-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`} className="block py-1.5 text-white/80 transition-colors hover:text-white md:inline md:py-0">
                    {s.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company + legal: side by side on phones, stacked in one column on desktop */}
          <div className="col-span-2 grid grid-cols-2 gap-x-6 md:block lg:col-span-2">
            {footerNav.map((group) => (
              <div key={group.title} className="md:mb-8 md:last:mb-0">
                <h2 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-white/50">{group.title}</h2>
                <ul className="mt-4 space-y-1 text-[15px] md:mt-5 md:space-y-2.5">
                  {group.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        to={{ pathname: l.to, hash: l.hash ? `#${l.hash}` : '' }}
                        className="block py-1.5 text-white/80 transition-colors hover:text-white md:inline md:py-0"
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
          <div className="col-span-2 lg:col-span-3">
            <h2 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-white/50">{ui.footerOffices}</h2>
            <ul className="mt-4 space-y-5 md:mt-5 md:space-y-6">
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

        <div className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-5 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between md:mt-14 md:gap-3 md:pt-6">
          <p>
            © {year} {ui.footerCopyright}
          </p>
          <p>{company.domain}</p>
        </div>
      </div>
    </footer>
  )
}
