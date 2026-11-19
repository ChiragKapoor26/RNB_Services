import { apps } from '@/data/apps'
import { home } from '@/data/home'
import { accentStyles } from '@/lib/accent'
import { cn } from '@/lib/cn'
import { TiltCard3D } from '@/components/cards/TiltCard3D'
import { SectionHeading } from '@/components/ui/SectionHeading'

function StoreButton({ label, href }: { label: string; href: string }) {
  const base = 'inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold'
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cn(base, 'bg-ink text-white hover:bg-royal transition-colors')}>
        {label}
      </a>
    )
  }
  return (
    <span aria-disabled="true" className={cn(base, 'cursor-not-allowed border border-ink/15 text-ink/60')}>
      {label}
      <span className="rounded-full bg-ink/[0.07] px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide">{home.apps.comingSoon}</span>
    </span>
  )
}

/**
 * On phones each app is a compact card (logo + name on one row, description and a single
 * "Coming soon" badge below) instead of a tall poster card with two identical disabled store buttons.
 */
export function AppsSection() {
  const a = home.apps
  return (
    <section id="apps" data-theme="paper" aria-labelledby="apps-title" className="scroll-mt-20 py-12 md:py-32">
      <div className="container-x">
        <div id="apps-title">
          <SectionHeading eyebrow={a.eyebrow} title={a.title} subtitle={a.subtitle} className="max-md:[&>p:last-child]:hidden" />
        </div>
        <ul className="mt-6 grid gap-3 md:mt-14 md:gap-7 lg:grid-cols-3">
          {apps.map((app, i) => {
            const live = Boolean(app.stores.ios || app.stores.android)
            return (
              <li key={app.id}>
                <TiltCard3D index={i} radiusClass="rounded-[24px] md:rounded-[32px]">
                  <article
                    className={cn(
                      'grid h-full grid-cols-[5rem_1fr] items-center gap-x-4 gap-y-3 rounded-[24px] bg-white p-3.5 ring-1 ring-ink/[0.07] [transform-style:preserve-3d]',
                      'md:flex md:flex-col md:items-stretch md:gap-0 md:rounded-[32px] md:p-5',
                      'shadow-[0_2px_4px_rgba(11,15,26,0.04),0_30px_60px_-28px_rgba(11,15,26,0.3)]',
                    )}
                  >
                    <div
                      className={cn(
                        'relative aspect-[1.15/1] overflow-hidden rounded-2xl [transform:translateZ(40px)] md:rounded-3xl',
                        accentStyles[app.accent].glow,
                      )}
                    >
                      <img
                        src={app.logo}
                        alt={`${app.name} logo`}
                        width={1000}
                        height={868}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 [transform:translateZ(20px)] md:mt-6 md:px-1">
                      <p className={cn('text-[11px] font-bold uppercase tracking-[0.14em] md:text-xs md:tracking-[0.18em]', accentStyles[app.accent].text)}>{app.audience}</p>
                      <h3 className="mt-1 font-display text-xl font-semibold text-ink md:mt-2 md:text-3xl">{app.name}</h3>
                    </div>
                    <p className="col-span-2 text-sm leading-relaxed text-muted [transform:translateZ(20px)] md:col-auto md:mt-3 md:px-1 md:text-[15px]">
                      {app.description}
                    </p>
                    <div className="col-span-2 flex flex-wrap gap-2.5 [transform:translateZ(20px)] md:col-auto md:mt-auto md:px-1 md:pt-7">
                      {!live && (
                        <span className="inline-flex h-8 items-center rounded-full bg-ink/[0.07] px-3.5 text-xs font-bold uppercase tracking-wide text-ink/70 md:hidden">
                          {a.comingSoon}
                        </span>
                      )}
                      <div className={cn('flex-wrap gap-2.5', live ? 'flex' : 'hidden md:flex')}>
                        <StoreButton label={a.apple} href={app.stores.ios} />
                        <StoreButton label={a.google} href={app.stores.android} />
                      </div>
                    </div>
                  </article>
                </TiltCard3D>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
