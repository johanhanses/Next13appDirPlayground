import { Card } from './Card'
import { SidebarLink } from './SidebarLink'

const links = [
  { label: 'Home', icon: 'grid', link: '/home' },
  { label: 'Calendar', icon: 'calendar', link: '/calendar' },
  { label: 'Profile', icon: 'user', link: '/profile' },
  { label: 'Settings', icon: 'settings', link: '/settings' }
]

export const Sidebar = () => {
  return (
    <Card classNames="h-full w-40 flex items-center justify-between flex-wrap">
      {/* <div className="w-full flex justify-center items-center"> */}
      {/* <Image src={logo} alt="Able logo" priority className="w-14" /> */}
      {/* </div> */}
      {links.map((link) => (
        <SidebarLink link={link} key={link.link} />
      ))}
    </Card>
  )
}
