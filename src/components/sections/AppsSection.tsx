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

export function AppsSection() {
  const a = home.apps
  return (
    <section id="apps" data-theme="paper" aria-labelledby="apps-title" className="scroll-mt-20 py-24 sm:py-32">
      <div className="container-x">
        <div id="apps-title">
          <SectionHeading eyebrow={a.eyebrow} title={a.title} subtitle={a.subtitle} />
        </div>
        <ul className="mt-14 grid gap-7 lg:grid-cols-3">
          {apps.map((app, i) => (
            <li key={app.id}>
              <TiltCard3D index={i}>
                <article
                  className={cn(
                    'flex h-full flex-col rounded-[32px] bg-white p-5 ring-1 ring-ink/[0.07] [transform-style:preserve-3d]',
                    'shadow-[0_2px_4px_rgba(11,15,26,0.04),0_30px_60px_-28px_rgba(11,15,26,0.3)]',
                  )}
                >
                  <div
                    className={cn(
                      'relative aspect-[1.15/1] overflow-hidden rounded-3xl [transform:translateZ(40px)]',
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
                  <div className="mt-6 flex flex-1 flex-col px-1 [transform:translateZ(20px)]">
                    <p className={cn('text-xs font-bold uppercase tracking-[0.18em]', accentStyles[app.accent].text)}>{app.audience}</p>
                    <h3 className="mt-2 font-display text-3xl font-semibold text-ink">{app.name}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-muted">{app.description}</p>
                    <div className="mt-auto flex flex-wrap gap-2.5 pt-7">
                      <StoreButton label={a.apple} href={app.stores.ios} />
                      <StoreButton label={a.google} href={app.stores.android} />
                    </div>
                  </div>
                </article>
              </TiltCard3D>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
