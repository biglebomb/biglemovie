import { useCallback, useMemo, useState } from 'react'
import type { ChangeEvent } from 'react'

type ValidateFn<T> = (value: T) => string | undefined

export function useFormField<T>(
  initialValue: T,
  options?: {
    validate?: ValidateFn<T>
  },
) {
  const validate = options?.validate
  const [value, setValue] = useState<T>(initialValue)
  const [touched, setTouched] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)

  const onBlur = useCallback(() => {
    setTouched(true)
    if (validate) {
      setError(validate(value))
    }
  }, [validate, value])

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const next = (e.target.value as unknown) as T
      setValue(next)
      if (touched && validate) {
        setError(validate(next))
      }
    },
    [touched, validate],
  )

  const inputProps = useMemo(
    () => ({
      value: (value as unknown) as string,
      onChange,
      onBlur,
      'aria-invalid': Boolean(error) || undefined,
    }),
    [error, onBlur, onChange, value],
  )

  return { value, setValue, touched, setTouched, error, setError, onChange, onBlur, inputProps }
}
