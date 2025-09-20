import type { ButtonHTMLAttributes } from 'react'
import { forwardRef } from 'react'
import { cn } from '../../lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline'
type Size = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = 'primary', size = 'md', ...props },
  ref,
) {
  const base = 'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]'
  const sizes: Record<Size, string> = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-11 px-6 text-base',
  }
  const variants: Record<Variant, string> = {
    primary:
      'bg-gradient-to-b from-blue-600 to-blue-700 text-white shadow-sm hover:from-blue-600 hover:to-blue-800 hover:shadow-md focus-visible:ring-blue-600',
    secondary:
      'bg-gray-900 text-white shadow-sm hover:bg-black focus-visible:ring-gray-900',
    ghost:
      'bg-transparent text-gray-900 hover:bg-gray-100 focus-visible:ring-gray-300',
    danger:
      'bg-gradient-to-b from-red-600 to-red-700 text-white shadow-sm hover:from-red-600 hover:to-red-800 focus-visible:ring-red-600',
    outline:
      'border border-gray-300 text-gray-900 bg-white hover:bg-gray-50 focus-visible:ring-gray-300',
  }
  return (
    <button ref={ref} className={cn(base, sizes[size], variants[variant], className)} {...props} />
  )
})


