import type {DetailedHTMLProps, InputHTMLAttributes} from 'react'
import {forwardRef} from 'react'

// prettier-ignore
export type ReactInputProps = 
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>,HTMLInputElement>

export type InputProps = ReactInputProps & {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  // 사용자 컴포넌트의 ref 속성을 사용하려면 forwardRef를 사용
  function (props, ref) {
    const {className: _className, ...inputProps} = props
    const className = ['input', _className].join(' ')
    return <input ref={ref} {...inputProps} className={className} />
})
