import path from 'node:path'
import fs from 'node:fs'
import express, { type ErrorRequestHandler, type RequestHandler } from 'express'
import compression from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { botConfigured, config, emailConfigured } from './config'
import { enquiryRouter } from './routes/enquiry'
import { chatRouter } from './routes/chat'

export function createApp() {
  const app = express()
  app.disable('x-powered-by')
  // Behind Render / Railway / nginx the real client IP comes from X-Forwarded-For (needed for rate limits)
  app.set('trust proxy', config.trustProxy)

  // ---- security headers -------------------------------------------------
  // When this server also serves the built React app we need a CSP that allows Google Maps.
  // API-only deployments only return JSON, so helmet's strict defaults are fine.
  app.use(
    helmet(
      config.serveStatic
        ? {
            contentSecurityPolicy: {
              directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", 'https://maps.googleapis.com', 'https://maps.gstatic.com'],
                styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
                fontSrc: ["'self'", 'data:', 'https://fonts.gstatic.com'],
                imgSrc: ["'self'", 'data:', 'blob:', 'https://*.googleapis.com', 'https://*.gstatic.com', 'https://*.google.com', 'https://*.ggpht.com'],
                connectSrc: ["'self'", 'https://maps.googleapis.com', 'https://*.googleapis.com'],
                workerSrc: ["'self'", 'blob:'],
                frameSrc: ["'self'"],
                objectSrc: ["'none'"],
                baseUri: ["'self'"],
                frameAncestors: ["'self'"],
              },
            },
            crossOriginEmbedderPolicy: false,
          }
        : {},
    ),
  )

  // ---- CORS: only the origins listed in ALLOWED_ORIGINS -----------------
  app.use(
    cors({
      origin: (origin, cb) => cb(null, !origin || config.allowedOrigins.includes(origin.replace(/\/$/, ''))),
      methods: ['GET', 'POST', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Accept'],
      maxAge: 600,
    }),
  )

  // Reject cross-site POSTs from origins that are neither allowed nor this very host
  const originGuard: RequestHandler = (req, res, next) => {
    const origin = req.headers.origin
    if (origin && req.method === 'POST') {
      let sameHost = false
      try {
        sameHost = new URL(origin).host === req.headers.host
      } catch {
        /* malformed origin */
      }
      if (!sameHost && !config.allowedOrigins.includes(origin.replace(/\/$/, ''))) {
        res.status(403).json({ ok: false, error: 'origin_not_allowed' })
        return
      }
    }
    next()
  }

  // Small JSON bodies only
  app.use('/api', express.json({ limit: '20kb' }))

  // Global per-IP ceiling for the whole API (endpoints add their own, stricter limits)
  app.use(
    '/api',
    rateLimit({
      windowMs: 60 * 1000,
      limit: 120,
      standardHeaders: 'draft-7',
      legacyHeaders: false,
      handler: (_req, res) => {
        res.status(429).json({ ok: false, error: 'rate_limited' })
      },
    }),
  )
  app.use('/api', originGuard)

  // Minimal request log: method, path, status, time. Never bodies, never headers.
  app.use('/api', (req, res, next) => {
    const start = Date.now()
    res.on('finish', () => console.log(`[api] ${req.method} ${req.originalUrl.split('?')[0]} ${res.statusCode} ${Date.now() - start}ms`))
    next()
  })

  // ---- routes -------------------------------------------------------------
  app.get('/api/health', (_req, res) => {
    // booleans only - never leak configuration values
    res.json({ ok: true, uptime: Math.round(process.uptime()), email: emailConfigured || config.dryRun, bot: botConfigured })
  })
  app.use('/api', enquiryRouter)
  app.use('/api', chatRouter)
  app.use('/api', (_req, res) => {
    res.status(404).json({ ok: false, error: 'not_found' })
  })

  // ---- optionally serve the built React app (single-host deployment) ------
  if (config.serveStatic) {
    const dist = path.resolve(import.meta.dirname, '..', '..', 'dist')
    if (fs.existsSync(path.join(dist, 'index.html'))) {
      // gzip/deflate the site files. Mounted AFTER the /api routes on purpose: the chat endpoint
      // streams Server-Sent Events and must not be buffered by compression.
      app.use(compression())
      // hashed build assets never change -> cache for a year
      app.use(
        '/assets',
        express.static(path.join(dist, 'assets'), { immutable: true, maxAge: '1y', index: false, fallthrough: false }),
      )
      // logos / photos keep their file names, so use a long-but-finite cache
      app.use('/brand', express.static(path.join(dist, 'brand'), { maxAge: '30d', index: false }))
      app.use('/images', express.static(path.join(dist, 'images'), { maxAge: '30d', index: false }))
      app.use(express.static(dist, { maxAge: '1h', index: false }))
      // SPA fallback so deep links like /services/events don't 404
      app.use((req, res, next) => {
        if (req.method !== 'GET' && req.method !== 'HEAD') return next()
        res.setHeader('Cache-Control', 'no-cache')
        res.sendFile(path.join(dist, 'index.html'))
      })
    } else {
      console.warn('[server] SERVE_STATIC=true but dist/ was not found - run `npm run build` first')
    }
  }

  // ---- errors --------------------------------------------------------------
  const onError: ErrorRequestHandler = (err: Error & { type?: string; status?: number }, _req, res, next) => {
    if (res.headersSent) return next(err)
    if (err.type === 'entity.parse.failed' || err.type === 'entity.too.large') {
      res.status(err.status ?? 400).json({ ok: false, error: 'bad_request' })
      return
    }
    console.error('[server] unhandled error:', err.message)
    res.status(500).json({ ok: false, error: 'server_error' })
  }
  app.use(onError)

  return app
}
