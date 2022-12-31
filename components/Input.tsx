import { ChangeEvent, SetStateAction } from 'react'

interface InputProps {
  classNames?: string
  placeholder?: string
  required?: boolean
  value?: string
  type?: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void | ((value: SetStateAction<string>) => void)
}

export const Input = ({ classNames, placeholder, required, value, type, onChange, ...props }: InputProps) => (
  <input
    required={required}
    placeholder={placeholder}
    value={value}
    type={type}
    onChange={onChange}
    className={`border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full ${classNames}`}
    {...props}
  />
)
