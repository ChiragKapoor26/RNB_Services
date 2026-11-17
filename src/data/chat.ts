import { CHAT_MAX_CHARS } from '../../shared/constants'

/** Copy for the RNB Bot widget. */
export const chatCopy = {
  name: 'RNB Bot',
  status: 'Ask me about R&B services',
  openLabel: 'Chat with RNB Bot',
  closeLabel: 'Close chat',
  panelLabel: 'RNB Bot chat',
  greeting:
    "Hi, I'm RNB Bot! I can tell you about R&B services, how our small connection fee works, and where we operate in Ghana and Canada. What can I help you with?",
  chips: ['What services do you offer?', 'How much is your fee?', 'Which cities do you cover?'],
  placeholder: 'Type your question…',
  send: 'Send message',
  maxChars: CHAT_MAX_CHARS,
  charsLeft: 'characters left',
  human: 'Talk to a human',
  humanWhatsAppText: 'Hi R&B, I need help from your team.',
  typing: 'RNB Bot is typing',
  retry: 'Try again',
  disclaimer: 'RNB Bot is an AI assistant and can make mistakes. It does not give medical, legal or financial advice.',
  errors: {
    generic: "Sorry, I couldn't get a reply just now. Please try again, or talk to a human.",
    unavailable: "RNB Bot isn't available right now. You can send us an enquiry or talk to a human instead.",
    rateLimited: "You're sending messages quite quickly - please wait a moment and try again.",
    network: "I can't reach the server. Please check your connection and try again.",
  },
}
