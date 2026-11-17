import { useRef } from 'react'
import { Check } from 'lucide-react'
import { home } from '@/data/home'
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
    <section ref={ref} id="why" data-theme="ink" aria-labelledby="why-title" className="scroll-mt-20 py-24 text-white sm:py-32">
      <div className="container-x">
        <div id="why-title">
          <SectionHeading eyebrow={w.eyebrow} title={w.title} subtitle={w.subtitle} tone="dark" />
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-5">
          <ul data-pillars className="grid gap-5 sm:grid-cols-2 lg:col-span-3">
            {w.pillars.map((p) => (
              <li
                key={p.title}
                data-pillar
                className="rounded-[28px] border border-white/10 bg-white/[0.05] p-7 backdrop-blur-sm transition-colors duration-500 hover:bg-white/[0.09]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sun text-ink">
                  <Icon name={p.icon} size={24} />
                </span>
                <h3 className="mt-5 font-sans text-xl font-bold tracking-normal text-white">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/70">{p.text}</p>
              </li>
            ))}
          </ul>

          {/* How the fee works */}
          <div className="flex flex-col justify-between rounded-[32px] bg-gradient-to-br from-royal to-royal-deep p-8 shadow-[0_40px_80px_-30px_rgba(47,95,224,0.6)] sm:p-10 lg:col-span-2">
            <div>
              <h3 className="font-display text-3xl font-semibold text-white sm:text-4xl">{w.feeBox.title}</h3>
              <ul className="mt-7 space-y-4">
                {w.feeBox.lines.map((line) => (
                  <li key={line} className="flex gap-3 text-[16px] leading-relaxed text-white/90">
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-royal">
                      <Check size={14} strokeWidth={3} aria-hidden="true" />
                    </span>
                    {line}
                  </li>
                ))}
              </ul>
            </div>
            <Icon name="coins" size={120} strokeWidth={1} className="mt-10 self-end text-white/15" />
          </div>
        </div>

        {/* Stats counters */}
        <dl className="mt-16 grid grid-cols-2 gap-y-10 border-t border-white/10 pt-12 lg:grid-cols-4">
          {home.stats.items.map((s) => (
            <div key={s.label} className="flex flex-col-reverse justify-end">
              <dt className="mt-3 text-sm font-semibold uppercase tracking-[0.14em] text-white/60">{s.label}</dt>
              <dd
                data-count={s.value}
                data-suffix={s.suffix}
                className="font-display text-6xl font-semibold leading-none text-white sm:text-7xl"
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
