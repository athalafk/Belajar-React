import * as actionTypes from '../actions/actionTypes.js';

const initialState = {
  products: [],
  loading: true,
  error: null,
  selectedProduct: null, 
  loadingSingle: true,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCTS_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        error: null,
      };
    case actionTypes.FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case actionTypes.FETCH_SINGLE_PRODUCT_START:
      return { 
        ...state, loadingSingle: true
      };
    case actionTypes.FETCH_SINGLE_PRODUCT_SUCCESS:
      return {
        ...state,
        loadingSingle: false,
        selectedProduct: action.payload.product,
        error: null,
      };
    case actionTypes.FETCH_SINGLE_PRODUCT_FAILURE:
      return {
        ...state,
        loadingSingle: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export default productReducer;