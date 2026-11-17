import { useId, useState } from 'react'
import { Plus } from 'lucide-react'
import { faqs } from '@/data/faq'
import { home } from '@/data/home'
import { cn } from '@/lib/cn'
import { SectionHeading } from '@/components/ui/SectionHeading'

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0)
  const base = useId()
  const f = home.faq

  return (
    <section id="faq" data-theme="paper" aria-labelledby="faq-title" className="scroll-mt-20 py-24 sm:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-5 lg:gap-20">
        <div id="faq-title" className="lg:col-span-2">
          <SectionHeading eyebrow={f.eyebrow} title={f.title} />
        </div>
        <div className="lg:col-span-3">
          <ul className="divide-y divide-ink/10 border-y border-ink/10">
            {faqs.map((item, i) => {
              const isOpen = open === i
              const panelId = `${base}-panel-${i}`
              const btnId = `${base}-btn-${i}`
              return (
                <li key={item.q}>
                  <h3 className="font-sans text-lg tracking-normal">
                    <button
                      id={btnId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-6 py-6 text-left font-semibold text-ink"
                    >
                      {item.q}
                      <span
                        aria-hidden="true"
                        className={cn(
                          'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink/15 transition-all duration-300',
                          isOpen && 'rotate-45 border-royal bg-royal text-white',
                        )}
                      >
                        <Plus size={18} />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={btnId}
                    className={cn(
                      'grid transition-[grid-template-rows] duration-500 ease-[var(--ease-apple)]',
                      isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-6 pr-12 text-[16px] leading-relaxed text-muted">{item.a}</p>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
