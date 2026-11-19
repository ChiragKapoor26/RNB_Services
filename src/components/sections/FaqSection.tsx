import { useId, useState } from 'react'
import { Plus } from 'lucide-react'
import { faqs } from '@/data/faq'
import { home } from '@/data/home'
import { cn } from '@/lib/cn'
import { SectionHeading } from '@/components/ui/SectionHeading'

export function FaqSection() {
  // Desktop opens the first answer; phones start fully collapsed so the list reads as a short, scannable index
  const [open, setOpen] = useState<number | null>(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches ? null : 0,
  )
  const base = useId()
  const f = home.faq

  return (
    <section id="faq" data-theme="paper" aria-labelledby="faq-title" className="scroll-mt-20 py-12 md:py-32">
      <div className="container-x grid gap-5 md:gap-12 lg:grid-cols-5 lg:gap-20">
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
                  <h3 className="font-sans text-base tracking-normal md:text-lg">
                    <button
                      id={btnId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-4 py-4 text-left font-semibold text-ink md:gap-6 md:py-6"
                    >
                      {item.q}
                      <span
                        aria-hidden="true"
                        className={cn(
                          'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink/15 transition-all duration-300 md:h-9 md:w-9',
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
                      <p className="pb-4 pr-8 text-[15px] leading-relaxed text-muted md:pb-6 md:pr-12 md:text-[16px]">{item.a}</p>
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
