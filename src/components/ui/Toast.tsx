import { AnimatePresence, m } from 'framer-motion'
import { CheckCircle2, CircleAlert, X } from 'lucide-react'
import { cn } from '@/lib/cn'

export interface ToastState {
  kind: 'success' | 'error'
  message: string
}

/** Accessible toast (role=status / alert). The parent owns the state + timer. */
export function Toast({ toast, onClose, closeLabel }: { toast: ToastState | null; onClose: () => void; closeLabel: string }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-24 z-[70] flex justify-center px-4 sm:bottom-8">
      <AnimatePresence>
        {toast && (
          <m.div
            key={toast.message}
            role={toast.kind === 'error' ? 'alert' : 'status'}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              'pointer-events-auto flex max-w-md items-start gap-3 rounded-2xl px-5 py-4 text-[15px] font-medium shadow-2xl',
              toast.kind === 'success' ? 'bg-forest text-white' : 'bg-ink text-white',
            )}
          >
            {toast.kind === 'success' ? (
              <CheckCircle2 size={20} className="mt-0.5 shrink-0" aria-hidden="true" />
            ) : (
              <CircleAlert size={20} className="mt-0.5 shrink-0 text-sun" aria-hidden="true" />
            )}
            <p className="leading-snug">{toast.message}</p>
            <button
              type="button"
              onClick={onClose}
              aria-label={closeLabel}
              className="-mr-1 ml-1 rounded-full p-1 text-white/70 hover:bg-white/15 hover:text-white"
            >
              <X size={16} aria-hidden="true" />
            </button>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
}
