import { Compass } from 'lucide-react'
import { ui } from '@/data/nav'
import { Seo } from '@/components/layout/Seo'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  const nf = ui.notFound
  return (
    <>
      <Seo title={nf.title} description={nf.text} noindex />
      <section className="relative isolate flex min-h-[85svh] items-center overflow-x-clip pt-28" aria-labelledby="nf-title">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/4 top-1/4 h-[420px] w-[420px] rounded-full bg-royal/10 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-[380px] w-[380px] rounded-full bg-sun/25 blur-3xl" />
        </div>
        <div className="container-x text-center">
          <div className="relative mx-auto mb-8 flex h-28 w-28 items-center justify-center">
            <img src="/brand/rnb-main.webp" alt="" width={112} height={112} className="h-28 w-28 animate-float rounded-full bg-white p-2 shadow-xl ring-1 ring-ink/10" />
            <span className="absolute -bottom-1 -right-1 flex h-11 w-11 items-center justify-center rounded-full bg-taxi text-ink shadow-lg">
              <Compass size={22} aria-hidden="true" />
            </span>
          </div>
          <p className="font-display text-8xl font-semibold text-royal sm:text-9xl">404</p>
          <h1 id="nf-title" className="mt-4 text-4xl font-semibold text-ink sm:text-5xl">{nf.title}</h1>
          <p className="mx-auto mt-4 max-w-md text-lg text-muted">{nf.text}</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button to="/" size="lg">{nf.home}</Button>
            <Button to={{ pathname: '/', hash: '#services' }} variant="outline" size="lg">{nf.services}</Button>
          </div>
        </div>
      </section>
    </>
  )
}
