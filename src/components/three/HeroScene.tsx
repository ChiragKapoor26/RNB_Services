import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ContactShadows, Environment, Float, Lightformer, RoundedBox, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { apps } from '@/data/apps'

/* ------------------------------------------------------------------ *
 * Brand colours (sampled from the logos)
 * ------------------------------------------------------------------ */
const ROYAL = '#2F5FE0'
const TAXI = '#DF6D2E'
const SUN = '#EFB232'
const FOREST = '#3E7742'
const INK = '#14161d'

interface Pointer {
  x: number
  y: number
}

/** Shared pointer state (-1..1 over the whole window, so it works under overlays) + device tilt. */
const sharedPointer: Pointer = { x: 0, y: 0 }
let pointerUsers = 0
let detachPointer: (() => void) | null = null

function attachPointer() {
  const onMove = (e: PointerEvent) => {
    sharedPointer.x = (e.clientX / window.innerWidth) * 2 - 1
    sharedPointer.y = -((e.clientY / window.innerHeight) * 2 - 1)
  }
  window.addEventListener('pointermove', onMove, { passive: true })

  // Subtle device-tilt parallax on phones (skipped where iOS needs an explicit permission prompt)
  const needsPermission =
    typeof DeviceOrientationEvent !== 'undefined' &&
    typeof (DeviceOrientationEvent as unknown as { requestPermission?: unknown }).requestPermission === 'function'
  const onTilt = (e: DeviceOrientationEvent) => {
    if (e.gamma == null || e.beta == null) return
    sharedPointer.x = THREE.MathUtils.clamp(e.gamma / 30, -1, 1)
    sharedPointer.y = THREE.MathUtils.clamp(-(e.beta - 50) / 30, -1, 1)
  }
  if (!needsPermission && 'ondeviceorientation' in window) {
    window.addEventListener('deviceorientation', onTilt, { passive: true })
  }
  return () => {
    window.removeEventListener('pointermove', onMove)
    window.removeEventListener('deviceorientation', onTilt)
  }
}

function usePointer(): Pointer {
  useEffect(() => {
    if (pointerUsers++ === 0) detachPointer = attachPointer()
    return () => {
      if (--pointerUsers === 0) {
        detachPointer?.()
        detachPointer = null
      }
    }
  }, [])
  return sharedPointer
}

function Glossy({
  color,
  roughness = 0.22,
  metalness = 0.05,
  clearcoat = 1,
}: {
  color: string
  roughness?: number
  metalness?: number
  clearcoat?: number
}) {
  return (
    <meshPhysicalMaterial
      color={color}
      roughness={roughness}
      metalness={metalness}
      clearcoat={clearcoat}
      clearcoatRoughness={0.08}
    />
  )
}

/* ------------------------------------------------------------------ *
 * The three R&B apps (User, Seller, Driver) as glossy 3D logo cards on a slow orbit.
 * Cards always face roughly forward, so every logo stays readable while it swings to the front.
 * ------------------------------------------------------------------ */
const CARD_W = 2.2
const CARD_H = 1.9
const CARD_R = 0.2

/** Rounded rectangle outline used for both the card body and its textured face. */
function roundedRectShape(w: number, h: number, r: number) {
  const x = -w / 2
  const y = -h / 2
  const s = new THREE.Shape()
  s.moveTo(x + r, y)
  s.lineTo(x + w - r, y)
  s.absarc(x + w - r, y + r, r, -Math.PI / 2, 0, false)
  s.lineTo(x + w, y + h - r)
  s.absarc(x + w - r, y + h - r, r, 0, Math.PI / 2, false)
  s.lineTo(x + r, y + h)
  s.absarc(x + r, y + h - r, r, Math.PI / 2, Math.PI, false)
  s.lineTo(x, y + r)
  s.absarc(x + r, y + r, r, Math.PI, Math.PI * 1.5, false)
  return s
}

