import { GlassPane } from '@/components/GlassPane'
import { ReactNode } from 'react'
import { Inter } from '@next/font/google'
import '@/styles/global.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin']
})

interface AuthRootLayoutProps {
  children: ReactNode | ReactNode[]
}

export default function AuthRootLayout({ children }: AuthRootLayoutProps) {
  return (
    <html lang="en" className={inter.variable}>
      <head />
      <body className="h-screen w-screen rainbow-mesh p-6">
        <GlassPane classNames="w-full h-full flex items-center justify-center">{children}</GlassPane>
      </body>
    </html>
  )
}
