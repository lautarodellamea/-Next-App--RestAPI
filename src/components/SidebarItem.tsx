'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

interface Props {
  icon: React.ReactNode
  path: string
  title: string
}

export const SidebarItem = ({ icon, path, title }: Props) => {

  const pathName = usePathname()

  /* *** */
  const [counter, setCounter] = useState(10)

  return (
    <li>
      <Link href={path} className={`
        px-4 py-3 flex items-center space-x-4 rounded-md hover:text-white text-gray-600 group  hover:bg-sky-500
        ${pathName === path ? 'bg-gradient-to-r from-sky-600 to-cyan-400 text-white' : ''}
        `}>
        {icon}
        <span className="-mr-1 font-medium">{title}</span>
      </Link>
      {/* *** Este contador se utiliza para verificar que al hacer clic en él y luego agregar un nuevo "todo", el uso de `router.refresh` no realiza un refresco destructivo. En lugar de reiniciar todo el estado, solo actualiza lo que es necesario, preservando el estado del contador. */}
      <span onClick={() => setCounter(counter + 1)} className="bg-sky-500 text-white p-1 cursor-pointer rounded">{counter}</span>
    </li>
  )
}
