'use client'

/* traeremos los todos del lado del servidor al cliente */

import { Todo } from "@prisma/client"
import { TodoItem } from "./TodoItem"

// import * as todosApi from '@/todos/helpers/todos' // acatreremos todas nuestras funciones
// import { useRouter } from "next/navigation"
import { toggleTodo } from "../actions/todo-actions" // server action


interface Props {
  todos?: Todo[]
}


export const TodosGrid = ({ todos = [] }: Props = {}) => {

  // const router = useRouter()

  // creamos esta funcion y no pasamos el todosApi.updateTodo porque queremos que next recargue la pagina y se vean los cambios
  /*   const toggleTodo = async (id: string, complete: boolean) => {
      // console.log({ id, complete })
  
  
      const updatedTodo = await todosApi.updateTodo(id, complete)
      console.log({ updatedTodo })
      // si este proceso demora mucho despues veremos las actualizaciones optimistas, para tener algo que parezca instantaneo
  
      router.refresh() // para refrescar esta ruta en particular, sin afectar el estado de la app y hace las actualizaciones correspondientes
      // no es un refresh destructivo, si tuviera un useState en otro componente y lo cambio, al ejecutar esto no se reiniciaria
  
  
      return updatedTodo
    } */

  // console.log(todos)


  /* CON SERVER ACTIONS - puedo pasarle la funcion del server action directamente */
  // const onToggleTodo = () => {

  // }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {
        todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
        ))
      }
    </div>
  )
}