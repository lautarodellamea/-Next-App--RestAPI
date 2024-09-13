// el todoItem muestra los todos y funciones respectivas

'use client' // el onClick es algo del cliente


import { Todo } from "@prisma/client"

import styles from './TodoItem.module.css'
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5"
import { startTransition, useOptimistic } from "react"


interface Props {
  todo: Todo

  // TODO: Acciones que quiero llamar

  toggleTodo: (id: string, complete: boolean) => Promise<Todo | void>
}

export const TodoItem = ({ todo, toggleTodo }: Props) => {

  // nos sirve para que los cambios sean muy rapidos aunque no hayan pasado, mejoramos la experiencia de usuario
  // muy parecido al useState
  // con esto veremos que los delay o nuestra funcion sleep que lo simula no intereferira en la UI del usuario
  const [todoOptimistic, toggleTodoOptimistic] = useOptimistic(
    todo,
    (state, newCompleteValue: boolean) => ({ ...state, complete: newCompleteValue }), // funcion que cambia el valor que teniamos antes en todo por un nuevo valor
  )

  const onToggleTodo = async () => {

    try {

      // toggleTodoOptimistic(!todoOptimistic.complete) // esto hace el cambio visualmente con el useOptimistic
      // dentro del callback que recibe el startTransition ponemos lo que queremos hacer op´timista
      startTransition(() => { toggleTodoOptimistic(!todoOptimistic.complete) })

      await toggleTodo(todoOptimistic.id, !todoOptimistic.complete) // disparamos la accion

    } catch (error) {

      startTransition(() => { toggleTodoOptimistic(!todoOptimistic.complete) })

    }


  }


  return (
    <div className={todoOptimistic.complete ? styles.todoDone : styles.todoPending}>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div
          // onClick={() => toggleTodo(todoOptimistic.id, !todoOptimistic.complete)}
          onClick={onToggleTodo}
          className={`
          flex p-2 rounded-md cursor-pointer
          hover:bg-opacity-60
          bg-blue-100
          ${todoOptimistic.complete ? "bg-blue-100" : "bg-red-100"}
          `}>
          {
            todoOptimistic.complete
              ? <IoCheckboxOutline size={30} />
              : <IoSquareOutline size={30} />
          }

        </div>

        <div className="text-center">
          {todoOptimistic.description}
        </div>

      </div>
    </div>
  )
}