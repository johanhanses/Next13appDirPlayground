import { ReactNode } from 'react'

interface GlassPaneProps {
  children: ReactNode
  classNames?: string
}
export const GlassPane = ({ children, classNames }: GlassPaneProps) => {
  return <div className={`glass rounded-2xl border-solid border-2 border-gray-200 ${classNames}`}>{children}</div>
}
