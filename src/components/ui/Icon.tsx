import {
  Briefcase,
  Building2,
  Car,
  CarTaxiFront,
  Coins,
  Hammer,
  HardHat,
  Handshake,
  HeartPulse,
  KeyRound,
  MapPin,
  Package,
  PartyPopper,
  ShieldCheck,
  ShoppingBasket,
  ShoppingCart,
  User,
  Utensils,
  Wrench,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import type { IconName } from '@/data/types'

const icons: Record<IconName, LucideIcon> = {
  hardhat: HardHat,
  briefcase: Briefcase,
  'heart-pulse': HeartPulse,
  hammer: Hammer,
  party: PartyPopper,
  building: Building2,
  wrench: Wrench,
  utensils: Utensils,
  car: Car,
  key: KeyRound,
  taxi: CarTaxiFront,
  basket: ShoppingBasket,
  user: User,
  cart: ShoppingCart,
  parcel: Package,
  'map-pin': MapPin,
  shield: ShieldCheck,
  coins: Coins,
  zap: Zap,
  handshake: Handshake,
}

export function Icon({
  name,
  className,
  size = 24,
  strokeWidth = 1.75,
}: {
  name: IconName
  className?: string
  size?: number
  strokeWidth?: number
}) {
  const Cmp = icons[name]
  return <Cmp className={className} size={size} strokeWidth={strokeWidth} aria-hidden="true" focusable="false" />
}
