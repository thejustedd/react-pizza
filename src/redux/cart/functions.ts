import { CartState, ICartItem } from './types';

export function getTotalCountInCart(items: ICartItem[]) {
  return items.reduce((sum, item) => sum + item.count, 0);
}

export function getTotalPriceInCart(items: ICartItem[]) {
  return items.reduce((sum, item) => sum + item.price * item.count, 0);
}

export function findItemById(state: CartState, id: number) {
  return state.items.find((item) => item.id === id);
}
