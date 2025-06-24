import * as actionTypes from '../actions/actionTypes';

const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART: {
        const { product } = action.payload;
        const existingItem = state.cart.find((item) => item.id === product.id);
        let updatedCart;
        if (existingItem) {
            updatedCart = state.cart.map((item) =>
                item.id === product.id ? { ...item, qty: item.qty + 1 } : item
            );
        } else {
            updatedCart = [...state.cart, { ...product, qty: 1 }];
        }
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return { ...state, cart: updatedCart };
    }
    case actionTypes.REMOVE_ITEM: {
        const updatedCart = state.cart.filter((item) => item.id !== action.payload.productId);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return { ...state, cart: updatedCart };
    }
    case actionTypes.CLEAR_CART: {
        localStorage.removeItem("cart");
        return { ...state, cart: [] };
    }
    default:
      return state;
  }
};

export default cartReducer;