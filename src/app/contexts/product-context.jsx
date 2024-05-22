"use client";
import { createContext, useState, useEffect } from "react";

// Create the context
const ProductContext = createContext(null);

export const ContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [message, setMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [type, setType] = useState("");

  const findId = (id) => {
    return cart.find((item) => item.id === id);
  };

  // Load cart from local storage on component mount
  useEffect(() => {
    if (typeof window !== "undefined" && typeof localStorage !== 'undefined') {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    }
  }, []);

  function calculateOriginalPrice(discountRate, currentPrice) {
    if (discountRate <= 0 || discountRate >= 100 || currentPrice <= 0) {
      throw new Error("Invalid discount rate or current price.");
    }
    
    // Convert the discount rate from percentage to a decimal
    const discountDecimal = discountRate / 100;
    
    // Calculate the original price
    const originalPrice = currentPrice / (1 - discountDecimal);
    
    // Format the original price to two decimal places
    return originalPrice.toFixed(2);
  }
  
  const handleAdd = (id) => {
    // initial add
    setMessage("Item added succesfully");
    setType("add");
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 1000);
  };

  const handleUpdate = (id) => {
    // increase or decrease but not remove and initial add
    setMessage("Item updated succesfully");
    setType("update");
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 1000);
  };

  const handleRemoveFromCart = (id) => {
    // removing from cart
    setMessage("Item removed succesfully");
    setType("remove");
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 1000);
  };

  const reduceItem = (id) => {
    if (findId(id).number === 1){
      handleRemoveFromCart(id);
    }
    else if (findId(id).number > 1){
      handleUpdate(id)
    }
    let updatedCart = cart.map((item) =>
      item.id === id && item.number > 0 ? { ...item, number: item.number - 1 } : item
    ).filter(item => item.number > 0);

    setCart(updatedCart);
    if (typeof window !== "undefined" && typeof localStorage !== 'undefined') {
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const increaseItem = (id) => {
    handleUpdate(id);
    let updatedCart = cart.map((item) =>
      item.id === id ? { ...item, number: item.number + 1 } : item
    );


    setCart(updatedCart);
    if (typeof window !== "undefined" && typeof localStorage !== 'undefined') {
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const removeItem = (id) => {
    handleRemoveFromCart(id)
    let updatedCart = cart.filter((item) => item.id !== id);

    setCart(updatedCart);
    if (typeof window !== "undefined" && typeof localStorage !== 'undefined') {
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  


  // cannot be in the cart
  

  useEffect(() => {
    const calculateTotal = () => {
      return cart.reduce((total, item) => total + item.price * item.number, 0);
    };
    setTotal(calculateTotal());
  }, [cart]); // Recalculate total whenever cart changes

  // Function to check if an item is in the cart
  

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
    <ProductContext.Provider value={{ cart, setItem, findId, total, removeItem, handleAdd, message,showToast, type, increaseItem, calculateOriginalPrice, reduceItem }}>
      {children}
    </ProductContext.Provider>
  );
};

// Export the context
export default ProductContext;
