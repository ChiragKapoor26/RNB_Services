/** Public (browser-visible) config. Secrets NEVER go here - they live in server/.env. */
export const googleMapsKey: string = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined)?.trim() ?? ''
export const hasGoogleMapsKey = googleMapsKey.length > 0
