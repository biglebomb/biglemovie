import { act, renderHook } from '@testing-library/react'
import { useFormField } from './useFormField'
import type { ChangeEvent } from 'react'

describe('useFormField', () => {
  it('tracks value and validates on blur', () => {
    const { result } = renderHook(() => useFormField('', { validate: (v) => (v ? undefined : 'Required') }))

    expect(result.current.value).toBe('')
    expect(result.current.error).toBeUndefined()

    act(() => result.current.onBlur())
    expect(result.current.touched).toBe(true)
    expect(result.current.error).toBe('Required')

    act(() => result.current.setValue('hello'))
    act(() => result.current.onBlur())
    expect(result.current.error).toBeUndefined()
  })

  it('re-validates on change after touched', () => {
    const { result } = renderHook(() => useFormField('', { validate: (v) => (v ? undefined : 'Required') }))
    act(() => result.current.onBlur())

    act(() => result.current.onChange({ target: { value: 'x' } } as unknown as ChangeEvent<HTMLInputElement>))
    expect(result.current.value).toBe('x')
    expect(result.current.error).toBeUndefined()
  })
})
