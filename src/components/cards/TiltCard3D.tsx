import { useRef, type CSSProperties, type PointerEvent, type ReactNode } from 'react'
import { m, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useCanHover, usePrefersReducedMotion } from '@/hooks/useMedia'
import { cn } from '@/lib/cn'

interface Props {
  children: ReactNode
  className?: string
  /** max tilt in degrees */
  maxTilt?: number
  /** index in the grid - drives the staggered entrance + float phase */
  index?: number
  /** radius to match the child shell so the glare is clipped correctly */
  radiusClass?: string
}

/**
 * Reusable 3D card wrapper.
 *  - Pointer devices: perspective tilt that follows the cursor + moving glare highlight + spring hover/press.
 *  - Touch devices:   no tilt, a gentle floating motion instead.
 *  - Reduced motion:  completely static (no entrance, tilt or float).
 *  - Staggered fade/rise entrance when scrolled into view.
 *
 * Children can create depth layers with `[transform:translateZ(30px)]` - this wrapper (and the
 * direct child shell) should keep `transform-style: preserve-3d`.
 */
export function TiltCard3D({ children, className, maxTilt = 9, index = 0, radiusClass = 'rounded-[28px]' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const canHover = useCanHover()
  const reduce = usePrefersReducedMotion()
  const tilt = canHover && !reduce

  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const spring = { stiffness: 220, damping: 22, mass: 0.6 }
  const sx = useSpring(px, spring)
  const sy = useSpring(py, spring)
  const rotateY = useTransform(sx, [0, 1], [-maxTilt, maxTilt])
  const rotateX = useTransform(sy, [0, 1], [maxTilt, -maxTilt])
  const gx = useTransform(sx, (v) => v * 100)
  const gy = useTransform(sy, (v) => v * 100)
  const glare = useMotionTemplate`radial-gradient(380px circle at ${gx}% ${gy}%, rgba(255,255,255,0.38), transparent 46%)`
  const glareOpacity = useMotionValue(0)

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width)
    py.set((e.clientY - r.top) / r.height)
  }
  const onEnter = () => glareOpacity.set(1)
  const onLeave = () => {
    px.set(0.5)
    py.set(0.5)
    glareOpacity.set(0)
  }

  const floatStyle: CSSProperties | undefined =
    !tilt && !reduce ? { animationDelay: `${(index % 5) * -1.4}s` } : undefined

  return (
    <m.div
      initial={reduce ? false : { opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.75, delay: (index % 3) * 0.09, ease: [0.22, 1, 0.36, 1] }}
      className={cn('h-full', className)}
    >
      <div className={cn('h-full', !tilt && !reduce && 'animate-float')} style={floatStyle}>
        <div className="h-full [perspective:1000px]">
          <m.div
            ref={ref}
            onPointerMove={tilt ? onMove : undefined}
            onPointerEnter={tilt ? onEnter : undefined}
            onPointerLeave={tilt ? onLeave : undefined}
            style={tilt ? { rotateX, rotateY, transformStyle: 'preserve-3d' } : { transformStyle: 'preserve-3d' }}
            whileHover={tilt ? { scale: 1.025 } : undefined}
            whileTap={reduce ? undefined : { scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            className="relative h-full will-change-transform"
          >
            {children}
            {tilt && (
              <m.div
                aria-hidden="true"
                className={cn('pointer-events-none absolute inset-0 mix-blend-soft-light', radiusClass)}
                style={{ background: glare, opacity: glareOpacity }}
              />
            )}
          </m.div>
        </div>
      </div>
    </m.div>
  )
}
