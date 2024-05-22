"use client";

import { useState, useContext } from "react";
import { IoStar } from "react-icons/io5";

import { FaHeart } from "react-icons/fa";
import { IoStarHalf } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import Toast from "../Toast/Toast";

import ProductContext from "@/app/contexts/product-context";
import { FaCartPlus } from "react-icons/fa";

const Product = ({ data }) => {
  const {
    cart,
    setItem,
    findId,
    calculateOriginalPrice,
    reduceItem,
    increaseItem,
    handleAdd,
    message,
    showToast,
    type,
  } = useContext(ProductContext);
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
  const findCart = (id) => {
    const found = cart.find((item) => {
      return item.id === id;
    });
    return found.number;
  };
  //   data.map((item)=>{
  //     console.log(item);
  //   })
  const pictures = images;
  console.log(pictures);
  return (
    <article className=" ">
      {showToast && <Toast type={type} message={message}></Toast>}
      <div className="product-wrapper md:h-[100vh] flex flex-col mx-auto md:grid grid-cols-2">
        <div className="image-wrapper w-full relative bg-black grid place-items-center md:h-[60vh]   h-[50vh] ">
          <div className="hidden images-large md:inset md:h-max-content md:flex md:absolute md:-right-0 md:translate-x-[50%] md:z-10 md:flex-col md:gap-2 md:rounded-[30px] md:bg-customColor md:p-5">
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
          <div className="image-display max-w-[3000px]  h-[80%] grid place-items-center w-auto mx-auto">
            <img
              className="max-h-[300px] w-[100%] md:max-w-[400px] md:max-h-[400px] object-contain h-full"
              src={pictures[imageIndex]}
            />
          </div>
        </div>
        <div className="others relative    pb-5">
          <div className="others-wrapper w-[90%] md:w-[70%] max-w-[1200px] md:card md:bg-white md:p-10 md:mt-3 mx-auto">
            <div className="image-displayer h-[100px] absolute inset-0 rounded-t-[20px] top-3 gap-2 flex justify-between -mt-7 p-5 md:hidden">
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
            <div className="other-details flex justify-between md:mt-0 items-center mt-[80px] ">
              <div className="zign-polo-rating mt-2">
                <div className="zign">{category.toUpperCase()}</div>
                <div className="polo">{title}</div>
                <div className="rating flex gap-1">
                  <IoStar />
                  <IoStar />
                  <IoStar />
                  <IoStar />
                  <IoStarHalf />
                </div>
              </div>
              <div className="price-cancel-shipping mt-2 flex flex-col items-end">
                <div className="price  font-medium text-xl">${price}</div>
                <div className="line-through text-blue-500">${prevPrice}</div>
                <div className="free-shipping">Free shipping</div>
              </div>
            </div>
            <div className="like-others">
              <div className="like flex gap-1"></div>
              <div className="description my-4">
                <div className="header">
                  <h3 className="font-bold">Description</h3>
                  <div className="arrow"></div>
                </div>
                <div className="text-description ">{description}</div>
              </div>
            </div>
            <div className="">{stock} items remaining</div>
            <div className="add-to-cart w-full gap-4 px-2 py-1 bg-white card mt-2 sticky flex items-center bottom-0">
              <div className="basis-[10%] rounded-sm px-1 py-1 grid place-items-center border-[1px] border-solid border-blue-500">
                <FaPhoneAlt size={30} color="rgb(59, 130, 246)" />
              </div>
              {findId(id)?.number > 0 ? (
                <div className="increase-decrease w-full flex justify-between md:w-[100%] items-center">
                  <div
                    onClick={() => reduceItem(id)}
                    className="plus cursor-pointer  hover:bg-blue-600 bg-blue-500 rounded-md px-4 py-2 items-center text-white"
                  >
                    -
                  </div>
                  <div className="number text-blue-500">{findCart(id)}</div>
                  <div
                    onClick={() => increaseItem(id)}
                    className="plus cursor-pointer hover:bg-blue-600  bg-blue-500 rounded-md px-4 py-2 items-center text-white"
                  >
                    +
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setItem(data, id);
                    handleAdd(id);
                  }}
                  className="font-bold relative hover:bg-blue-600 my-2 bg-blue-500 px-[6px] text-white flex justify-center card py-[12px] h-[100%] w-full"
                >
                  <FaCartPlus className="absolute  left-[6px]" size={30} />
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
