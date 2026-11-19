import { m } from 'framer-motion'
import { about } from '@/data/legal'
import { home } from '@/data/home'
import { Seo } from '@/components/layout/Seo'
import { Button } from '@/components/ui/Button'

export default function About() {
  return (
    <>
      <Seo title="About" description={about.description} path="/about" />
      <section className="relative isolate overflow-x-clip pb-8 pt-28 sm:pt-44 md:pb-12" aria-labelledby="about-title">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -right-32 -top-24 h-[480px] w-[480px] rounded-full bg-sun/25 blur-3xl" />
          <div className="absolute -left-40 top-1/3 h-[420px] w-[420px] rounded-full bg-royal/10 blur-3xl" />
        </div>
        <div className="container-x">
          <m.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl"
          >
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-royal">About</p>
            <h1 id="about-title" className="text-balance text-4xl font-semibold text-ink sm:text-6xl lg:text-7xl">
              {about.lead}
            </h1>
          </m.div>
        </div>
      </section>

      <section className="pb-12 md:pb-20 lg:pb-28" aria-label="Our story">
        <div className="container-x grid gap-4 md:gap-12 lg:grid-cols-3">
          {about.sections.map((s, i) => (
            <m.article
              key={s.heading}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -60px 0px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-[24px] bg-white p-5 ring-1 ring-ink/[0.07] shadow-[0_24px_48px_-28px_rgba(11,15,26,0.3)] md:rounded-[28px] md:p-8"
            >
              <h2 className="font-display text-2xl font-semibold text-ink md:text-3xl">{s.heading}</h2>
              <div className="mt-4 space-y-4 text-[16px] leading-relaxed text-muted">
                {s.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </m.article>
          ))}
        </div>
      </section>

      <section className="bg-royal-deep py-14 text-white md:py-24" aria-labelledby="about-cta">
        <div className="on-dark container-x text-center">
          <h2 id="about-cta" className="mx-auto max-w-2xl text-balance text-3xl font-semibold text-white sm:text-5xl">
            {home.cta.title}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-white/80 md:mt-5 md:text-lg">{home.cta.text}</p>
          <div className="mt-6 flex justify-center md:mt-8">
            <Button to="/contact" variant="sun" size="lg" className="w-full sm:w-auto">{home.cta.primary}</Button>
          </div>
        </div>
      </section>
    </>
  )
}
