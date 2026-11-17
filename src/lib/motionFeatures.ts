import { domAnimation } from 'framer-motion'

/**
 * Framer Motion's animation + gesture + in-view features, loaded lazily by <LazyMotion> in App.tsx
 * so they stay out of the entry bundle. (Components use the lightweight `m` instead of `motion`.)
 */
export default domAnimation
