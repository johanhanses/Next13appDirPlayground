import { GlassPane } from '@/components/GlassPane'
import { ReactNode } from 'react'
import { Inter } from '@next/font/google'
import '@/styles/global.css'
import { Sidebar } from '@/components/Sidebar'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin']
})

interface AuthRootLayoutProps {
  children: ReactNode | ReactNode[]
}

export default function DashboardRootLayout({ children }: AuthRootLayoutProps) {
  return (
    <html lang="en" className={inter.variable}>
      <head />
      <body className="h-screen w-screen candy-mesh p-6">
        <GlassPane classNames="w-full h-full flex items-center p-6">
          <Sidebar />
          {children}
        </GlassPane>
        <div id="modal" />
      </body>
    </html>
  )
}
