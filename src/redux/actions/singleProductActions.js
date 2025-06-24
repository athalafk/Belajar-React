import axios from 'axios';
import * as actionTypes from './actionTypes';

export const fetchSingleProductStart = () => ({
  type: actionTypes.FETCH_SINGLE_PRODUCT_START,
});

export const fetchSingleProductSuccess = (product) => ({
  type: actionTypes.FETCH_SINGLE_PRODUCT_SUCCESS,
  payload: { product },
});

export const fetchSingleProductFailure = (error) => ({
  type: actionTypes.FETCH_SINGLE_PRODUCT_FAILURE,
  payload: { error },
});

export const fetchProductById = (id) => {
  return async (dispatch) => {
    dispatch(fetchSingleProductStart());
    try {
      const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
      dispatch(fetchSingleProductSuccess(response.data));
    } catch (error) {
      dispatch(fetchSingleProductFailure(error.message));
    }
  };
};