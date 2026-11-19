/**
 * Brand intro: the ~3 second animated splash shown when the site first loads on Home.
 *
 * The words on screen are derived from company.ts (name, tagline, countries). The choreography
 * (timings, easing) lives in src/styles/index.css under ".intro-*"; the logic is in
 * src/components/layout/IntroSplash.tsx.
 */
export const intro = {
  /** Master switch. Set to false to remove the intro completely. */
  enabled: true,
  /**
   * true  = play once per browser tab/session (a refresh, or coming back to Home, goes straight to the site).
   * false = play on every full page load of Home.
   * Either way, adding ?intro to the address (e.g. rnbservices.online/?intro) replays it on demand.
   */
  oncePerSession: true,
  /** Longest we hold the start for the logos + fonts to arrive (ms). After this it plays regardless. */
  maxAssetWaitMs: 1200,
}
