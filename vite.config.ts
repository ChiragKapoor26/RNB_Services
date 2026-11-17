import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

const API_PORT = process.env.API_PORT ?? '5174'

/**
 * Preload the two critical (latin) variable fonts straight from index.html. The page is rendered by
 * JavaScript, so without this the fonts are only requested after the JS runs - causing a late
 * font swap (layout shift) on first load.
 */
function preloadFonts(): Plugin {
  return {
    name: 'rnb-preload-fonts',
    transformIndexHtml: {
      order: 'post',
      handler(_html, ctx) {
        if (!ctx.bundle) return // dev server
        return Object.keys(ctx.bundle)
          .filter((f) => /(playfair-display|plus-jakarta-sans)-latin-wght-normal-[^/]+.woff2$/.test(f))
          .map((f) => ({
            tag: 'link',
            attrs: { rel: 'preload', as: 'font', type: 'font/woff2', crossorigin: '', href: `/${f}` },
            injectTo: 'head' as const,
          }))
      },
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), preloadFonts()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
      '@shared': path.resolve(import.meta.dirname, 'shared'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      // In dev the Express API runs separately (see server/src/index.ts)
      '/api': {
        target: `http://localhost:${API_PORT}`,
        changeOrigin: true,
      },
    },
  },
  preview: {
    port: 4173,
    proxy: {
      '/api': { target: `http://localhost:${API_PORT}`, changeOrigin: true },
    },
  },
})
