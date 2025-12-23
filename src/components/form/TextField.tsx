import _ from 'lodash'
import { useId } from 'react'
import type { InputHTMLAttributes } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

export function TextField({
  label,
  error,
  hint,
  id,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
  hint?: string
}) {
  const autoId = useId()
  const inputId = id ?? autoId
  const describedBy = _.compact([error ? `${inputId}-error` : null, hint ? `${inputId}-hint` : null]).join(' ') || undefined

  return (
    <div className={cn('grid gap-1.5', className)}>
      <Label htmlFor={inputId}>{label}</Label>
      <Input id={inputId} aria-describedby={describedBy} aria-invalid={Boolean(error) || undefined} {...props} />
      {hint && (
        <div id={`${inputId}-hint`} className="text-xs text-muted-foreground">
          {hint}
        </div>
      )}
      {error && (
        <div id={`${inputId}-error`} className="text-sm text-destructive" role="alert">
          {error}
        </div>
      )}
    </div>
  )
}

