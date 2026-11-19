import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Send } from 'lucide-react'
import { ui } from '@/data/nav'
import { useChatUi } from '@/context/chatContext'
import { useCountry } from '@/context/countryContext'
import { cn } from '@/lib/cn'
import { enquiryHref } from '@/lib/format'

/**
 * Phones only (the header shows its own Enquire button from 640px up): a floating "Enquire" pill
 * that keeps the main action one tap away on the long Home page.
 *
 * Home only on purpose: service pages already put an Enquire button on every listing (a second,
 * floating one would just cover prices), Contact IS the enquiry form, and the other pages are short.
 * It also stays out of the way on Home: hidden over the hero (which has its own CTAs), while the
 * footer is in view and while the chat panel is open.
 */
export function MobileEnquireButton() {
  const { pathname } = useLocation()
  const { country } = useCountry()
  const { open: chatOpen } = useChatUi()
  const [pastHero, setPastHero] = useState(false)
  const [footerInView, setFooterInView] = useState(false)

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const footer = document.querySelector('footer')
    if (!footer) return
    const io = new IntersectionObserver(([entry]) => setFooterInView(entry.isIntersecting))
    io.observe(footer)
    return () => io.disconnect()
  }, [])

  const visible = pathname === '/' && pastHero && !footerInView && !chatOpen

  return (
    <Link
      to={enquiryHref({ country })}
      aria-hidden={!visible}
      tabIndex={visible ? undefined : -1}
      className={cn(
        // z-40 keeps it under the header + open mobile menu (z-50) and the chat panel (z-65)
        'fixed bottom-[1.875rem] left-5 z-40 inline-flex h-12 items-center gap-2 rounded-full bg-royal px-5 text-[15px] font-semibold text-white sm:hidden',
        'shadow-[0_16px_36px_-10px_rgba(47,95,224,0.75)] transition-[transform,opacity,background-color] duration-300 ease-[var(--ease-apple)] active:scale-95',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0',
      )}
    >
      <Send size={16} aria-hidden="true" />
      {ui.headerCta}
    </Link>
  )
}
