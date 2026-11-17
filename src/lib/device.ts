interface NavigatorExtras extends Navigator {
  deviceMemory?: number
  connection?: { saveData?: boolean; effectiveType?: string }
}

/** Heuristic for devices where we should skip the 3D hero and show static art. */
export function isLowPowerDevice(): boolean {
  if (typeof navigator === 'undefined') return false
  const nav = navigator as NavigatorExtras
  if (nav.connection?.saveData) return true
  if (nav.connection?.effectiveType && /(^|-)2g$/.test(nav.connection.effectiveType)) return true
  if (typeof nav.deviceMemory === 'number' && nav.deviceMemory <= 2) return true
  if (typeof nav.hardwareConcurrency === 'number' && nav.hardwareConcurrency <= 2) return true
  return false
}

export function hasWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}
