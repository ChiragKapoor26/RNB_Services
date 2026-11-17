import { createContext, useContext } from 'react'

export interface ChatCtx {
  open: boolean
  openChat: () => void
  closeChat: () => void
  toggleChat: () => void
}

export const ChatContext = createContext<ChatCtx | null>(null)

export function useChatUi(): ChatCtx {
  const ctx = useContext(ChatContext)
  if (!ctx) throw new Error('useChatUi must be used inside <ChatProvider>')
  return ctx
}
