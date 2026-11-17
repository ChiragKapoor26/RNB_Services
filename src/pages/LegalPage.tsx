import { TriangleAlert } from 'lucide-react'
import { privacy, terms } from '@/data/legal'
import { Seo } from '@/components/layout/Seo'

/** Privacy policy + Terms of use. Content is placeholder copy flagged for client/legal review. */
export default function LegalPage({ doc }: { doc: 'privacy' | 'terms' }) {
  const d = doc === 'privacy' ? privacy : terms
  return (
    <>
      <Seo title={d.title} description={d.description} path={`/${doc}`} />
      <article className="pb-24 pt-36 sm:pt-44" aria-labelledby="legal-title">
        <div className="container-x max-w-3xl">
          <h1 id="legal-title" className="text-5xl font-semibold text-ink sm:text-6xl">{d.title}</h1>
          <p className="mt-3 text-sm font-semibold text-muted">{d.updated}</p>

          <div role="note" className="mt-8 flex gap-3 rounded-2xl bg-sun-soft p-5 text-sun-deep">
            <TriangleAlert size={22} className="mt-0.5 shrink-0" aria-hidden="true" />
            <p className="text-[15px] font-medium leading-relaxed">{d.reviewNotice}</p>
          </div>

          <div className="mt-12 space-y-10">
            {d.sections.map((s) => (
              <section key={s.heading}>
                <h2 className="font-display text-3xl font-semibold text-ink">{s.heading}</h2>
                <div className="mt-4 space-y-4 text-[16px] leading-relaxed text-ink/80">
                  {s.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </article>
    </>
  )
}
