import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import * as yup from 'yup';


interface Segments {
  params: {
    id: string
  }
}



// Esta funcion la cree para reutilizar codigo ***
const getTodo = async (id: string): Promise<Todo | undefined> => {

  const todo = await prisma.todo.findUnique({ where: { id: id } })

  if (!todo) {
    return undefined
  }

  return todo

  // aca no puedo regresar  return Response..., ya que solo lo podemos retornar del handler
  // si quisieramos todos por usuarios aca podriamos sinetizar la logica y el codigo de abajo no se veria afectado, ya que devolveriamos esos todos
}


// obtener un todo por id
export async function GET(request: Request, segments: Segments) {

  // de aca sacaremos los params, y de ahi viene el id por ejemplo
  console.log({ segments })

  const { id } = segments.params

  // Reutilizamos codigo ***
  /* const todo = await prisma.todo.findUnique({ where: { id: id } })

  if (!todo) {
    return Response.json({
      message: `No se encontro el todo con el id ${id}`
    }, { status: 404 })
  } */
  const todo = await getTodo(id)

  if (!todo) {
    return Response.json({
      message: `No se encontro el todo con el id ${id}`
    }, { status: 404 })
  }


  return Response.json({
    message: 'Hello World',
    todo: todo,
    segments: segments.params.id,
    method: request.method,
  });
}

// modificar un todo por id

const putSchema = yup.object({
  description: yup.string().optional(),
  complete: yup.boolean().optional(),
})



export async function PUT(request: Request, segments: Segments) {

  // de aca sacaremos los params, y de ahi viene el id por ejemplo
  console.log({ segments })

  const { id } = segments.params

  //  esto lo hacemos para no actualizar un todo que no existe
  // Reutilizamos codigo ***
  /*   const todo = await prisma.todo.findUnique({ where: { id: id } })
  
    if (!todo) {
      return Response.json({
        message: `No se encontro el todo con el id ${id}`
      }, { status: 404 })
    } */

  const todo = await getTodo(id)

  if (!todo) {
    return Response.json({
      message: `No se encontro el todo con el id ${id}`
    }, { status: 404 })
  }


  try {

    // vemos lo que queremos poner en la actualizacion
    // const { description, complete, ...rest } = await request.json()
    const { description, complete, ...rest } = await putSchema.validate(await request.json())

    const updatedTodo = await prisma.todo.update({
      where: { id: id },
      data: { complete: complete, description: description },
    })


    return Response.json({
      message: 'Hello World',
      todo: todo,
      updatedTodo: updatedTodo,
      rest: rest,
      segments: segments.params.id,
      method: request.method,
    });
  } catch (error) {


    return Response.json({
      error: error,
    }, { status: 400 });
  }


}

