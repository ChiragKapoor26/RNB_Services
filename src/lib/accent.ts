import type { Accent } from '@/data/types'

/**
 * Full class names are spelled out so Tailwind can detect them at build time.
 */
export const accentStyles: Record<
  Accent,
  { solid: string; soft: string; text: string; gradient: string; ring: string; dot: string; glow: string; hex: string }
> = {
  blue: {
    solid: 'bg-royal text-white',
    soft: 'bg-royal-soft text-royal-deep',
    text: 'text-royal',
    gradient: 'bg-gradient-to-br from-royal via-royal to-royal-deep',
    ring: 'ring-royal/30',
    dot: 'bg-royal',
    glow: 'shadow-[0_30px_60px_-25px_rgba(47,95,224,0.55)]',
    hex: '#2F5FE0',
  },
  orange: {
    solid: 'bg-taxi text-ink',
    soft: 'bg-taxi-soft text-taxi-deep',
    text: 'text-taxi-deep',
    gradient: 'bg-gradient-to-br from-taxi via-taxi to-taxi-deep',
    ring: 'ring-taxi/30',
    dot: 'bg-taxi',
    glow: 'shadow-[0_30px_60px_-25px_rgba(223,109,46,0.55)]',
    hex: '#DF6D2E',
  },
  amber: {
    solid: 'bg-sun text-ink',
    soft: 'bg-sun-soft text-sun-deep',
    text: 'text-sun-deep',
    gradient: 'bg-gradient-to-br from-sun via-sun to-taxi',
    ring: 'ring-sun/40',
    dot: 'bg-sun',
    glow: 'shadow-[0_30px_60px_-25px_rgba(239,178,50,0.6)]',
    hex: '#EFB232',
  },
  green: {
    solid: 'bg-forest text-white',
    soft: 'bg-forest-soft text-forest-deep',
    text: 'text-forest',
    gradient: 'bg-gradient-to-br from-forest via-forest to-forest-deep',
    ring: 'ring-forest/30',
    dot: 'bg-forest',
    glow: 'shadow-[0_30px_60px_-25px_rgba(62,119,66,0.55)]',
    hex: '#3E7742',
  },
}
