// este archivo tendra las instrucciones para hacer el posteo http tradicional
// no habra logica para mantener el estado o actualizarlo, solo llegaremos al endpoint y haremos la modificacion respectiva como si estuvieramos en postman


// modificar un todo
export const updateTodo = async (id: string, complete: boolean) => {

  const body = {
    complete: complete
  }

  // si esto se ejecuta del lado del servidor debo poner el url completo http://localhost:3000/api/todos/${id}
  // com lo ejecutaremos del lado del cliente puedo poner el url parcialmente
  const todo = await fetch(`/api/todos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body), // transformo el body en un json para enviarlo
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())

  console.log(todo)

  return todo

}


// crear un todo
export const createTodo = async (description: string) => {

  const body = {
    description: description
  }

  const todo = await fetch(`/api/todos`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())

  console.log(todo)

  return todo


}

// borrar completados
export const deleteTodo = async () => {



  // si esto se ejecuta del lado del servidor debo poner el url completo http://localhost:3000/api/todos/${id}
  // com lo ejecutaremos del lado del cliente puedo poner el url parcialmente
  const todo = await fetch(`/api/todos`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())

  console.log(todo)

  return todo

}
