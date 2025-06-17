import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const handleAddToCart = (product) => {
        const existingItem = cart.find((item) => item.id === product.id);
        if (existingItem) {
            setCart(
                cart.map((item) =>
                    item.id === product.id
                        ? { ...item, qty: item.qty + 1 }
                        : item
                )
            );
        } else {
            setCart([...cart, { ...product, qty: 1 }]);
        }
    };

    const handleRemoveItem = (productId) => {
        const updatedCart = cart.filter((item) => item.id !== productId);
        setCart(updatedCart);
    };

    const handleClearCart = () => {
        setCart([]);
        localStorage.removeItem("cart");
    };


    return (
        <CartContext.Provider 
            value={{ cart, handleAddToCart, handleRemoveItem, handleClearCart }}
        >
            {children}
        </CartContext.Provider>
    );
}