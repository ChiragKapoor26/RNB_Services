import { useRef } from 'react'
import { home } from '@/data/home'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

/** Big serif statement - each line is revealed (scrubbed) line by line as you scroll. */
export function Statement() {
  const ref = useRef<HTMLElement>(null)

  useScrollAnimation(ref, ({ gsap, reduce, scope }) => {
    if (reduce) return
    gsap.utils.toArray<HTMLElement>('[data-line]', scope).forEach((line) => {
      gsap.fromTo(
        line,
        { opacity: 0.12, y: 28 },
        {
          opacity: 1,
          y: 0,
          ease: 'none',
          scrollTrigger: { trigger: line, start: 'top 88%', end: 'top 50%', scrub: true },
        },
      )
    })
  })

  return (
    <section ref={ref} data-theme="paper" aria-label="What R&B is" className="py-24 sm:py-32 lg:py-44">
      <div className="container-x">
        <div className="mx-auto max-w-5xl space-y-3 sm:space-y-5">
          {home.statement.lines.map((line, i) => (
            <p
              key={line}
              data-line
              className={
                'text-balance font-display text-[clamp(2rem,5.6vw,4.6rem)] font-medium leading-[1.08] tracking-tight ' +
                (i === home.statement.lines.length - 1 ? 'text-royal' : 'text-ink')
              }
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
