import { useRef } from 'react'
import { home } from '@/data/home'
import type { IconName } from '@/data/types'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { Icon } from '@/components/ui/Icon'
import { SectionHeading } from '@/components/ui/SectionHeading'

const stepIcons: IconName[] = ['user', 'handshake', 'zap']

/**
 * Scroll-pinned "How it works". On desktop the section pins and the three steps advance as you
 * scroll (a stack of 3D cards flips forward). On mobile / reduced motion it is a plain list.
 */
export function HowItWorks() {
  const ref = useRef<HTMLElement>(null)
  const { how } = home

  useScrollAnimation(ref, ({ gsap, reduce, mobile, short, scope }) => {
    if (reduce || mobile || short) return
    const pin = scope.querySelector<HTMLElement>('[data-pin]')
    if (!pin) return
    const steps = gsap.utils.toArray<HTMLElement>('[data-step]', scope)
    const cards = gsap.utils.toArray<HTMLElement>('[data-card]', scope)
    const bar = scope.querySelector<HTMLElement>('[data-progress]')

    // initial stack state
    steps.forEach((s, i) => gsap.set(s, { opacity: i === 0 ? 1 : 0.28 }))
    cards.forEach((c, i) =>
      gsap.set(c, { y: i * 38, scale: 1 - i * 0.06, opacity: i === 0 ? 1 : 0.55 - (i - 1) * 0.2, zIndex: cards.length - i, rotateX: 0 }),
    )

    const tl = gsap.timeline({
      defaults: { ease: 'power2.inOut' },
      scrollTrigger: { trigger: pin, start: 'top top', end: '+=220%', pin: true, scrub: 0.7, anticipatePin: 1 },
    })
    if (bar) tl.fromTo(bar, { scaleY: 0 }, { scaleY: 1, ease: 'none', duration: cards.length - 1 }, 0)

    for (let i = 0; i < cards.length - 1; i++) {
      const at = i
      tl.to(cards[i], { y: -140, rotateX: 18, opacity: 0, scale: 1.04, duration: 1 }, at)
      tl.to(steps[i], { opacity: 0.28, duration: 0.6 }, at)
      tl.to(steps[i + 1], { opacity: 1, duration: 0.6 }, at + 0.4)
      for (let j = i + 1; j < cards.length; j++) {
        const pos = j - i - 1
        tl.to(
          cards[j],
          { y: pos * 38, scale: 1 - pos * 0.06, opacity: pos === 0 ? 1 : 0.55 - (pos - 1) * 0.2, duration: 1 },
          at,
        )
      }
    }
  })

  return (
    <section ref={ref} id="how-it-works" data-theme="ink" aria-labelledby="how-title" className="relative text-white">
      {/* phones: content-height block (no forced full-screen section); desktop: full-height pinned stage */}
      <div data-pin className="relative flex items-center py-12 md:min-h-[100svh] md:py-0">
        <div className="container-x grid gap-8 md:grid-cols-2 md:items-center md:gap-10 lg:gap-24">
          <div>
            <div id="how-title">
              <SectionHeading eyebrow={how.eyebrow} title={how.title} tone="dark" />
            </div>
            <ol className="relative mt-7 space-y-5 md:mt-10 md:space-y-7">
              <span
                aria-hidden="true"
                className="absolute left-[19px] top-3 h-[calc(100%-1.5rem)] w-px bg-white/15"
              />
              <span
                data-progress
                aria-hidden="true"
                className="absolute left-[19px] top-3 hidden h-[calc(100%-1.5rem)] w-px origin-top bg-sun md:block"
                style={{ transform: 'scaleY(0)' }}
              />
              {how.steps.map((s, i) => (
                <li key={s.title} data-step className="relative flex gap-5">
                  <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sun text-sm font-bold text-ink">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-sans text-lg font-bold tracking-normal text-white md:text-xl">{s.title}</h3>
                    <p className="mt-1 max-w-md text-[15px] leading-relaxed text-white/70 md:mt-1.5">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* 3D card stack (desktop, motion-enabled only) */}
          <div
            aria-hidden="true"
            className="relative hidden h-[420px] [perspective:1200px] md:block motion-reduce:hidden"
          >
            {how.steps.map((s, i) => (
              <div
                key={s.title}
                data-card
                className="absolute inset-x-0 top-0 mx-auto flex h-[330px] max-w-md flex-col justify-between rounded-[32px] border border-white/15 bg-gradient-to-br from-white/[0.16] to-white/[0.04] p-8 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)] backdrop-blur-xl"
                style={{ transformOrigin: '50% 100%', zIndex: how.steps.length - i }}
              >
                <div className="flex items-start justify-between">
                  <span className="font-display text-[7rem] font-semibold leading-none text-white/90">{i + 1}</span>
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sun text-ink">
                    <Icon name={stepIcons[i]} size={28} />
                  </span>
                </div>
                <p className="font-display text-3xl font-medium leading-tight text-white">{s.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
