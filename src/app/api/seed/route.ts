import prisma from "@/lib/prisma";


export async function GET(request: Request) {




  // borramos toda la tabla
  await prisma.todo.deleteMany({})
  // await prisma.todo.deleteMany({where: {complete: true}}) // borramos solo lo que estan terminados


  // creamos un todo
  /* 
    const todo = await prisma.todo.create({
      data: { description: 'Piedra del alma' }
    })
    console.log(todo) 
  */

  // insertamos masivamente para sembrar la base de datos
  await prisma.todo.createMany({
    data: [
      { description: 'Piedra del alma' },
      { description: 'Piedra de la muerte' },
      { description: 'Piedra del tiempo', complete: true },
      { description: 'Piedra del espacio' },
      { description: 'Piedra de la realidad', complete: true },
      { description: 'Piedra del universo' },
    ]
  })




  return Response.json({
    message: 'Seed ejecutado!',
    method: request.method,
  });
}