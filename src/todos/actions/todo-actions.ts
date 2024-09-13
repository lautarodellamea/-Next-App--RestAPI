// todo este archivo se ejecutara del lado del servidor pero el cliente puede mandarlo a llamar
'use server'

import prisma from "@/lib/prisma"
import { Todo } from "@prisma/client"
import { revalidatePath } from "next/cache"

// funcion para simular un tiempo
export const sleep = (seconds: number = 0) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, seconds * 1000);
  })

}



export const toggleTodo = async (id: string, complete: boolean): Promise<Todo> => {

  await sleep(3)


  // 'use server' si solo quisieramos que esta funcion se ejecute del lado del servidor

  const todo = await prisma.todo.findFirst({ where: { id: id } })

  if (!todo) {
    throw `Todo with id ${id} not found`
  }


  const updatedTodo = await prisma.todo.update({
    where: { id: id },
    data: { complete: complete }
  })

  revalidatePath('/dashboard/server-todos')

  return updatedTodo
}


export const addTodo = async (description: string) => {

  try {

    const todo = await prisma.todo.create({ data: { description: description } })

    revalidatePath('/dashboard/server-todos')

    return todo

  } catch (error) {

    return {
      message: 'Error creando todo'
    }

  }

}


export const deleteCompleted = async (): Promise<void> => {

  await prisma.todo.deleteMany({
    where: { complete: true },
  })

  revalidatePath('/dashboard/server-todos')

}