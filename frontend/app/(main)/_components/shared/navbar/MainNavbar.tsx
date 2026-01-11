import Link from 'next/link'
import React from 'react'

type Props = {}

export default function MainNavbar({ }: Props) {
     return (
          <div className=" flex  my-5  justify-between items-center">
               <span className=" border   text-4xl font-semibold   ">
                    SakuraBites
               </span>
               <div className="    border space-x-8">
                    {navlinkData.map((item, index) => (
                         <Link
                              href={item.link}
                              key={index}
                              className="  hover:font-semibold duration-300   uppercase tracking-[1px]"
                         >
                              {item.name}
                         </Link>
                    ))}
               </div>
               <div className=' border'>
                    login and search
               </div>
          </div>

     )
}
const navlinkData: { name: string; link: string }[] = [
     {
          name: "Home",
          link: "/",
     },
     {
          name: "About",
          link: "/about",
     },
     {
          name: "Contact",
          link: "/contact",
     },
];
