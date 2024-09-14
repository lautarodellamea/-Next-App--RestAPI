// 'use client'

import { getCookie, hasCookie, setCookie } from "cookies-next"

/* 

grabaremos en el objeto el id del objeto y la cantidad que se esta llevando 
de esta forma no le doy la posibilidad al usuario que cambie el precio, haciendo que sea menos propenso a errores
aunque obviamente todo se validaria nuevamente en el servidor para ver que todoe ste correcto

cookie: cart
{
 'uuid-123-1': 4,
 'uuid-123-2': 1,
 'uuid-123-3': 2
}

*/


// Obtener el carrito
export const getCookieCart = (): { [id: string]: number } => {

  // verificamos que existe la cookie 'cart'
  if (hasCookie('cart')) {
    const cookieCart = JSON.parse(getCookie('cart') as string ?? '{}')
    return cookieCart
  }


  return {}
}


// Grabar el carrito
export const addProductToCart = (id: string) => {

  // obtengo el carrito
  const cookieCart = getCookieCart()

  // actualizo el carrito
  if (cookieCart[id]) {
    cookieCart[id] = cookieCart[id] + 1
  } else {
    cookieCart[id] = 1
  }

  setCookie('cart', JSON.stringify(cookieCart))
}


// Borrar todos los elementos de un tipo del carrito
export const removeProductFromCart = (id: string) => {

  const cookieCart = getCookieCart()

  if (cookieCart[id]) {
    delete cookieCart[id]
  } else {
    return
  }

  setCookie('cart', JSON.stringify(cookieCart))
}


// Borrar elemento del carrito de a 1
export const removeSingleItemFromCart = (id: string) => {

  const cookieCart = getCookieCart()


  if (cookieCart[id]) {
    if (cookieCart[id] > 1) {
      cookieCart[id] = cookieCart[id] - 1
    } else {
      delete cookieCart[id]
    }
  } else {
    return
  }

  setCookie('cart', JSON.stringify(cookieCart))

}

// Agregar elementos al carrito de a uno
// es la misma funcion que addProductToCart pero la volvi hacer para practicar
export const addSingleItemToCart = (id: string) => {

  const cookieCart = getCookieCart()

  if (cookieCart[id]) {
    cookieCart[id] = cookieCart[id] + 1
  } else {
    return
  }

  setCookie('cart', JSON.stringify(cookieCart))

}