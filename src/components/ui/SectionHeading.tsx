import { cn } from '@/lib/cn'

interface Props {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  tone?: 'light' | 'dark'
  className?: string
  as?: 'h1' | 'h2'
}

export function SectionHeading({ eyebrow, title, subtitle, align = 'left', tone = 'light', className, as: Tag = 'h2' }: Props) {
  const dark = tone === 'dark'
  return (
    <div className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && (
        <p className={cn('mb-4 text-xs font-bold uppercase tracking-[0.2em]', dark ? 'text-sun' : 'text-royal')}>
          {eyebrow}
        </p>
      )}
      <Tag className={cn('text-balance text-4xl sm:text-5xl lg:text-6xl', dark ? 'text-white' : 'text-ink')}>{title}</Tag>
      {subtitle && (
        <p className={cn('mt-5 text-lg leading-relaxed sm:text-xl', dark ? 'text-white/75' : 'text-muted')}>{subtitle}</p>
      )}
    </div>
  )
}
