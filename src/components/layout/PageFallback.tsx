/** Shown while a lazy route chunk loads. */
export function PageFallback() {
  return (
    <div className="flex min-h-[70svh] items-center justify-center" role="status" aria-live="polite">
      <img
        src="/brand/rnb-main.webp"
        alt=""
        width={72}
        height={72}
        className="h-[72px] w-[72px] animate-float rounded-full bg-white p-1 shadow-lg ring-1 ring-ink/10"
      />
      <span className="sr-only">Loading…</span>
    </div>
  )
}