function AppLogoOrbit({ onReady }: { onReady?: () => void }) {
  const group = useRef<THREE.Group>(null)
  const cards = useRef<(THREE.Group | null)[]>([])
  const pointer = usePointer()

  // Suspends until the three logo images are loaded, so the crossfade never reveals empty cards
  const textures = useTexture(
    apps.map((a) => a.logo),
    (loaded) => {
      const list = Array.isArray(loaded) ? loaded : [loaded]
      list.forEach((t) => {
        t.colorSpace = THREE.SRGBColorSpace
        t.anisotropy = 8
      })
    },
  )

  const geos = useMemo(() => {
    const shape = roundedRectShape(CARD_W, CARD_H, CARD_R)
    // slim glossy frame with soft bevels
    const body = new THREE.ExtrudeGeometry(shape, {
      depth: 0.1,
      bevelEnabled: true,
      bevelThickness: 0.035,
      bevelSize: 0.035,
      bevelSegments: 5,
      curveSegments: 14,
    })
    body.center()
    // textured face: same outline, UVs mapped 0..1 across the card
    const face = new THREE.ShapeGeometry(shape, 14)
    const pos = face.attributes.position
    const uv = face.attributes.uv
    for (let i = 0; i < pos.count; i++) {
      uv.setXY(i, (pos.getX(i) + CARD_W / 2) / CARD_W, (pos.getY(i) + CARD_H / 2) / CARD_H)
    }
    uv.needsUpdate = true
    return { body, face }
  }, [])

  useEffect(
    () => () => {
      geos.body.dispose()
      geos.face.dispose()
    },
    [geos],
  )

  // Tell the parent the cards are on screen (after a couple of rendered frames) so it can crossfade in
  useEffect(() => {
    const id = requestAnimationFrame(() => requestAnimationFrame(() => onReady?.()))
    return () => cancelAnimationFrame(id)
  }, [onReady])

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    const spin = t * 0.3 // one full orbit every ~21 s
    cards.current.forEach((card, i) => {
      if (!card) return
      const th = spin + (i * Math.PI * 2) / 3
      const s = Math.sin(th)
      const c = Math.cos(th)
      card.position.set(s * 1.4, Math.sin(t * 0.9 + i * 2.1) * 0.07, c * 1.0)
      card.rotation.set(0, -s * 0.55, s * 0.035) // side cards angle in towards the viewer
      card.scale.setScalar(0.92 + 0.08 * ((c + 1) / 2)) // front card slightly larger
    })
    // gentle pointer / device-tilt parallax on the whole cluster
    const g = group.current
    if (g) {
      g.rotation.y = THREE.MathUtils.damp(g.rotation.y, pointer.x * 0.25, 3, delta)
      g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -pointer.y * 0.12, 3, delta)
    }
  })

  return (
    <group ref={group}>
      {apps.map((app, i) => (
        <group
          key={app.id}
          ref={(el) => {
            cards.current[i] = el
          }}
        >
          <mesh geometry={geos.body}>
            <Glossy color="#10131c" roughness={0.25} clearcoat={1} />
          </mesh>
          <mesh geometry={geos.face} position={[0, 0, 0.088]}>
            <meshStandardMaterial
              map={textures[i]}
              emissiveMap={textures[i]}
              emissive="#ffffff"
              emissiveIntensity={0.55}
              roughness={0.4}
              metalness={0}
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}

/* ------------------------------------------------------------------ *
 * Floating service icons - simple geometry, brand-coloured
 * ------------------------------------------------------------------ */
function Wheels({ x = 0.36, y = -0.17, z = 0.27, r = 0.13 }: { x?: number; y?: number; z?: number; r?: number }) {
  return (
    <>
      {[
        [-x, y, z],
        [x, y, z],
        [-x, y, -z],
        [x, y, -z],
      ].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[r, r, 0.1, 20]} />
          <Glossy color={INK} />
        </mesh>
      ))}
    </>
  )
}

function TaxiIcon() {
  return (
    <group scale={0.85}>
      <RoundedBox args={[1.15, 0.34, 0.56]} radius={0.1} smoothness={4}>
        <Glossy color={SUN} />
      </RoundedBox>
      <RoundedBox args={[0.64, 0.3, 0.5]} radius={0.1} smoothness={4} position={[-0.04, 0.3, 0]}>
        <Glossy color={INK} roughness={0.12} />
      </RoundedBox>
      <mesh position={[-0.04, 0.54, 0]}>
        <boxGeometry args={[0.22, 0.09, 0.15]} />
        <Glossy color="#3ec26b" />
      </mesh>
      <Wheels />
    </group>
  )
}

