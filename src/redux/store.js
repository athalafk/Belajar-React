import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cartSlice.js';
import productReducer from './features/productSlice';
import notificationReducer from './features/notificationSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
    notification: notificationReducer,
  },
});


// import { configureStore } from '@reduxjs/toolkit';
// import rootReducer from './reducers/index.js';

// const store = configureStore({
//   reducer: rootReducer,
// });

// export default store;