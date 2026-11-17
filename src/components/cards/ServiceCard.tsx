import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { ui } from '@/data/nav'
import type { Service } from '@/data/types'
import { accentStyles } from '@/lib/accent'
import { cn } from '@/lib/cn'
import { Icon } from '@/components/ui/Icon'
import { SmartImage } from '@/components/ui/SmartImage'
import { TiltCard3D } from './TiltCard3D'

/** Overview card for the Home services grid. */
export function ServiceCard({ service, index }: { service: Service; index: number }) {
  const accent = accentStyles[service.accent]
  return (
    <TiltCard3D index={index} maxTilt={8}>
      <Link
        to={`/services/${service.slug}`}
        className={cn(
          'group relative flex h-full min-h-[320px] flex-col rounded-[28px] bg-white p-4 ring-1 ring-ink/[0.07]',
          'shadow-[0_2px_4px_rgba(11,15,26,0.04),0_24px_48px_-24px_rgba(11,15,26,0.28)]',
          '[transform-style:preserve-3d]',
        )}
      >
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-[0_24px_36px_-20px_rgba(11,15,26,0.5)] [transform:translateZ(34px)]">
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
        <div className="mt-5 flex flex-1 flex-col px-1 [transform:translateZ(20px)]">
          <span className={cn('mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl', accent.soft)}>
            <Icon name={service.icon} size={20} />
          </span>
          <h3 className="font-display text-2xl font-semibold leading-tight text-ink">{service.title}</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-muted">{service.summary}</p>
          <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-royal">
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
