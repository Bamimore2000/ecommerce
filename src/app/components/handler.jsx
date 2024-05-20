"use client";
import { useContext } from "react";
import ProductContext from "../contexts/product-context";
import Link from "next/link";

const Handler = ({ data }) => {
    const {cart, setItem, findId, calculateOriginalPrice} = useContext(ProductContext) 
    console.log(data);
    
  const newSet = [...new Set(data.products.map(({ category }) => category))];
  return (
    <main className="w-[90%] mx-auto mt-[60px]  max-w-[1200px]">
      {newSet.map((categoryFiltered) => {
        return (
          <div key={categoryFiltered} className="">
            <h2 className="font-extra-bold text-2xl my-4 text-center">
              {categoryFiltered.toUpperCase()}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {data.products
                .filter((datum) => datum.category === categoryFiltered)
                .map((product) => {
                    const {title, id, images, price, thumbnail, brand, discountPercentage } = product;
                    const prevPrice = calculateOriginalPrice(discountPercentage, price);
                    console.log(prevPrice);
                  return (
                    <Link href={`/products/${id}`} key={id} className="flex cursor-pointer rounded-lg max-h-15 card flex-col space-y-2 bg-white p-2 justify-between items-center">
                      
                      <div className="w-full max-h-[280px] p-2 h-auto relative">
                        <div className="prev absolute text-red-400 p-2 bg-red-100 -top-1 right-0">{discountPercentage}%</div>
                        <img className="w-full h-full" src={thumbnail} alt={id} />
                      </div>
                      <div className="others w-full">
                        <div className="font-bold">{title}</div>
                        <div className="flex justify-between items-center">
                          <div className="flex flex-col"><span className="font-semibold">${price}</span> <span className="line-through">${prevPrice}</span></div>
                          <div>
                            <button onClick={()=> {
                                setItem(product, id)
                            }} className="bg-blue-500 card text-white px-2 py-1">
                              {brand}
                            </button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>
        );
      })}
    </main>
  );
};
export default Handler;
