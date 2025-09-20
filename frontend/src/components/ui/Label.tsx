import type { LabelHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

export function Label({ className, ...props }: LabelProps) {
  return <label className={cn('block text-sm font-medium text-gray-800', className)} {...props} />
}


