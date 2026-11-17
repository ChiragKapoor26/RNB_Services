import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { ChatContext } from './chatContext'

export function ChatProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const openChat = useCallback(() => setOpen(true), [])
  const closeChat = useCallback(() => setOpen(false), [])
  const toggleChat = useCallback(() => setOpen((o) => !o), [])
  const value = useMemo(() => ({ open, openChat, closeChat, toggleChat }), [open, openChat, closeChat, toggleChat])
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}
