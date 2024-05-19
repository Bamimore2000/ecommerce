"use client";
import { useContext } from "react";
import ProductContext from "../contexts/product-context";

const Handler = ({ data }) => {
    const {cart, setItem, findId} = useContext(ProductContext)
    
  const newSet = [...new Set(data.map(({ category }) => category))];
  return (
    <main className="w-[80%] mx-auto mt-[60px]  max-w-[1200px]">
      {newSet.map((categoryFiltered) => {
        return (
          <div key={categoryFiltered} className="">
            <h2 className="font-extra-bold text-2xl my-4">
              {categoryFiltered.toUpperCase()}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {data
                .filter((datum) => datum.category === categoryFiltered)
                .map((product) => {
                    const { description, title, id, image, price } = product
                  return (
                    <article key={id} className="flex rounded-lg max-h-15 flex-col space-y-2 bg-white p-2 justify-between items-center">
                      <div className="w-2/4 p-2 h-auto">
                        <img className="w-full h-full" src={image} alt={id} />
                      </div>
                      <div className="others w-full">
                        <div className="font-bold">{title}</div>
                        <div className="flex justify-between items-center">
                          <div className="font-semibold">${price}</div>
                          <div>
                            <button onClick={()=> {
                                setItem(product, id)
                            }} className="bg-blue-500 text-white px-2 py-1">
                              Add to cart {findId(id)?.number > 0 && `(${findId(id).number})`}
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
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
