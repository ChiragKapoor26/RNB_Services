import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, m } from 'framer-motion'
import { RotateCcw, Send, UserRound, X } from 'lucide-react'
import { company } from '@/data/company'
import { chatCopy } from '@/data/chat'
import { useChatUi } from '@/context/chatContext'
import { cn } from '@/lib/cn'
import { useChat } from './useChat'

/**
 * Floating RNB Bot: a branded launcher + chat panel. Replies stream in from POST /api/chat
 * (the DeepSeek key lives only on the server).
 */
export default function ChatWidget() {
  const { open, toggleChat, closeChat } = useChatUi()
  const { messages, pending, send, retry } = useChat()
  const navigate = useNavigate()
  const [draft, setDraft] = useState('')
  const listRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const launcherRef = useRef<HTMLButtonElement>(null)
  const wasOpen = useRef(false)

  // keep the newest message in view
  useEffect(() => {
    const el = listRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, pending, open])

  // focus handling: input on open, launcher on close
  useEffect(() => {
    if (open) {
      const id = window.setTimeout(() => inputRef.current?.focus(), 250)
      wasOpen.current = true
      return () => window.clearTimeout(id)
    }
    if (wasOpen.current) {
      launcherRef.current?.focus()
      wasOpen.current = false
    }
  }, [open])

  const submit = (e?: FormEvent) => {
    e?.preventDefault()
    if (!draft.trim() || pending) return
    send(draft)
    setDraft('')
  }
  const onKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submit()
    }
    if (e.key === 'Escape') closeChat()
  }

  const talkToHuman = () => {
    const wa = company.contact.whatsapp.replace(/\D/g, '')
    if (wa) {
      window.open(`https://wa.me/${wa}?text=${encodeURIComponent(chatCopy.humanWhatsAppText)}`, '_blank', 'noopener,noreferrer')
    } else {
      closeChat()
      navigate('/contact?service=general')
    }
  }

  const lastMsg = messages[messages.length - 1]
  const showTyping = pending && lastMsg?.role === 'assistant' && !lastMsg.content
  const left = chatCopy.maxChars - draft.length

  return (
    <>
      <AnimatePresence>
        {open && (
          <m.section
            role="dialog"
            aria-label={chatCopy.panelLabel}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: 'bottom right' }}
            className="fixed inset-x-3 bottom-24 z-[65] flex h-[min(620px,calc(100svh-7.5rem))] flex-col overflow-hidden rounded-[28px] bg-white shadow-[0_40px_90px_-20px_rgba(11,15,26,0.5)] ring-1 ring-ink/10 sm:inset-x-auto sm:right-6 sm:w-[400px]"
          >
            {/* header */}
            <header className="flex items-center gap-3 bg-ink px-5 py-4 text-white">
              <img src="/brand/rnb-main.webp" alt="" width={44} height={44} className="h-11 w-11 rounded-full bg-white p-[2px]" />
              <div className="min-w-0 flex-1">
                <h2 className="font-sans text-base font-bold leading-tight tracking-normal text-white">{chatCopy.name}</h2>
                <p className="flex items-center gap-1.5 text-xs text-white/65">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3ec26b]" aria-hidden="true" />
                  {chatCopy.status}
                </p>
              </div>
              <button
                type="button"
                onClick={closeChat}
                aria-label={chatCopy.closeLabel}
                className="rounded-full p-2 text-white/70 hover:bg-white/10 hover:text-white"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </header>

            {/* messages */}
            <div
              ref={listRef}
              data-lenis-prevent
              role="log"
              aria-live="polite"
              aria-relevant="additions text"
              className="flex-1 space-y-3 overflow-y-auto overscroll-contain bg-paper px-4 py-5"
            >
              <Bubble role="assistant">{chatCopy.greeting}</Bubble>

              {messages.length === 0 && (
                <ul className="flex flex-wrap gap-2 pt-1" aria-label="Suggested questions">
                  {chatCopy.chips.map((c) => (
                    <li key={c}>
                      <button
                        type="button"
                        onClick={() => send(c)}
                        className="rounded-full border border-royal/25 bg-white px-3.5 py-2 text-left text-[13px] font-semibold text-royal transition-colors hover:bg-royal hover:text-white"
                      >
                        {c}
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {messages.map((m) =>
                m.role === 'assistant' && !m.content ? null : (
                  <Bubble key={m.id} role={m.role} error={m.error}>
                    {m.content}
                    {m.error && !pending && m.id === lastMsg?.id && (
                      <span className="mt-3 flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={retry}
                          className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1.5 text-xs font-semibold text-white hover:bg-royal"
                        >
                          <RotateCcw size={13} aria-hidden="true" />
                          {chatCopy.retry}
                        </button>
                        <button
                          type="button"
                          onClick={talkToHuman}
                          className="inline-flex items-center gap-1.5 rounded-full border border-ink/20 px-3 py-1.5 text-xs font-semibold text-ink hover:bg-ink hover:text-white"
                        >
                          <UserRound size={13} aria-hidden="true" />
                          {chatCopy.human}
                        </button>
                      </span>
                    )}
                  </Bubble>
                ),
              )}

              {showTyping && (
                <div className="flex w-fit items-center gap-1.5 rounded-2xl rounded-bl-md bg-white px-4 py-3.5 shadow-sm" role="status">
                  <span className="sr-only">{chatCopy.typing}</span>
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      aria-hidden="true"
                      className="h-2 w-2 animate-dot rounded-full bg-royal"
                      style={{ animationDelay: `${i * 0.16}s` }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* composer */}
            <div className="border-t border-ink/10 bg-white px-4 pb-3 pt-3">
              <form onSubmit={submit} className="flex items-end gap-2">
                <div className="relative flex-1">
                  <label htmlFor="rnb-chat-input" className="sr-only">
                    {chatCopy.placeholder}
                  </label>
                  <textarea
                    id="rnb-chat-input"
                    ref={inputRef}
                    rows={1}
                    value={draft}
                    maxLength={chatCopy.maxChars}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={onKey}
                    placeholder={chatCopy.placeholder}
                    className="block max-h-28 min-h-[46px] w-full resize-none rounded-2xl border border-ink/15 bg-paper px-4 py-3 text-[15px] text-ink placeholder:text-ink/40 focus:border-royal focus:outline-none focus:ring-4 focus:ring-royal/15"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!draft.trim() || pending}
                  aria-label={chatCopy.send}
                  className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full bg-royal text-white transition-colors hover:bg-royal-deep disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Send size={18} aria-hidden="true" />
                </button>
              </form>
              <div className="mt-2 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={talkToHuman}
                  className="inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-semibold text-royal hover:bg-royal-soft"
                >
                  <UserRound size={14} aria-hidden="true" />
                  {chatCopy.human}
                </button>
                <p className={cn('text-[11px]', left < 60 ? 'font-semibold text-taxi-deep' : 'text-muted')} aria-live="off">
                  {left} {chatCopy.charsLeft}
                </p>
              </div>
              <p className="mt-1.5 text-[10.5px] leading-snug text-muted">{chatCopy.disclaimer}</p>
            </div>
          </m.section>
        )}
      </AnimatePresence>

      {/* launcher */}
      <button
        ref={launcherRef}
        type="button"
        onClick={toggleChat}
        aria-label={open ? chatCopy.closeLabel : chatCopy.openLabel}
        aria-expanded={open}
        className="group fixed bottom-5 right-5 z-[66] flex items-center gap-3 rounded-full bg-white p-1.5 pr-1.5 shadow-[0_20px_50px_-12px_rgba(11,15,26,0.45)] ring-1 ring-ink/10 transition-transform duration-300 hover:scale-105 active:scale-95 sm:right-6"
      >
        <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white">
          {!open && <span aria-hidden="true" className="absolute inset-0 animate-pulse-ring rounded-full" />}
          <img src="/brand/rnb-main.webp" alt="" width={56} height={56} className="relative h-14 w-14 rounded-full bg-white p-[3px]" />
        </span>
        <span className="hidden pr-4 text-sm font-semibold text-ink md:block">{open ? chatCopy.closeLabel : chatCopy.name}</span>
      </button>
    </>
  )
}

function Bubble({ role, error, children }: { role: 'user' | 'assistant'; error?: boolean; children: ReactNode }) {
  const mine = role === 'user'
  return (
    <div className={cn('flex', mine ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'max-w-[86%] whitespace-pre-wrap break-words rounded-2xl px-4 py-3 text-[15px] leading-relaxed shadow-sm',
          mine ? 'rounded-br-md bg-royal text-white' : 'rounded-bl-md bg-white text-ink',
          error && 'ring-1 ring-taxi/50',
        )}
      >
        {children}
      </div>
    </div>
  )
}
