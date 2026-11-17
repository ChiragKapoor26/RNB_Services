import { useRef } from 'react'
import { ArrowDown, MessageCircle } from 'lucide-react'
import { home } from '@/data/home'
import { useChatUi } from '@/context/chatContext'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { Button } from '@/components/ui/Button'
import { Hero3D } from '@/components/three/Hero3D'

/** staggered CSS entrance delay */
const rise = (i: number) => ({ animationDelay: `${i * 0.07}s` })

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { openChat } = useChatUi()
  const h = home.hero

  // The entrance is pure CSS (visible from first paint). GSAP only adds a gentle fade/parallax
  // as the hero scrolls away.
  useScrollAnimation(ref, ({ gsap, reduce, scope }) => {
    const q = gsap.utils.selector(scope)
    if (reduce) return
    gsap.to(q('[data-hero-copy]'), {
      yPercent: -14,
      opacity: 0.25,
      ease: 'none',
      scrollTrigger: { trigger: scope, start: 'top top', end: 'bottom top', scrub: true },
    })
  })

  return (
    <section
      ref={ref}
      id="top"
      data-theme="paper"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] items-start overflow-x-clip pb-[56svh] pt-28 wide:items-center wide:pb-24 wide:pt-24"
    >
      {/* soft brand-coloured glows behind the 3D scene */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 top-1/3 h-[540px] w-[540px] rounded-full bg-royal/10 blur-3xl" />
        <div className="absolute -right-32 -top-20 h-[460px] w-[460px] rounded-full bg-sun/25 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-[360px] w-[360px] rounded-full bg-taxi/10 blur-3xl" />
      </div>

      <Hero3D />

      <div className="container-x pointer-events-none relative z-10">
        <div data-hero-copy className="max-w-2xl">
          <p style={rise(0)} className="animate-rise mb-6 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-royal shadow-sm ring-1 ring-ink/5 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-forest" aria-hidden="true" />
            {h.eyebrow}
          </p>
          <h1
            id="hero-title"
            className="text-[clamp(2.3rem,5.2vw,4.1rem)] font-semibold leading-[1.04] tracking-[-0.02em] text-ink"
          >
            {h.titleParts.map((part, i) => (
              <span key={part.text}>
                <span
                  style={rise(1 + i)}
                  className={
                    part.emphasis
                      ? 'animate-rise block font-medium italic tracking-[-0.01em] text-royal'
                      : 'animate-rise block'
                  }
                >
                  {part.text}
                </span>{' '}
              </span>
            ))}
          </h1>
          <p style={rise(4)} className="animate-rise mt-7 max-w-xl text-lg leading-relaxed text-ink/70 sm:text-xl">
            {h.subtitle}
          </p>
          <div style={rise(5)} className="animate-rise pointer-events-auto mt-9 flex flex-wrap gap-3">
            <Button to={{ pathname: '/', hash: '#services' }} size="lg">
              {h.primaryCta}
            </Button>
            <Button variant="outline" size="lg" onClick={openChat}>
              <MessageCircle size={18} aria-hidden="true" />
              {h.secondaryCta}
            </Button>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink/45 sm:flex"
      >
        <ArrowDown size={14} className="animate-float" />
        {h.scrollHint}
      </div>
    </section>
  )
}
