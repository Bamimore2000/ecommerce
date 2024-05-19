import img from '/.1.jpg'

const Cart = ({}) => {
  return (
    <main className="mt-[60px] ">
        <div className="cart-continer w-[80%] max-w-[1200px] mx-auto">
            <div  className="mobile block md:hidden">
            <h4 >CART SUMMARY</h4>
            <div className="cart-subtotal flex justify-between items-center">
                <p>Subtotal</p>
                <p className="font-bold">45000</p>
            </div>
            <h5>Cart</h5>
            </div>
            <div className="list">
                <div className="bg-red-500">
                    <div className="upper flex justify-between items-center">
                        <div className="image">
                            <img src={img} alt="" />
                        </div>
                        <div className="passport-price">
                            <div className="title">dvgegeheh w4sdqef qfwtr2r2 qzeeh 4 w4y4</div>
                            <div className="price">400</div>
                        </div>
                    </div>
                    <div className="lower flex p-3 justify-between">
                        <div className="remove">Remove</div>
                        <div className="increase-decrease">
                            <div className="plus">-</div>
                            <div className="number">12</div>
                            <div className="plus">+</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="little-side">

            </div>
        </div>
    </main>
  )
}
export default Cart