function CarIcon() {
  return (
    <group scale={0.85}>
      <RoundedBox args={[1.15, 0.3, 0.56]} radius={0.1} smoothness={4}>
        <Glossy color={ROYAL} />
      </RoundedBox>
      <RoundedBox args={[0.62, 0.27, 0.5]} radius={0.12} smoothness={4} position={[-0.08, 0.27, 0]}>
        <Glossy color="#cfe0ff" roughness={0.1} />
      </RoundedBox>
      {[-0.28, 0.28].map((z) => (
        <mesh key={z} position={[0.58, 0.02, z]}>
          <sphereGeometry args={[0.065, 16, 16]} />
          <meshStandardMaterial color={SUN} emissive={SUN} emissiveIntensity={0.7} />
        </mesh>
      ))}
      <Wheels />
    </group>
  )
}

function BasketIcon() {
  return (
    <group scale={0.9}>
      <mesh>
        <cylinderGeometry args={[0.58, 0.4, 0.42, 10]} />
        <Glossy color="#E8A33D" roughness={0.35} clearcoat={0.4} />
      </mesh>
      <mesh position={[0, 0.21, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.58, 0.04, 12, 40]} />
        <Glossy color="#b9741c" />
      </mesh>
      <mesh position={[0, 0.2, 0]}>
        <torusGeometry args={[0.52, 0.035, 12, 40, Math.PI]} />
        <Glossy color={INK} />
      </mesh>
      <mesh position={[-0.2, 0.34, 0.05]}>
        <sphereGeometry args={[0.2, 20, 20]} />
        <Glossy color={FOREST} roughness={0.4} />
      </mesh>
      <mesh position={[0.22, 0.32, 0.1]}>
        <sphereGeometry args={[0.17, 20, 20]} />
        <Glossy color="#e5484d" />
      </mesh>
      <mesh position={[0.02, 0.4, -0.15]}>
        <sphereGeometry args={[0.15, 20, 20]} />
        <Glossy color={SUN} />
      </mesh>
    </group>
  )
}

function HouseIcon() {
  return (
    <group scale={0.9} position={[0, -0.1, 0]}>
      <mesh>
        <boxGeometry args={[0.86, 0.6, 0.76]} />
        <Glossy color="#f4efe4" roughness={0.45} clearcoat={0.3} />
      </mesh>
      <mesh position={[0, 0.5, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[0.78, 0.5, 4]} />
        <Glossy color={TAXI} />
      </mesh>
      <mesh position={[0, -0.12, 0.39]}>
        <boxGeometry args={[0.2, 0.34, 0.04]} />
        <Glossy color={ROYAL} />
      </mesh>
      <mesh position={[0.26, 0.2, 0.39]}>
        <boxGeometry args={[0.16, 0.14, 0.04]} />
        <Glossy color="#bcd0ff" />
      </mesh>
    </group>
  )
}

function WrenchIcon() {
  return (
    <group rotation={[0, 0, Math.PI / 4]} scale={0.95}>
      <mesh>
        <cylinderGeometry args={[0.075, 0.095, 0.95, 20]} />
        <Glossy color="#c9d1e0" roughness={0.22} metalness={0.85} />
      </mesh>
      <mesh position={[0, 0.58, 0]} rotation={[0, 0, Math.PI * 0.18]}>
        <torusGeometry args={[0.2, 0.085, 16, 40, Math.PI * 1.62]} />
        <Glossy color="#c9d1e0" roughness={0.22} metalness={0.85} />
      </mesh>
      <mesh position={[0, -0.5, 0]}>
        <sphereGeometry args={[0.11, 20, 20]} />
        <Glossy color={ROYAL} />
      </mesh>
    </group>
  )
}

function HeartIcon() {
  const geo = useMemo(() => {
    const pts: THREE.Vector2[] = []
    for (let i = 0; i <= 80; i++) {
      const t = (i / 80) * Math.PI * 2
      const x = 16 * Math.sin(t) ** 3
      const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)
      pts.push(new THREE.Vector2(x / 19, y / 19))
    }
    const g = new THREE.ExtrudeGeometry(new THREE.Shape(pts), {
      depth: 0.22,
      bevelEnabled: true,
      bevelThickness: 0.09,
      bevelSize: 0.08,
      bevelSegments: 8,
    })
    g.center()
    return g
  }, [])
  useEffect(() => () => geo.dispose(), [geo])
  return (
    <mesh geometry={geo} scale={0.95}>
      <Glossy color="#ee5a3c" roughness={0.18} />
    </mesh>
  )
}

