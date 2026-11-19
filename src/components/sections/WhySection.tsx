import { useRef } from 'react'
import { Check } from 'lucide-react'
import { home } from '@/data/home'
import { cn } from '@/lib/cn'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { Icon } from '@/components/ui/Icon'
import { SectionHeading } from '@/components/ui/SectionHeading'

export function WhySection() {
  const ref = useRef<HTMLElement>(null)
  const w = home.why

  // Number counters: tick up once when scrolled into view. Final values are in the markup,
  // so reduced-motion / no-JS visitors just see the numbers.
  useScrollAnimation(ref, ({ gsap, ScrollTrigger, reduce, scope }) => {
    if (reduce) return
    const nodes = gsap.utils.toArray<HTMLElement>('[data-count]', scope)
    nodes.forEach((node) => {
      const end = Number(node.dataset.count)
      const suffix = node.dataset.suffix ?? ''
      const state = { v: 0 }
      node.textContent = `0${suffix}`
      ScrollTrigger.create({
        trigger: node,
        start: 'top 90%',
        once: true,
        onEnter: () =>
          gsap.to(state, {
            v: end,
            duration: 1.6,
            ease: 'power2.out',
            onUpdate: () => {
              node.textContent = `${Math.round(state.v)}${suffix}`
            },
          }),
      })
    })
    gsap.from(gsap.utils.toArray('[data-pillar]', scope), {
      y: 40,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.1,
      scrollTrigger: { trigger: '[data-pillars]', start: 'top 80%', once: true },
    })
    return () => {
      nodes.forEach((n) => {
        n.textContent = `${n.dataset.count}${n.dataset.suffix ?? ''}`
      })
    }
  })

  return (
    <section ref={ref} id="why" data-theme="ink" aria-labelledby="why-title" className="scroll-mt-20 py-12 text-white md:py-32">
      <div className="container-x">
        <div id="why-title">
          <SectionHeading eyebrow={w.eyebrow} title={w.title} subtitle={w.subtitle} tone="dark" />
        </div>

        <div className="mt-7 grid gap-3 md:mt-14 md:gap-6 lg:grid-cols-5">
          <ul data-pillars className="grid gap-3 sm:grid-cols-2 md:gap-5 lg:col-span-3">
            {w.pillars.map((p) => (
              <li
                key={p.title}
                data-pillar
                className={cn(
                  'gap-4 rounded-[22px] border border-white/10 bg-white/[0.05] p-4 backdrop-blur-sm transition-colors duration-500 hover:bg-white/[0.09] md:rounded-[28px] md:p-7',
                  // phones: icon-left row (hidden entirely for desktop-only pillars); desktop: stacked card
                  p.desktopOnly ? 'hidden md:block' : 'flex md:block',
                )}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sun text-ink md:h-12 md:w-12 md:rounded-2xl">
                  <Icon name={p.icon} size={22} />
                </span>
                <div>
                  <h3 className="font-sans text-base font-bold tracking-normal text-white md:mt-5 md:text-xl">{p.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/70 md:mt-2 md:text-[15px]">{p.text}</p>
                </div>
              </li>
            ))}
          </ul>

          {/* How the fee works */}
          <div className="flex flex-col justify-between rounded-[24px] bg-gradient-to-br from-royal to-royal-deep p-5 shadow-[0_40px_80px_-30px_rgba(47,95,224,0.6)] md:rounded-[32px] md:p-10 lg:col-span-2">
            <div>
              <h3 className="font-display text-2xl font-semibold text-white md:text-4xl">{w.feeBox.title}</h3>
              <ul className="mt-4 space-y-3 md:mt-7 md:space-y-4">
                {w.feeBox.lines.map((line) => (
                  <li key={line} className="flex gap-3 text-[15px] leading-relaxed text-white/90 md:text-[16px]">
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-royal">
                      <Check size={14} strokeWidth={3} aria-hidden="true" />
                    </span>
                    {line}
                  </li>
                ))}
              </ul>
            </div>
            <Icon name="coins" size={120} strokeWidth={1} className="mt-10 hidden self-end text-white/15 md:block" />
          </div>
        </div>

        {/* Stats counters */}
        <dl className="mt-8 grid grid-cols-2 gap-y-6 border-t border-white/10 pt-8 md:mt-16 md:gap-y-10 md:pt-12 lg:grid-cols-4">
          {home.stats.items.map((s) => (
            <div key={s.label} className="flex flex-col-reverse justify-end">
              <dt className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/60 md:mt-3 md:text-sm">{s.label}</dt>
              <dd
                data-count={s.value}
                data-suffix={s.suffix}
                className="font-display text-4xl font-semibold leading-none text-white sm:text-6xl md:text-7xl"
              >
                {s.value}
                {s.suffix}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
