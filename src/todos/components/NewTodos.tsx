'use client';

import { FormEvent, useState } from "react";
// import { useRouter } from "next/navigation";
import { IoTrashOutline } from "react-icons/io5";
// import * as todosApi from '@/todos/helpers/todos'
import { addTodo, deleteCompleted } from "../actions/todo-actions";


export const NewTodo = () => {

  // const route = useRouter()


  // para acceder y manejar el value del input
  const [description, setDescription] = useState("")



  const onSubmit = async (e: FormEvent) => {

    e.preventDefault()

    console.log('form submitted', description)

    if (description.trim().length === 0) return

    // podriamos manejar un estado con loading, etc

    // usamos el server action
    addTodo(description)
    setDescription("")


    // del lado del servidor al usar los server actions debo usar el revalidatePath en el server action, si llamamos el revalidatePath del lado del cliente no funciona nos marcara un error
    // route.refresh()

  }
  /* 
    const deleteCompleted = async () => {
      // await todosApi.deleteCompletedTodo()
      // route.refresh()
    } */


  return (
    <form onSubmit={onSubmit} className='flex w-full'>
      <input type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className="w-6/12 -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all"
        placeholder="¿Qué necesita ser hecho?" />

      <button type='submit' className="flex items-center justify-center rounded ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all">
        Crear
      </button>

      <span className='flex flex-1'></span>

      <button
        // onClick={deleteCompleted} // cuando usamos server actions no funciona de esta forma - seccion 11 video 08
        onClick={() => deleteCompleted()}
        type='button' className="flex items-center justify-center rounded ml-2 bg-red-400 p-2 text-white hover:bg-red-700 transition-all">
        <IoTrashOutline />
        Borrar Completados
      </button>


    </form>
  )
}