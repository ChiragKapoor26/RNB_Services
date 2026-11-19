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
    <section data-theme="royal" aria-labelledby="cta-title" className="relative overflow-hidden py-14 text-white md:py-36">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 -top-24 h-[420px] w-[420px] rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-32 right-0 h-[480px] w-[480px] rounded-full bg-royal/50 blur-3xl" />
      </div>
      <div className="container-x relative text-center">
        <h2 id="cta-title" className="mx-auto max-w-3xl text-balance text-4xl font-semibold text-white sm:text-6xl lg:text-7xl">
          {c.title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-white md:mt-6 md:text-xl">{c.text}</p>
        {/* full-width, stacked buttons on phones = big, easy thumb targets */}
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center md:mt-10">
          <Button to={enquiryHref({ country })} variant="sun" size="lg" className="w-full sm:w-auto">
            {c.primary}
          </Button>
          <Button variant="outlineLight" size="lg" onClick={openChat} className="w-full sm:w-auto">
            <MessageCircle size={18} aria-hidden="true" />
            {c.secondary}
          </Button>
        </div>
      </div>
    </section>
  )
}
