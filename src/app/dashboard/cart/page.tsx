import { Product, products } from "@/products/data/products";
import { cookies } from "next/headers";

import { ItemCard } from "@/shopping-cart/components/ItemCard";
import { WidgetItem } from "@/components";





export const metadata = {
  title: 'Carrito de compras',
  description: 'Carrito de compras',
};


interface ProductInCart {
  product: Product
  quantity: number
}

const getProductsInCart = (cart: { [id: string]: number }) => {

  const productInCart: ProductInCart[] = []

  for (const id of Object.keys(cart)) {
    const product = products.find(product => product.id === id) // aca buscamos en la db fictiscia que tenemos de nuestros productos
    if (product) {
      productInCart.push({ product, quantity: cart[id] })
    }
  }
  return productInCart
}

export default function CartPage() {

  const cookieStore = cookies()
  const cart = JSON.parse(cookieStore.get('cart')?.value ?? '{}') as { [id: string]: number }
  const productsInCart = getProductsInCart(cart)



  // total de productos
  // use un el metodo reduce pero podria hacerlo de otra forma si quisiera
  const totalToPay = productsInCart.reduce((prev, current) => (current.product.price * current.quantity) + prev, 0)

  return (
    <div>
      <h1 className="text-5xl">Productos en el carrito</h1>

      <div className="flex flex-col sm:flex-row gap-2 w-full">

        <div className="flex flex-col gap-2 w-full sm:w-8/12">
          {
            productsInCart.map(({ product, quantity }) => (
              <ItemCard key={product.id} product={product} quantity={quantity} />
            ))

          }
        </div>


        <div className="flex flex-col w-full sm:w-4/12">
          <WidgetItem title="Total a pagar">
            <div className="mt-2 justify-center gap-4">
              <h3 className="text-3xl font-bold text-gray-700">{(totalToPay * 1.15).toFixed(2)}</h3>
            </div>
            <span className="font-bold text-center text-gray-500">Impuestos 15%: {(totalToPay * 0.15).toFixed(2)}</span>
          </WidgetItem>
        </div>

      </div>
    </div>
  );
}