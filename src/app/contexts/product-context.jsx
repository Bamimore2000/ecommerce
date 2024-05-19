"use client";
import { createContext, useState, useEffect } from "react";

// Create the context
const ProductContext = createContext(null);

export const ContextProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Load cart from local storage on component mount
    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    // Function to check if an item is in the cart
    const findId = (id) => {
        return cart.find((item) => item.id === id);
    };

    // Function to set an item in the cart
    const setItem = (data, id) => {
        if (typeof window !== 'undefined') {
            let updatedCart;
            if (!findId(id)) {
                updatedCart = [...cart, { ...data, number: 1 }];
            } else {
                updatedCart = cart.map((item) => 
                    item.id === id ? { ...item, number: item.number + 1 } : item
                );
            }
            setCart(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        }
    };

    // Return the context provider with value
    return (
        <ProductContext.Provider value={{ cart, setItem, findId }}>
            {children}
        </ProductContext.Provider>
    );
};

// Export the context
export default ProductContext;
