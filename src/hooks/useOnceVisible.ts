import { useEffect, useState, type RefObject } from 'react'

/** Becomes true (and stays true) the first time the element nears the viewport. */
export function useOnceVisible(ref: RefObject<Element | null>, rootMargin = '300px'): boolean {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || visible) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { rootMargin },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [ref, rootMargin, visible])
  return visible
}
