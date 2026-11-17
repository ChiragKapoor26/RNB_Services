import { z } from 'zod'
import { CHAT_MAX_CHARS, CHAT_MAX_MESSAGES } from './constants'

/** Request body for POST /api/chat (history is kept in browser memory only). */
export const chatRequestSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(['user', 'assistant']),
        // assistant turns can be longer than the user's character limit
        content: z.string().trim().min(1).max(4000),
      }),
    )
    .min(1)
    .max(CHAT_MAX_MESSAGES)
    .superRefine((messages, ctx) => {
      messages.forEach((m, i) => {
        if (m.role === 'user' && m.content.length > CHAT_MAX_CHARS) {
          ctx.addIssue({
            code: 'custom',
            path: [i, 'content'],
            message: `Messages are limited to ${CHAT_MAX_CHARS} characters`,
          })
        }
      })
      if (messages[messages.length - 1]?.role !== 'user') {
        ctx.addIssue({ code: 'custom', message: 'The last message must be from the user' })
      }
    }),
})

export type ChatRequest = z.infer<typeof chatRequestSchema>
export type ChatMessage = ChatRequest['messages'][number]
