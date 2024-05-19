import Link from "next/link"

const NavBar = () => {
  return (
    <nav className="h-[60px] bg-black text-white w-full flex items-center absolute top-0">
        <div className="w-[80%] mx-auto flex justify-between items-center my-auto  max-w-[1200px]">
            <Link href='/' className="text-3xl font-bold" >SOGO STORE</Link>
            <Link href='/cart' className="cart">
                cartIcon
            </Link>
        </div>
    </nav>
  )
}
export default NavBar