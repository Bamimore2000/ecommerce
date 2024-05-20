"use client";
import { createContext, useState, useEffect } from "react";

// Create the context
const ProductContext = createContext(null);

export const ContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  // Load cart from local storage on component mount
  useEffect(() => {
    if (typeof window !== "undefined" && typeof localStorage !== 'undefined') {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    }
  }, []);

  const reduceItem = (id) => {
    let updatedCart = cart.map((item) =>
      item.id === id && item.number > 0 ? { ...item, number: item.number - 1 } : item
    ).filter(item => item.number > 0);

    setCart(updatedCart);
    if (typeof window !== "undefined" && typeof localStorage !== 'undefined') {
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const increaseItem = (id) => {
    let updatedCart = cart.map((item) =>
      item.id === id ? { ...item, number: item.number + 1 } : item
    );

    setCart(updatedCart);
    if (typeof window !== "undefined" && typeof localStorage !== 'undefined') {
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const removeItem = (id) => {
    let updatedCart = cart.filter((item) => item.id !== id);

    setCart(updatedCart);
    if (typeof window !== "undefined" && typeof localStorage !== 'undefined') {
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  useEffect(() => {
    const calculateTotal = () => {
      return cart.reduce((total, item) => total + item.price * item.number, 0);
    };
    setTotal(calculateTotal());
  }, [cart]); // Recalculate total whenever cart changes

  // Function to check if an item is in the cart
  const findId = (id) => {
    return cart.find((item) => item.id === id);
  };

  // Function to set an item in the cart
  const setItem = (data, id) => {
    if (typeof window !== "undefined" && typeof localStorage !== 'undefined') {
      let updatedCart;
      if (!findId(id)) {
        updatedCart = [...cart, { ...data, number: 1 }];
      } else {
        updatedCart = cart.map((item) =>
          item.id === id ? { ...item, number: item.number + 1 } : item
        );
      }
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  // Return the context provider with value
  return (
    <ProductContext.Provider value={{ cart, setItem, findId, total, removeItem, increaseItem, reduceItem }}>
      {children}
    </ProductContext.Provider>
  );
};

// Export the context
export default ProductContext;
