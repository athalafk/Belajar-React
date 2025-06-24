import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cartSlice.js';
import productReducer from './features/productSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
  },
});


// import { configureStore } from '@reduxjs/toolkit';
// import rootReducer from './reducers/index.js';

// const store = configureStore({
//   reducer: rootReducer,
// });

// export default store;