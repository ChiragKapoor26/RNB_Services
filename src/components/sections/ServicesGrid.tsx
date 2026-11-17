import { MessageCircle } from 'lucide-react'
import { home } from '@/data/home'
import { services } from '@/data/services'
import { useChatUi } from '@/context/chatContext'
import { ServiceCard } from '@/components/cards/ServiceCard'
import { TiltCard3D } from '@/components/cards/TiltCard3D'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'

export function ServicesGrid() {
  const { openChat } = useChatUi()
  const s = home.services
  return (
    <section id="services" data-theme="paper" aria-labelledby="services-title" className="scroll-mt-20 py-24 sm:py-32">
      <div className="container-x">
        <div id="services-title">
          <SectionHeading eyebrow={s.eyebrow} title={s.title} subtitle={s.subtitle} />
        </div>
        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service, i) => (
            <li key={service.slug}>
              <ServiceCard service={service} index={i} />
            </li>
          ))}
          {/* 12th tile keeps the grid even and nudges people to ask for help */}
          <li>
            <TiltCard3D index={services.length} maxTilt={8}>
              <div className="flex h-full min-h-[320px] flex-col justify-between rounded-[28px] bg-ink p-8 text-white shadow-[0_24px_48px_-24px_rgba(11,15,26,0.5)]">
                <div>
                  <h3 className="font-display text-3xl font-semibold leading-tight">{home.cta.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-white/70">{home.cta.text}</p>
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button variant="sun" size="sm" onClick={openChat}>
                    <MessageCircle size={16} aria-hidden="true" />
                    {home.cta.secondary}
                  </Button>
                  <Button variant="outlineLight" size="sm" to="/contact">
                    {home.cta.primary}
                  </Button>
                </div>
              </div>
            </TiltCard3D>
          </li>
        </ul>
      </div>
    </section>
  )
}
