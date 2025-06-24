import axios from 'axios';
import * as actionTypes from './actionTypes';

export const fetchProductsStart = () => ({
  type: actionTypes.FETCH_PRODUCTS_START,
});

export const fetchProductsSuccess = (products) => ({
  type: actionTypes.FETCH_PRODUCTS_SUCCESS,
  payload: { products },
});

export const fetchProductsFailure = (error) => ({
  type: actionTypes.FETCH_PRODUCTS_FAILURE,
  payload: { error },
});

export const fetchProducts = () => {
  return async (dispatch) => {
    dispatch(fetchProductsStart());
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      dispatch(fetchProductsSuccess(response.data));
    } catch (error) {
      dispatch(fetchProductsFailure(error.message));
    }
  };
};