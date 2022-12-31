import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  classNames?: string
}

export const Card = ({ children, classNames }: CardProps) => (
  <div className={`rounded-3xl px-10 py-4 drop-shadow-xl bg-white ${classNames}`}>{children}</div>
)
