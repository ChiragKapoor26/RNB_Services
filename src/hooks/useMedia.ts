import { useSyncExternalStore } from 'react'

export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query)
      mq.addEventListener('change', onChange)
      return () => mq.removeEventListener('change', onChange)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}

export const usePrefersReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)')
/** True on devices with a real hover pointer (desktop). Tilt effects only run here. */
export const useCanHover = () => useMediaQuery('(hover: hover) and (pointer: fine)')
export const useIsMobile = () => useMediaQuery('(max-width: 767px)')
