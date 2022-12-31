import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  classNames?: string
  intent?: 'primary' | 'secondary' | 'text'
  size?: 'small' | 'medium' | 'large'
  type: 'button' | 'submit' | 'reset' | undefined
  onClick?: () => void
}

export const Button = ({
  children,
  classNames,
  intent = 'primary',
  size = 'medium',
  type,
  onClick,
  ...props
}: ButtonProps) => {
  const colorClasses =
    intent === 'primary'
      ? 'bg-violet-500 text-white border-transparent hover:bg-violet-600'
      : intent === 'secondary'
      ? 'bg-white text-black border-gray-400 hover:bg-gray-100 border-solid border-2 border-gray-800'
      : 'bg-tranparent text-black hover:bg-gray-100'
  const sizeClasses =
    size === 'small' ? 'text-md py-1 px-2' : size === 'medium' ? 'text-lg px-6 py-2' : 'text-xl px-8 py-4'

  return (
    <button
      onClick={onClick}
      type={type}
      className={`rounded-3xl font-bold hover:scale-110 active:scale-100 transition duration-200 ease-in-out ${colorClasses} ${sizeClasses} bg-vio`}
      {...props}
    >
      {children}
    </button>
  )
}
