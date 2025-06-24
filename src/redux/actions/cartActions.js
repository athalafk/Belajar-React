import * as actionTypes from './actionTypes';

export const addToCart = (product) => {
  return {
    type: actionTypes.ADD_TO_CART,
    payload: { product },
  };
};

export const removeItem = (productId) => {
  return {
    type: actionTypes.REMOVE_ITEM,
    payload: { productId },
  };
};

export const clearCart = () => {
  return {
    type: actionTypes.CLEAR_CART,
  };
};