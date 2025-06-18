import { createContext, useReducer, useEffect, useCallback } from "react";
import Notification from "../components/Elements/Notification";

export const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART': {
            const { product } = action.payload;
            const existingItem = state.cart.find((item) => item.id === product.id);
            if (existingItem) {
                return {
                    ...state,
                    cart: state.cart.map((item) =>
                        item.id === product.id
                            ? { ...item, qty: item.qty + 1 }
                            : item
                    )
                };
            }
            return {
                ...state,
                cart: [...state.cart, { ...product, qty: 1 }]
            };
        }
        case 'REMOVE_ITEM': {
            return {
                ...state,
                cart: state.cart.filter((item) => item.id !== action.payload.productId)
            };
        }
        case 'CLEAR_CART': {
            return {
                ...state,
                cart: []
            };
        }
        case 'SET_NOTIFICATION': {
            return {
                ...state,
                notification: action.payload.message
            };
        }
        default:
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const initialState = {
        cart: JSON.parse(localStorage.getItem("cart")) || [],
        notification: ""
    };
    const [state, dispatch] = useReducer(cartReducer, initialState);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(state.cart));
    }, [state.cart]);

    const handleAddToCart = useCallback((product) => {
        dispatch({ type: 'ADD_TO_CART', payload: { product } });
        dispatch({ type: 'SET_NOTIFICATION', payload: { message: `Successfully added "${product.title.substring(0, 20)}..." to cart` } });
        setTimeout(() => {
            dispatch({ type: 'SET_NOTIFICATION', payload: { message: "" } });
        }, 3000);
    }, []);

    const handleRemoveItem = useCallback((productId) => {
        const itemToRemove = state.cart.find((item) => item.id === productId);
        if(itemToRemove) {
            dispatch({ type: 'REMOVE_ITEM', payload: { productId } });
            dispatch({ type: 'SET_NOTIFICATION', payload: { message: `Removed "${itemToRemove.title.substring(0, 20)}..." from cart` } });
            setTimeout(() => {
                dispatch({ type: 'SET_NOTIFICATION', payload: { message: "" } });
            }, 3000);
        }
    }, [state.cart]);

    const handleClearCart = useCallback(() => {
        dispatch({ type: 'CLEAR_CART' });
        dispatch({ type: 'SET_NOTIFICATION', payload: { message: "Cart has been cleared successfully" } });
        setTimeout(() => {
            dispatch({ type: 'SET_NOTIFICATION', payload: { message: "" } });
        }, 3000);
    }, []);

    const value = {
        cart: state.cart,
        handleAddToCart,
        handleRemoveItem,
        handleClearCart
    };

    return (
        <CartContext.Provider value={value}>
            {children}
            <Notification message={state.notification} />
        </CartContext.Provider>
    );
}