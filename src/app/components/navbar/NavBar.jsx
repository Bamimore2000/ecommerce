"use client"
import { MdOutlineShoppingCart } from "react-icons/md";
import { useContext } from "react"
import ProductContext from "@/app/contexts/product-context"


import Link from "next/link"

const NavBar = () => {
    const {cart} = useContext(ProductContext)
  return (
    <nav className="h-[60px] z-50 bg-white shadow-lg  text-black w-full flex items-center fixed  top-0">
        <div className="w-[90%] mx-auto flex justify-between items-center my-auto  max-w-[1200px]">
            <Link href='/' className="text-3xl text-black font-bold" >SOGZY <span className="text-blue-500">STORE</span> </Link>
            <Link href='/cart' className="cart relative">
                {cart.length > 0 && <div className="number absolute w-6 h-6 rounded-full grid place-items-center bg-blue-500 text-white -right-3 -top-3">
                    {cart.length}
                </div>}
                <MdOutlineShoppingCart size={30}/>
            </Link>
        </div>
    </nav>
  )
}
export default NavBar