'use client'
import { Settings, User, Grid, Calendar } from 'react-feather'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

interface SidebarLinkProps {
  link: {
    link: string
    icon: string
    label: string
  }
}

const icons = [
  {
    name: 'settings',
    icon: Settings
  },
  {
    name: 'user',
    icon: User
  },
  {
    name: 'grid',
    icon: Grid
  },
  {
    name: 'calendar',
    icon: Calendar
  }
]

export const SidebarLink = ({ link }: SidebarLinkProps) => {
  const pathname = usePathname()

  let isActive = false
  if (pathname === link.link) isActive = true

  const Icon = icons.filter((icon) => icon.name === link.icon)[0].icon

  return (
    <Link href={link.link} className="w-full flex justify-center items-center">
      <Icon
        size={40}
        className={`stroke-gray-400 hover:stroke-violet-600 transition duration-300 ease-in-out ${
          isActive && 'stroke-violet-600'
        }`}
      />
    </Link>
  )
}
