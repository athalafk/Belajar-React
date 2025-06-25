import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: '',
  type: 'success',
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type || 'success';
    },
    clearNotification: (state) => {
      state.message = '';
      state.type = 'success';
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export const showNotification = (payload, timeout = 3000) => (dispatch) => {
  dispatch(setNotification(payload));
  setTimeout(() => {
    dispatch(clearNotification());
  }, timeout);
};

export default notificationSlice.reducer;