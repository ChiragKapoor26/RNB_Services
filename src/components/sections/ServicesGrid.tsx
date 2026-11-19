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
    <section id="services" data-theme="paper" aria-labelledby="services-title" className="scroll-mt-20 py-12 md:py-32">
      <div className="container-x">
        <div id="services-title">
          <SectionHeading eyebrow={s.eyebrow} title={s.title} subtitle={s.subtitle} />
        </div>
        {/* two columns on phones (a compact "launcher"), then 2 / 3 / 4 columns as space allows */}
        <ul className="mt-6 grid grid-cols-2 gap-3 md:mt-14 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service, i) => (
            <li key={service.slug}>
              <ServiceCard service={service} index={i} />
            </li>
          ))}
          {/* 12th tile keeps the grid even and nudges people to ask for help */}
          <li>
            <TiltCard3D index={services.length} maxTilt={8} radiusClass="rounded-[22px] md:rounded-[28px]">
              <div className="flex h-full flex-col justify-between rounded-[22px] bg-ink p-4 text-white shadow-[0_24px_48px_-24px_rgba(11,15,26,0.5)] md:min-h-[320px] md:rounded-[28px] md:p-8">
                <div>
                  <h3 className="font-display text-xl font-semibold leading-tight md:text-3xl">{home.cta.title}</h3>
                  <p className="mt-3 hidden text-[15px] leading-relaxed text-white/70 md:block">{home.cta.text}</p>
                </div>
                <div className="mt-4 flex flex-wrap gap-3 md:mt-8">
                  <Button variant="sun" size="sm" onClick={openChat} className="max-md:w-full">
                    <MessageCircle size={16} aria-hidden="true" />
                    {home.cta.secondary}
                  </Button>
                  <div className="hidden md:block">
                    <Button variant="outlineLight" size="sm" to="/contact">
                      {home.cta.primary}
                    </Button>
                  </div>
                </div>
              </div>
            </TiltCard3D>
          </li>
        </ul>
      </div>
    </section>
  )
}
