"use client";

import { useState, useContext } from "react";
import { IoStar } from "react-icons/io5";

import { FaHeart } from "react-icons/fa";
import { IoStarHalf } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";


import ProductContext from "@/app/contexts/product-context";
import { FaCartPlus } from "react-icons/fa";

const Product = ({ data }) => {
  const { cart, setItem, findId, calculateOriginalPrice, reduceItem, increaseItem} =
    useContext(ProductContext);
  console.log(data);
  const {
    id,
    title,
    description,
    discountPercentage,
    rating,
    stock,
    brand,
    category,
    images,
    price,
  } = data;
  const [imageIndex, setImageIndex] = useState(0);
  const prevPrice = calculateOriginalPrice(discountPercentage, price);
  const findCart = (id) =>{
    const found = cart.find((item)=>{
        return item.id === id
    })
    return found.number
  };
  //   data.map((item)=>{
  //     console.log(item);
  //   })
  const pictures = images;
  console.log(pictures);
  return (
    <article className="bg-black ">
      <div className="product-wrapper flex flex-col">
        <div className="image-wrapper w-full bg-white grid place-items-center  h-[50vh] ">
          <div className="image max-h-full h-[80%] grid place-items-center w-auto mx-auto">
            <img
              className="max-h-[100%] bg-white w-[auto] h-full"
              src={pictures[imageIndex]}
            />
          </div>
        </div>
        <div className="others relative bg-black pb-5 text-white">
          <div className="others-wrapper w-[90%] max-w-[1200px] mx-auto">
            <div className="image-displayer h-[100px] w-full  absolute inset-0  rounded-t-[20px] top-3  gap-2 flex justify-between -mt-7 bg-black p-5">
              {pictures.map((data, index) => {
                return (
                  <div
                  key={index}
                    onClick={() => setImageIndex(index)}
                    className="one-display rounded-full"
                  >
                    <img
                      className="h-[70px] w-[70px]  rounded-full max-h-[50vh]rounded-full"
                      src={pictures[index]}
                      alt=""
                    />
                    <div className="indicator"></div>
                  </div>
                );
              })}
            </div>
            <div className="other-details flex justify-between items-center mt-[80px] ">
              <div className="zign-polo-rating mt-2">
                <div className="zign">{category.toUpperCase()}</div>
                <div className="polo">{title}</div>
                <div className="rating flex gap-1"><IoStar />
              <IoStar />
              <IoStar />
              <IoStar />
              <IoStarHalf /></div>
              </div>
              <div className="price-cancel-shipping flex flex-col items-end">
                <div className="price  font-medium text-xl">${price}</div>
                <div className="line-through text-blue-500">${prevPrice}</div>
                <div className="free-shipping">Free shipping</div>
              </div>
            </div>
            <div className="like-others">
              <div className="like flex gap-1">
              </div>
              <div className="description my-4">
              <div className="header">
                <h3 className="font-bold">Description</h3>
                <div className="arrow"></div>
              </div>
              <div className="text-description ">{description}</div>
            </div>
            </div>
            <div className="">
                {stock} items remaining
            </div>
            <div className="add-to-cart bg-black card mt-2 sticky flex gap-2 items-center bottom-0">
                <div className="call p-4 border border-blue-500 border-solid"><FaPhoneAlt /></div>
              {findId(id)?.number > 0 ? (
                <div className="increase-decrease w-full flex justify-between md:w-[25%] items-center">
                <div
                  onClick={() => reduceItem(id)}
                  className="plus cursor-pointer  hover:bg-blue-600 bg-blue-500 rounded-md px-4 py-2 items-center text-white"
                >
                  -
                </div>
                <div className="number text-white">{findCart(id)}</div>
                <div
                  onClick={() => increaseItem(id)}
                  className="plus cursor-pointer hover:bg-blue-600  bg-blue-500 rounded-md px-4 py-2 items-center text-white"
                >
                  +
                </div>
              </div>
              ) : (
                <button onClick={()=>{
                    setItem(data, id)
                }} className="font-bold relative hover:bg-blue-600 my-2 bg-blue-500 px-[6px] text-white flex justify-center card py-[12px] h-[100%] w-full">
                  <FaCartPlus className="absolute left-[6px]" size={30} />
                  <div>Add to cart</div>
                </button>
                
              )}
            </div>
            
          </div>
        </div>
      </div>
    </article>
  );
};
export default Product;
