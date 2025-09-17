import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './action';

const redux = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof redux.getState>;
export type AppDispatch = typeof redux.dispatch;
export default redux;
