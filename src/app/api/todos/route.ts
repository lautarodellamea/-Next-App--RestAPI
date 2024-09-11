import prisma from "@/lib/prisma";
import * as yup from "yup"; // libreria que no permitira validar lo que debemos mandar en el body


// paginacion
// https://www.prisma.io/docs/orm/prisma-client/queries/pagination
// Si necesitamos saltar un gran número de registros, como por ejemplo 200,000, para luego obtener los siguientes 10, la base de datos tendría que procesar esos 200,000 registros antes de devolver los 10 solicitados. Esto puede afectar negativamente el rendimiento. Sin embargo, si aplicamos filtros primero para reducir el conjunto de datos, la base de datos trabajará con una porción más pequeña, mejorando así la eficiencia del proceso.

// Obtener Todos
export async function GET(request: Request) {

  // obtenemos los searchParams
  const { searchParams } = new URL(request.url)
  const take = Number(searchParams.get('take') ?? '10') // si no lo mando por defecto sera  10, siempre es un string o null, en este caso string o '10'
  const skip = Number(searchParams.get('skip') ?? '0') // si no pasara el skip significa que es la primera paginacion
  // comvbertimos a Number los parametros


  // http://localhost:3000/api/todos?take=2fasfgasg, por si el usuario envia algo que no es un numero
  if (isNaN(Number(take))) return Response.json({ error: 'take must be a number' }, { status: 400 })

  if (isNaN(Number(skip))) return Response.json({ error: 'skip must be a number' }, { status: 400 })


  // paginemos
  // http://localhost:3000/api/todos?take=3  -->  me devuelve dos registros
  // http://localhost:3000/api/todos?take=2&skip=2  -->  me skipea de a 2, el skip es para saltar de "take" en "take", en este caso de 3 en 3
  // const todos = await prisma.todo.findMany({ take: Number(take) })
  const todos = await prisma.todo.findMany({ take: take, skip: skip })


  // obtener todos los todos
  // const todos = await prisma.todo.findMany({})
  // const todos = await prisma.todo.findMany({ where: { complete: true } }) // obtener solo los todos completados






  return Response.json({
    todos: todos,
    method: request.method,
  });
}



// Crear Todo
// npm i yup - libreria que no permitira validar lo que debemos mandar en el body
// podemos hacer muchas validaciones, largo, minimo, maximo, requerido, email, etc
// creamos el objeto como queremos que luzca nuestro todo
const todoSchema = yup.object({
  description: yup.string().required(),
  complete: yup.boolean().optional().default(false),
})

export async function POST(request: Request) {

  // si falla la validacion con yup , o la insercion a db con prisma arrojarian el error en el catch
  try {
    // accedemos a lo que me mandan - request.body
    // const body = await request.json()
    const { complete, description, ...rest } = await todoSchema.validate(await request.json()) // validamos para evitar que cambien mi id, o manden datos que no quiero, mejoramos la seguridad


    // const todo = await prisma.todo.create({ data: body })
    const todo = await prisma.todo.create({ data: { complete: complete, description: description } }) // solo modificamos los campos que mandamos aca, protegiendo la base de datos

    return Response.json({
      message: 'Hello World',
      body: {
        complete: complete,
        description: description,
      },
      rest: rest,
      todo: todo,
      method: request.method,
    });

  } catch (error) {

    return Response.json({
      error: error,
    }, { status: 400 });

  }



}