/** Wraps an icon in a gentle Float + pointer parallax (deeper = moves more). */
function Floating({
  position,
  depth,
  speed = 1.2,
  children,
}: {
  position: [number, number, number]
  depth: number
  speed?: number
  children: ReactNode
}) {
  const ref = useRef<THREE.Group>(null)
  const pointer = usePointer()
  useFrame((_, delta) => {
    const g = ref.current
    if (!g) return
    g.position.x = THREE.MathUtils.damp(g.position.x, position[0] + pointer.x * depth, 2.5, delta)
    g.position.y = THREE.MathUtils.damp(g.position.y, position[1] + pointer.y * depth * 0.6, 2.5, delta)
  })
  return (
    <group ref={ref} position={position}>
      <Float speed={speed} rotationIntensity={0.9} floatIntensity={1.1}>
        {children}
      </Float>
    </group>
  )
}

/* ------------------------------------------------------------------ *
 * Scene
 * ------------------------------------------------------------------ */
function Scene({ onReady }: { onReady?: () => void }) {
  const { viewport, size } = useThree()

  // Responsive layout. Wide screens: the logo orbit + icons live in the RIGHT half so the headline stays clear.
  // Portrait / phones: the scene is centred in the lower part of the hero, below the copy.
  const W = viewport.width
  const H = viewport.height
  const wide = size.width / size.height >= 1.25
  const s = wide ? THREE.MathUtils.clamp(Math.min(W / 11.8, H / 6.9), 0.4, 1.1) : THREE.MathUtils.clamp(W / 6.3, 0.2, 0.75)
  const x = wide ? W * 0.245 : 0
  const y = wide ? -H * 0.02 : -H * 0.2

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 5]} intensity={1.6} />
      <directionalLight position={[-5, 2, 3]} intensity={0.6} color="#bcd0ff" />

      <group position={[x, y, 0]} scale={s}>
        <AppLogoOrbit onReady={onReady} />
        {wide && (
          <Floating position={[-2.15, 1.85, -1.4]} depth={0.5} speed={1.1}>
            <TaxiIcon />
          </Floating>
        )}
        <Floating position={[-2.0, -1.9, -0.8]} depth={0.7} speed={1.4}>
          <BasketIcon />
        </Floating>
        {wide && (
          <Floating position={[2.2, 1.85, -1.4]} depth={0.4} speed={1.0}>
            <HouseIcon />
          </Floating>
        )}
        <Floating position={[2.25, -1.8, -0.8]} depth={0.8} speed={1.5}>
          <WrenchIcon />
        </Floating>
        {wide && (
          <Floating position={[0.1, 2.5, -1.8]} depth={0.3} speed={1.3}>
            <HeartIcon />
          </Floating>
        )}
        <Floating position={[0.1, -2.55, -0.6]} depth={0.9} speed={1.2}>
          <CarIcon />
        </Floating>
        <ContactShadows position={[0, -1.6, 0]} opacity={0.22} scale={8} blur={2.8} far={4} frames={1} />
      </group>

      {/* Procedural studio lighting - no network fetch, baked once. Kept soft so brand colours stay rich. */}
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={2.2} position={[0, 5, -6]} scale={[12, 5, 1]} color="#ffffff" />
        <Lightformer form="rect" intensity={1.4} position={[-6, 1, 0]} rotation-y={Math.PI / 2} scale={[10, 3, 1]} color="#dfe8ff" />
        <Lightformer form="rect" intensity={1.2} position={[6, 0, 2]} rotation-y={-Math.PI / 2} scale={[10, 3, 1]} color="#ffe9d0" />
      </Environment>
    </>
  )
}

/**
 * Default export is lazy-loaded by Hero3D so three.js never blocks first paint.
 * The render loop pauses while the hero is scrolled out of view.
 */
export default function HeroScene({ onReady }: { onReady?: () => void }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={wrapRef} className="absolute inset-0" aria-hidden="true">
      <Canvas
        flat
        frameloop={visible ? 'always' : 'never'}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.2, 6.4], fov: 35 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Scene onReady={onReady} />
      </Canvas>
    </div>
  )
}
