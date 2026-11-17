import { MessageCircle } from 'lucide-react'
import { home } from '@/data/home'
import { useChatUi } from '@/context/chatContext'
import { useCountry } from '@/context/countryContext'
import { enquiryHref } from '@/lib/format'
import { Button } from '@/components/ui/Button'

export function CtaSection() {
  const { openChat } = useChatUi()
  const { country } = useCountry()
  const c = home.cta
  return (
    <section data-theme="royal" aria-labelledby="cta-title" className="relative overflow-hidden py-28 text-white sm:py-36">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 -top-24 h-[420px] w-[420px] rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-32 right-0 h-[480px] w-[480px] rounded-full bg-royal/50 blur-3xl" />
      </div>
      <div className="container-x relative text-center">
        <h2 id="cta-title" className="mx-auto max-w-3xl text-balance text-5xl font-semibold text-white sm:text-6xl lg:text-7xl">
          {c.title}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-white sm:text-xl">{c.text}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button to={enquiryHref({ country })} variant="sun" size="lg">
            {c.primary}
          </Button>
          <Button variant="outlineLight" size="lg" onClick={openChat}>
            <MessageCircle size={18} aria-hidden="true" />
            {c.secondary}
          </Button>
        </div>
      </div>
    </section>
  )
}
