'use client'

import { setCookie } from "cookies-next"
import { useRouter } from "next/navigation"
import { useState } from "react"

// const tabOptions = [1, 2, 3, 4, 5]

interface Props {
  currentTab?: number // cual es el seleccionado
  tabOptions?: number[] // la cantidad de opciones, por si la persona quiere mandarme la cantidad de tabs

}


export const TabBar = ({ tabOptions = [1, 2, 3, 4], currentTab = 1 }: Props) => {

  const router = useRouter()
  const [selected, setSelected] = useState(currentTab)

  // podemos meter una validacion de que el tab seleccionado no sea mayor que la cantidad de tabs, sino dejarlo en 1 por defecto,etc

  const onTabSelected = (tab: number) => {
    setSelected(tab)

    // manipulando las cookies - esto de aca se puede hacer solo del lado del cliente
    setCookie('selectedTab', tab.toString())

    router.refresh();

  }



  return (
    <div style={{ gridTemplateColumns: `repeat(${tabOptions.length}, minmax(0, 1fr))` }} className="grid w-full grid-cols-4 space-x-2 rounded-xl bg-gray-200 p-2">

      {
        tabOptions.map((tab) => (
          <div key={tab}>
            <input
              checked={selected === tab}
              onChange={() => { }} // esto lo hago para seguir las buenas practicas de react aunque no lo use
              type="radio" id={tab.toString()}
              className="peer hidden"
            />
            <label
              onClick={() => onTabSelected(tab)}
              className="transition-all block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
            >
              {tab}
            </label>
          </div>
        ))
      }


    </div>
  )
}