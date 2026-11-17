import { botConfigured, config, emailConfigured } from './config'
import { createApp } from './app'

const app = createApp()

app.listen(config.port, () => {
  const yes = (v: boolean) => (v ? 'configured' : 'NOT configured (add it to server/.env)')
  console.log(`\nR&B API listening on http://localhost:${config.port}`)
  console.log(`  email (SMTP) : ${config.dryRun ? 'DRY RUN - enquiries are logged, not sent' : yes(emailConfigured)}`)
  console.log(`  RNB Bot      : ${yes(botConfigured)}`)
  console.log(`  static site  : ${config.serveStatic ? 'serving dist/' : 'off (Vite serves the frontend)'}`)
  console.log(`  CORS origins : ${config.allowedOrigins.join(', ') || '(none)'}\n`)
})
