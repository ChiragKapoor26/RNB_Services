import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'dark' | 'light' | 'outline' | 'outlineLight' | 'taxi' | 'sun'
type Size = 'sm' | 'md' | 'lg'

const variants: Record<Variant, string> = {
  primary: 'bg-royal text-white hover:bg-royal-deep shadow-[0_10px_30px_-12px_rgba(47,95,224,0.7)]',
  dark: 'bg-ink text-white hover:bg-ink-soft',
  light: 'bg-white text-ink hover:bg-paper',
  outline: 'border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-white',
  outlineLight: 'border border-white/35 text-white hover:bg-white hover:text-ink',
  taxi: 'bg-taxi text-ink hover:bg-sun',
  sun: 'bg-sun text-ink hover:bg-white',
}
const sizes: Record<Size, string> = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-12 px-6 text-[15px]',
  lg: 'h-14 px-8 text-base',
}

interface Base {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
}

type RouterProps = Base & { to: LinkProps['to'] } & Omit<LinkProps, 'to' | 'className' | 'children'>
type AnchorProps = Base & { href: string; to?: undefined } & Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    'className' | 'children' | 'href'
  >
type ButtonProps = Base & { to?: undefined; href?: undefined } & Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'className' | 'children'
  >

export function Button(props: RouterProps | AnchorProps | ButtonProps) {
  const { variant = 'primary', size = 'md', className, children } = props
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap',
    'transition-[background-color,color,border-color,transform,box-shadow] duration-300 ease-[var(--ease-apple)]',
    'active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50',
    variants[variant],
    sizes[size],
    className,
  )

  if (props.to !== undefined) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { variant: _v, size: _s, className: _c, children: _ch, ...linkRest } = props
    return (
      <Link className={classes} {...linkRest}>
        {children}
      </Link>
    )
  }

  if (props.href !== undefined) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { variant: _v, size: _s, className: _c, children: _ch, href, to: _t, ...aRest } = props
    const external = /^https?:/.test(href)
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...aRest}
      >
        {children}
      </a>
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { variant: _v, size: _s, className: _c, children: _ch, to: _t, href: _h, ...btnRest } = props
  return (
    <button type="button" className={classes} {...btnRest}>
      {children}
    </button>
  )
}
