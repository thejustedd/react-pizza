import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { filterReducer } from './slices/filterSlice';
import { cartReducer } from './slices/cartSlice';
import { pizzasReducer } from './slices/pizzasSlice';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    cart: cartReducer,
    pizza: pizzasReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
