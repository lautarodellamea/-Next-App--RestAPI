import { cookies } from "next/headers"; // accedamos a las cookies desde el servidor gracias a next

import { TabBar } from "@/components";

export const metadata = {
  title: 'Cookies Page',
  description: 'Cookies Page',
};


export default function CokiesPage() {

  const cookieStore = cookies()
  // const cookieTab = cookieStore.get('selectedTab')
  const cookieTab = cookieStore.get('selectedTab')?.value // ponemos el '?' ya pueden ser undefined, cuando entramos por primera vez por ejemplo


  const allCookies = cookieStore.getAll()
  console.log(allCookies)




  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

      <div className="flex flex-col">
        <span className="text-3xl">Tabs</span>
        <TabBar tabOptions={[1, 2, 3, 4, 5]} currentTab={Number(cookieTab)} />

      </div>


    </div>
  );
}