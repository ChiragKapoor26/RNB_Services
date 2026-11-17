import { useRef, useState } from 'react'
import { home } from '@/data/home'
import { apps } from '@/data/apps'
import type { AppInfo } from '@/data/types'
import { accentStyles } from '@/lib/accent'
import { cn } from '@/lib/cn'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { SectionHeading } from '@/components/ui/SectionHeading'

function PhoneMock({ app }: { app: AppInfo }) {
  const accent = accentStyles[app.accent]
  return (
    <div className="relative h-[500px] w-[240px] rounded-[42px] bg-[#0b0d12] p-[9px] shadow-[0_50px_90px_-30px_rgba(0,0,0,0.8)] ring-1 ring-white/20">
      <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[34px] bg-white">
        <div className="absolute left-1/2 top-2.5 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-[#0b0d12]" aria-hidden="true" />
        {/* app splash = the real logo */}
        <div className="relative h-[46%] shrink-0 overflow-hidden bg-paper">
          <img src={app.logoSmall} alt={`${app.name} logo`} width={480} height={416} className="h-full w-full object-cover" loading="lazy" />
        </div>
        <div className="flex flex-1 flex-col px-4 pb-4 pt-4">
          <p className="font-display text-[17px] font-semibold leading-tight text-ink">{app.screenTitle}</p>
          <ul className="mt-3 space-y-2">
            {app.screenLines.map((line) => (
              <li key={line} className="flex items-center gap-2.5 rounded-xl bg-paper px-3 py-2 text-[12px] font-semibold text-ink">
                <span className={cn('h-2 w-2 rounded-full', accent.dot)} aria-hidden="true" />
                {line}
              </li>
            ))}
          </ul>
          <div className={cn('mt-auto rounded-full py-2 text-center text-[12px] font-bold', accent.solid)} aria-hidden="true">
            {app.name}
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Scroll-scrubbed phone showcase: the three app screens sit on a 3D ring that rotates as you scroll
 * (CSS 3D transforms driven by GSAP ScrollTrigger). Reduced motion gets a static row of phones.
 */
export function PhoneShowcase() {
  const ref = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)
  const last = useRef(0)
  const ph = home.phones

  useScrollAnimation(ref, ({ gsap, reduce, short, scope }) => {
    if (reduce) return
    const ring = scope.querySelector<HTMLElement>('[data-ring]')
    const pin = scope.querySelector<HTMLElement>('[data-pin]')
    if (!ring || !pin) return

    const steps = apps.length - 1
    gsap.fromTo(
      ring,
      { rotationY: 0 },
      {
        rotationY: -120 * steps,
        ease: 'none',
        scrollTrigger: {
          trigger: pin,
          start: 'top top',
          end: short ? '+=120%' : '+=240%',
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          onUpdate: (self) => {
            const i = Math.round(self.progress * steps)
            if (i !== last.current) {
              last.current = i
              setActive(i)
            }
          },
        },
      },
    )
  })

  return (
    <section ref={ref} id="app-showcase" data-theme="forest" aria-labelledby="phones-title" className="relative text-white">
      <div data-pin className="relative flex min-h-[100svh] items-center overflow-hidden py-20 md:py-0">
        <div className="container-x grid items-center gap-8 md:grid-cols-2 md:gap-12">
          <div className="relative z-10">
            <div id="phones-title">
              <SectionHeading eyebrow={ph.eyebrow} title={ph.title} subtitle={ph.subtitle} tone="dark" className="max-md:[&>p:last-child]:hidden" />
            </div>
            <div className="relative mt-6 min-h-[170px] md:mt-10 md:min-h-[190px] motion-reduce:min-h-0">
              {apps.map((a, i) => (
                <div
                  key={a.id}
                  className={cn(
                    'transition-[opacity,transform] duration-500 ease-[var(--ease-apple)]',
                    'motion-reduce:pointer-events-auto motion-reduce:static motion-reduce:mb-8 motion-reduce:translate-y-0 motion-reduce:opacity-100',
                    i === active ? 'relative opacity-100' : 'pointer-events-none absolute inset-x-0 top-0 translate-y-4 opacity-0',
                  )}
                >
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-sun">{a.audience}</p>
                  <h3 className="mt-2 font-display text-3xl font-semibold text-white sm:text-4xl">{a.name}</h3>
                  <p className="mt-3 max-w-md text-[15px] leading-relaxed text-white/75">{a.description}</p>
                </div>
              ))}
            </div>
            <ol className="mt-6 flex gap-2" aria-hidden="true">
              {apps.map((a, i) => (
                <li key={a.id} className={cn('h-1.5 rounded-full transition-all duration-500', i === active ? 'w-10 bg-sun' : 'w-4 bg-white/25')} />
              ))}
            </ol>
          </div>

          {/* 3D ring of phones */}
          <div className="relative flex h-[330px] items-center justify-center [perspective:1500px] motion-reduce:hidden md:h-[600px]" aria-hidden="true">
            <div
              data-ring
              className="relative h-[500px] w-[240px] [--r:165px] [transform-style:preserve-3d] md:[--r:340px]"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {apps.map((a, i) => (
                <div
                  key={a.id}
                  className="absolute inset-0 origin-center scale-[0.62] [backface-visibility:hidden] md:scale-100"
                  style={{ transform: `rotateY(${i * 120}deg) translateZ(var(--r))` }}
                >
                  <PhoneMock app={a} />
                </div>
              ))}
            </div>
          </div>

          {/* Static fallback for reduced motion */}
          <div className="hidden flex-wrap justify-center gap-6 motion-reduce:flex">
            {apps.map((a) => (
              <PhoneMock key={a.id} app={a} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
