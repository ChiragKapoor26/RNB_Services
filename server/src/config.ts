import path from 'node:path'

/**
 * Loads server/.env (if present) and exposes typed, validated settings.
 * Real environment variables (e.g. set in Render / Railway) always win over the file.
 * Secrets are read here ONCE and never logged or sent to the browser.
 */
const envFile = path.resolve(import.meta.dirname, '..', '.env')
try {
  process.loadEnvFile(envFile)
} catch {
  // no server/.env - rely on real environment variables
}

const str = (name: string, fallback = ''): string => (process.env[name] ?? fallback).trim()
const bool = (name: string, fallback = false): boolean => {
  const v = str(name).toLowerCase()
  return v ? ['1', 'true', 'yes', 'on'].includes(v) : fallback
}
const int = (name: string, fallback: number): number => {
  const n = Number.parseInt(str(name), 10)
  return Number.isFinite(n) ? n : fallback
}

export const config = {
  isProd: process.env.NODE_ENV === 'production',
  port: int('PORT', 5174),
  allowedOrigins: str('ALLOWED_ORIGINS', 'http://localhost:5173,http://localhost:4173')
    .split(',')
    .map((o) => o.trim().replace(/\/$/, ''))
    .filter(Boolean),
  serveStatic: bool('SERVE_STATIC'),
  trustProxy: int('TRUST_PROXY', 1),

  deepseek: {
    apiKey: str('DEEPSEEK_API_KEY'),
    model: str('DEEPSEEK_MODEL', 'deepseek-chat'),
    baseUrl: str('DEEPSEEK_BASE_URL', 'https://api.deepseek.com').replace(/\/$/, ''),
  },

  smtp: {
    host: str('SMTP_HOST'),
    port: int('SMTP_PORT', 587),
    secure: bool('SMTP_SECURE'),
    user: str('SMTP_USER'),
    pass: str('SMTP_PASS'),
    from: str('MAIL_FROM') || str('SMTP_USER'),
  },
  clientEmail: str('CLIENT_EMAIL'),
  dryRun: bool('EMAIL_DRY_RUN'),
  whatsapp: str('WHATSAPP_NUMBER').replace(/\D/g, ''),
}

export const emailConfigured = Boolean(config.smtp.host && config.smtp.user && config.smtp.pass && config.clientEmail)
export const botConfigured = Boolean(config.deepseek.apiKey)
