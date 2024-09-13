// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// aprovechando Server Side Rendering de Next
import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos";

export const metadata = {
  title: 'Listado de Todos',
  description: 'SEO Title',
};

export default async function RestTodosPage() {

  const todos = await prisma.todo.findMany({ orderBy: { description: 'asc' } }) // traigo todos los todos ordenados ascendente por la descripción


  return (
    <div>

      {/* TODO: Formulario para agregar un nuevo todo */}

      <div className="w-full px-3 mx-5 mb-5">
        <NewTodo />
      </div>

      <TodosGrid todos={todos} />

    </div>
  );
}


/* 
// aca hacemos la peticion del lado del cliente
'use client'

import { useEffect } from "react";


// export const metadata = {
//   title: 'Listado de Todos',
//   description: 'SEO Title',
// };

export default function RestTodosPage() {

  // podriamos crear un useState y manejar los todos aca

  useEffect(() => {
    // recordar no se puede usar await dentro de un effect
    // en un server component especifico el path completo
    // en un client component especifico el path relativo
    fetch('/api/todos')
      .then(res => res.json())
      .then(console.log)


  }, [])



  return (
    <div>
      <h1>RestTodosPage</h1>
    </div>
  );
} 
  */