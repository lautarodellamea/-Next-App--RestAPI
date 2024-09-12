'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

interface Props {
  icon: React.ReactNode
  path: string
  title: string
}

export const SidebarItem = ({ icon, path, title }: Props) => {

  const pathName = usePathname()

  return (
    <li>
      <Link href={path} className={`
        px-4 py-3 flex items-center space-x-4 rounded-md hover:text-white text-gray-600 group  hover:bg-sky-500
        ${pathName === path ? 'bg-gradient-to-r from-sky-600 to-cyan-400 text-white' : ''}
        `}>
        {icon}
        <span className="-mr-1 font-medium">{title}</span>
      </Link>
    </li>
  )
}
