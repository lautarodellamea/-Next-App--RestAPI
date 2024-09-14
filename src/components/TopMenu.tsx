import { cookies } from "next/headers";
import Link from "next/link";
import { CiMenuBurger, CiSearch, CiShoppingBasket } from "react-icons/ci"

export const TopMenu = () => {


  // como es un server component accedemos a las cookies asi
  const cookieStore = cookies();
  const cart = JSON.parse(cookieStore.get('cart')?.value ?? '{}')

  const getTotalCount = (cart: { [id: string]: number }): number => {
    let items = 0

    Object.values(cart).forEach(value => {
      items += value as number
    })

    return items
  }

  const totalItems = getTotalCount(cart)



  return (
    <div className="sticky z-10 top-0 h-16 border-b bg-white lg:py-2.5">

      <div className="px-6 flex items-center justify-between space-x-4">
        <h5 hidden className="text-2xl text-gray-600 font-medium lg:block">Dashboard</h5>
        <button className="w-12 h-16 -mr-2 border-r lg:hidden">
          <CiMenuBurger size={30} />
        </button>
        <div className="flex space-x-2">

          <div hidden className="md:block">
            <div className="relative flex items-center text-gray-400 focus-within:text-cyan-400">
              <span className="absolute left-4 h-6 flex items-center pr-3 border-r border-gray-300">
                <CiSearch />
              </span>
              <input type="search" name="leadingIcon" id="leadingIcon" placeholder="Search here" className="w-full pl-14 pr-4 py-2.5 rounded-xl text-sm text-gray-600 outline-none border border-gray-300 focus:border-cyan-300 transition" />
            </div>
          </div>

          <button className="flex items-center justify-center w-10 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200 md:hidden">
            <CiSearch />
          </button>

          <Link href="/dashboard/cart" className="flex items-center relative justify-center w-10 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200">

            {
              totalItems > 0 ? (
                <span className="absolute flex h-4 w-4 ml-8 -mt-8">
                  <span className="animate-ping p-2 absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75 align-middle items-center justify-center"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-sky-500 text-[0.55rem] font-semibold justify-center items-center text-white">
                    {totalItems}
                  </span>
                </span>
              ) : (
                <></>
              )
            }



            <CiShoppingBasket size={25} />

          </Link>
        </div>
      </div>
    </div>
  )
}