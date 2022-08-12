import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ICartItem {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
}

interface CartState {
  items: ICartItem[];
}

const initialCartState: CartState = {
  items: [],
};

export function getTotalCountInCart(items: ICartItem[]) {
  return items.reduce((sum, item) => sum + item.count, 0);
}

export function getTotalPriceInCart(items: ICartItem[]) {
  return items.reduce((sum, item) => sum + item.price * item.count, 0);
}

function findItemById(state: CartState, id: number) {
  return state.items.find((item) => item.id === id);
}

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