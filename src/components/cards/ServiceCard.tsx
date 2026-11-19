import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { ui } from '@/data/nav'
import type { Service } from '@/data/types'
import { accentStyles } from '@/lib/accent'
import { cn } from '@/lib/cn'
import { Icon } from '@/components/ui/Icon'
import { SmartImage } from '@/components/ui/SmartImage'
import { TiltCard3D } from './TiltCard3D'

/**
 * Overview card for the Home services grid.
 * On phones it becomes a compact tile (photo + short title + 2-line summary) so all eleven
 * services fit in two columns instead of eleven full-width cards.
 */
export function ServiceCard({ service, index }: { service: Service; index: number }) {
  const accent = accentStyles[service.accent]
  return (
    <TiltCard3D index={index} maxTilt={8} radiusClass="rounded-[22px] md:rounded-[28px]">
      <Link
        to={`/services/${service.slug}`}
        className={cn(
          'group relative flex h-full flex-col rounded-[22px] bg-white p-2.5 ring-1 ring-ink/[0.07] md:min-h-[320px] md:rounded-[28px] md:p-4',
          'shadow-[0_2px_4px_rgba(11,15,26,0.04),0_24px_48px_-24px_rgba(11,15,26,0.28)]',
          '[transform-style:preserve-3d]',
        )}
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-[0_24px_36px_-20px_rgba(11,15,26,0.5)] [transform:translateZ(34px)] md:aspect-[16/10] md:rounded-2xl">
          <SmartImage
            slug={service.slug}
            alt={`${service.title} - illustrative image`}
            accent={service.accent}
            icon={service.icon}
            width={640}
            height={400}
            focus={service.imageFocus}
          />
        </div>
        <div className="mt-3 flex flex-1 flex-col px-0.5 [transform:translateZ(20px)] md:mt-5 md:px-1">
          <span className={cn('mb-3 hidden h-10 w-10 items-center justify-center rounded-xl md:inline-flex', accent.soft)}>
            <Icon name={service.icon} size={20} />
          </span>
          <h3 className="font-display text-[17px] font-semibold leading-snug text-ink md:text-2xl md:leading-tight">
            <span className="md:hidden">{service.shortTitle}</span>
            <span className="hidden md:inline">{service.title}</span>
          </h3>
          {/* progressive disclosure: phone tiles stay scannable (photo + name); the summary is on the service page */}
          <p className="mt-2 hidden text-[15px] leading-relaxed text-muted md:block">{service.summary}</p>
          <span className="mt-auto hidden items-center gap-1.5 pt-5 text-sm font-semibold text-royal md:inline-flex">
            {ui.service.explore}
            <ArrowUpRight
              size={16}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </div>
      </Link>
    </TiltCard3D>
  )
}
