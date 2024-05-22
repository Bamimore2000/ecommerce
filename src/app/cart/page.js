"use client";
import { useContext, useState } from "react";
import ProductContext from "../contexts/product-context";
import Modal from "../components/modal/Modal";
import { MdDeleteOutline } from "react-icons/md";
import Link from "next/link";
import { FaCartPlus } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import Toast from "../components/Toast/Toast";

const Cart = ({}) => {
  const [openModal, setOpenModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  
  const { cart, total, removeItem, increaseItem, reduceItem, message, showToast, type } =
    useContext(ProductContext);
  console.log(cart);
  const handleRemove = (id) => {
    setOpenModal(true);
    setItemToRemove(id);
  };

  return (
    <main className="mt-[60px] ">
      {showToast && <Toast type={type} message={message} ></Toast>}
      {cart.length > 0 ? (
        <div className="cart-continer">
          
          <div className="mobile block md:hidden">
            <h4 className="w-[90%] max-w-[1200px] mx-auto">CART SUMMARY</h4>
            <div className="cart-subtotal w-[100%]  mx-auto card flex justify-between text-black bg-white items-center">
              <div className="subtotal-wrapper flex justify-between mx-auto w-[90%] max-w-[1200px]">
                <p className="">Subtotal</p>
                <p className="font-bold">
                  ${Math.ceil(total)}
                </p>
              </div>
            </div>
            <h5 className="w-[90%] md:hidden mt-3 max-w-[1200px] mx-auto">
              Cart ({cart.length})
            </h5>
          </div>
          <div className="list pt-3 w-[90%] max-w-[1200px] card mx-auto ">
            <div className="md:flex md:justify-between md:items-start py pt-3">
              {/* the card wrapper */}
              <div className="card-wrapper bg-white p-3 card md:basis-[70%]">
                <h5 className="hidden py-2 md:block">Cart (4)</h5>
                {cart?.map(
                  ({
                    title,
                    description,
                    number,
                    image,
                    price,
                    id,
                    thumbnail,
                  }) => {
                    return (
                      number > 0 && (
                        <div
                          key={description}
                          className="bg-white border-t border-t-black-300 pt-3"
                        >
                          <div className="upper basis-[30%] flex gap-[20px]  items-center">
                            <Link
                              href={`/products/${id}`}
                              className="aspect-w-1 aspect-h-1 w-24"
                            >
                              <img
                                className="object-cover w-full h-full"
                                src={thumbnail}
                                alt="yes"
                              />
                            </Link>
                            <div className="passport-price flex flex-col md:flex-row md:basis-[80%] md:justify-between">
                              <Link
                                href={`/products/${id}`}
                                className="text-[18px]"
                              >
                                {title}
                              </Link>
                              <div className="text-[20px] font-normal">
                                ${price}
                              </div>
                            </div>
                          </div>
                          <div className="lower flex py-3 justify-between items-center">
                            <Modal
                              open={openModal}
                              setOpen={setOpenModal}
                              setAction={() => {
                                removeItem(itemToRemove);
                                setItemToRemove(null);
                              }}
                            />
                            <div
                              onClick={() => {
                                handleRemove(id);
                              }}
                              className="remove hover:bg-blue-400 gap-1 py-1 flex items-center cursor-pointer text-blue-500"
                            >
                              <MdDeleteOutline size={20} />
                              <span>REMOVE</span>
                            </div>
                            <div className="increase-decrease flex justify-between w-[50%] md:w-[25%] items-center">
                              <div
                                onClick={() => {
                                  reduceItem(id);
                                }}
                                className="plus cursor-pointer  hover:bg-blue-600 bg-blue-500 rounded-md px-4 py-2 items-center text-white"
                              >
                                -
                              </div>
                              <div className="number">{number}</div>
                              <div
                                onClick={() => increaseItem(id)}
                                className="plus cursor-pointer hover:bg-blue-600  bg-blue-500 rounded-md px-4 py-2 items-center text-white"
                              >
                                +
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    );
                  }
                )}
              </div>
              <div className="hidden p-3 card md:h-[175px] bg-white basis-[25%] md:flex md:flex-col justify-between ">
                <h3>CART SUMMARY</h3>
                <div className="subtotal flex justify-between">
                  <p>Subtotal</p>
                  <p className="text-[20px]">${total}</p>
                </div>
                <button className="w-full text-white rounded-[8px] hover:bg-blue-600 py-2 px-4 bg-blue-500">
                  Checkout (${Math.ceil(total)})
                </button>
              </div>
            </div>
          </div>
          <div className="md:hidden sticky card bg-white p-3 card  bottom-0 mt-2 w-[90%] max-w-[1200px] mx-auto flex justify-between items-center">
            <div className="basis-[10%]  rounded-sm px-1 py-1 border-[1px] border-solid border-blue-500">
              <FaPhoneAlt size={30} color="rgb(59, 130, 246)" />
            </div>
            <button className="w-full basis-[80%] text-white rounded-[5px] hover:bg-blue-600 py-2 px-4 bg-blue-500">
              CHECKOUT ${Math.ceil(total)}
            </button>
          </div>
        </div>
      ) : (
        <main className="bg-white mt-[70px] card grid place-items-center mx-auto w-[90%] p-4 max-w-[1200px] min-h-[45vh]">
          <div className="wrapper h-full grid place-items-center">
            <div className="cart-image grid place-items-center  bg-gray-200 rounded-[50%] pl-[3.5rem] pr-[3.5rem] pb-[3.5rem] pt-[3.5rem] px-10">
              <FaCartPlus color="rgb(59 130 246 /1)" size={80} />
            </div>
            <p className="text-xl">Your cart is empty</p>
            <p className="text-l text-center">
              Browse our categories and discover our best deals!
            </p>
            <Link
              href="/"
              className="card text-white hover:bg-blue-600 py-2 px-4 bg-blue-500"
            >
              START SHOPPING
            </Link>
          </div>
        </main>
      )}
    </main>
  );
};
export default Cart;
