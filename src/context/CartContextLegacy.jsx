import { createContext, useState, useEffect } from "react";
import Notification from "../components/Elements/Notification";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const [notification, setNotification] = useState("");

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
        setNotification(`Successfully added "${product.title.substring(0, 20)}..." to cart`);
        setTimeout(() => {
            setNotification("");
        }, 3000);
    };

    const handleRemoveItem = (productId) => {
        const itemToRemove = cart.find((item) => item.id === productId);
        const updatedCart = cart.filter((item) => item.id !== productId);
        setCart(updatedCart);

        if (itemToRemove) {
            setNotification(`Removed "${itemToRemove.title.substring(0, 20)}..." from cart`);
            setTimeout(() => {
                setNotification("");
            }, 3000);
        }
    };

    const handleClearCart = () => {
        setCart([]);
        localStorage.removeItem("cart");
        setNotification("Cart has been cleared successfully");
        setTimeout(() => {
            setNotification("");
        }, 3000);
    };


    return (
        <CartContext.Provider 
            value={{ cart, handleAddToCart, handleRemoveItem, handleClearCart }}
        >
            {children}
            <Notification message={notification} />
        </CartContext.Provider>
    );
}