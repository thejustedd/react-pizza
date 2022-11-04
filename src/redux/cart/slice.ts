import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCartFromLStorage } from '../../utils';
import { CartState, ICartItem } from './types';
import { findItemById } from './functions';

const initialCartState: CartState = {
  items: getCartFromLStorage(), // TODO: Переделать работу с Local Storage
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    addCartItem(state, action: PayloadAction<Omit<ICartItem, 'count'>>) {
      const foundItem = findItemById(state, action.payload.id);
      foundItem ? foundItem.count++ : state.items.push({ ...action.payload, count: 1 });
    },
    plusCartItemCount(state, action: PayloadAction<number>) {
      const foundItem = findItemById(state, action.payload);
      foundItem && (foundItem.count = Math.min(foundItem.count + 1, 100));
    },
    minusCartItemCount(state, action: PayloadAction<number>) {
      const foundItem = findItemById(state, action.payload);
      foundItem && (foundItem.count = Math.max(foundItem.count - 1, 1));
    },
    removeCartItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCartItems(state) {
      state.items = [];
    },
  },
});

export const {
  addCartItem,
  removeCartItem,
  clearCartItems,
  plusCartItemCount,
  minusCartItemCount,
} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
